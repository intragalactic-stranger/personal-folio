import { ChatMessage, StreamCallback } from "./types";
import { ChromeAiProvider } from "./chrome_ai_provider";
import { BackendAiProvider } from "./backend_ai_provider";
import { PersonaService } from "./local_knowledge";

export type EngineType = "chrome-gemini" | "bedrock";

export class ChatController {
  private chromeProvider: ChromeAiProvider;
  private backendProvider: BackendAiProvider;
  private activeEngine: EngineType = "bedrock";
  private messages: ChatMessage[] = [];
  private currentAbortController: AbortController | null = null;
  public onEngineSwitchCallback: ((newEngine: string, reason?: string) => void) | null = null;

  constructor() {
    this.chromeProvider = new ChromeAiProvider();
    this.backendProvider = new BackendAiProvider();
  }

  public async initialize(): Promise<string> {
    const isChromeAvailable = await this.chromeProvider.isAvailable();
    if (isChromeAvailable) {
      this.activeEngine = "chrome-gemini";
    } else {
      // Safari / Firefox / non-flag browser defaults directly to Bedrock
      this.activeEngine = "bedrock";
    }
    return this.getEngineLabel();
  }

  public toggleEngine(): string {
    this.activeEngine = this.activeEngine === "chrome-gemini" ? "bedrock" : "chrome-gemini";
    return this.getEngineLabel();
  }

  public setEngine(engine: EngineType): string {
    this.activeEngine = engine;
    return this.getEngineLabel();
  }

  public getActiveEngine(): EngineType {
    return this.activeEngine;
  }

  public getEngineLabel(): string {
    return this.activeEngine === "chrome-gemini"
      ? "✨ CHROME_GEMINI_NANO · on-device"
      : "+ BEDROCK_STREAM · claude-3-5-sonnet";
  }

  public getActiveProviderName(): string {
    return this.activeEngine === "chrome-gemini"
      ? this.chromeProvider.name
      : this.backendProvider.name;
  }

  public getMessages(): ChatMessage[] {
    return this.messages;
  }

  public clearHistory(): void {
    this.messages = [];
  }

  public async sendMessage(
    content: string,
    onChunk: StreamCallback
  ): Promise<void> {
    if (this.currentAbortController) {
      this.currentAbortController.abort();
    }
    this.currentAbortController = new AbortController();

    const userMsg: ChatMessage = {
      role: "user",
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };
    this.messages.push(userMsg);

    const assistantMsg: ChatMessage = {
      role: "assistant",
      content: "",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      provider: this.activeEngine,
    };
    this.messages.push(assistantMsg);

    const primaryProvider = this.activeEngine === "chrome-gemini" ? this.chromeProvider : this.backendProvider;
    const fallbackProvider = this.activeEngine === "chrome-gemini" ? this.backendProvider : this.chromeProvider;

    try {
      await primaryProvider.streamChat(
        this.messages.slice(0, -1),
        (chunk) => {
          assistantMsg.content += chunk.delta;
          onChunk(chunk);
        },
        this.currentAbortController.signal
      );
    } catch (primaryErr) {
      console.warn("Primary AI engine failed, attempting fallback:", primaryErr);

      if (this.onEngineSwitchCallback) {
        this.onEngineSwitchCallback(
          this.activeEngine === "chrome-gemini" ? "+ BEDROCK_STREAM · claude-3-5-sonnet" : "✨ CHROME_GEMINI_NANO · on-device",
          "Primary engine error; engaged automated fallback."
        );
      }

      try {
        await fallbackProvider.streamChat(
          this.messages.slice(0, -1),
          (chunk) => {
            assistantMsg.content += chunk.delta;
            onChunk(chunk);
          },
          this.currentAbortController.signal
        );
      } catch {
        // Last-mile zero-network in-memory engine fallback
        try {
          const resp = PersonaService.generateResponse(content);
          const words = resp.split(" ");
          for (let i = 0; i < words.length; i++) {
            const piece = words[i] + (i < words.length - 1 ? " " : "");
            assistantMsg.content += piece;
            onChunk({ delta: piece, done: false, provider: "in-memory" });
            await new Promise((r) => setTimeout(r, 18));
          }
          onChunk({ delta: "", done: true, provider: "in-memory" });
        } catch {
          const errorMsg = "ENGINE_ERROR: Unable to connect. Try /contact for direct reach.";
          assistantMsg.content = errorMsg;
          onChunk({ delta: errorMsg, done: true, provider: "error" });
        }
      }
    } finally {
      this.currentAbortController = null;
    }
  }
}
