import { ChatMessage, StreamCallback } from "./types";
import { ChromeAiProvider } from "./chrome_ai_provider";
import { BackendAiProvider } from "./backend_ai_provider";

export type EngineType = "chrome-gemini" | "bedrock";

export class ChatController {
  private chromeProvider: ChromeAiProvider;
  private backendProvider: BackendAiProvider;
  private activeEngine: EngineType = "chrome-gemini"; // Default to Chrome Gemini
  private messages: ChatMessage[] = [];
  private currentAbortController: AbortController | null = null;

  constructor() {
    this.chromeProvider = new ChromeAiProvider();
    this.backendProvider = new BackendAiProvider();
  }

  public async initialize(): Promise<string> {
    this.activeEngine = "chrome-gemini";
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
    return this.activeEngine === "chrome-gemini" ? "CHROME_GEMINI_NANO" : "BEDROCK_STREAM";
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

    const provider = this.activeEngine === "chrome-gemini" ? this.chromeProvider : this.backendProvider;

    const userMsg: ChatMessage = {
      role: "user",
      content,
      timestamp: new Date().toLocaleTimeString(),
    };
    this.messages.push(userMsg);

    const assistantMsg: ChatMessage = {
      role: "assistant",
      content: "",
      timestamp: new Date().toLocaleTimeString(),
      provider: provider.name,
    };
    this.messages.push(assistantMsg);

    try {
      await provider.streamChat(
        this.messages.slice(0, -1),
        (chunk) => {
          assistantMsg.content += chunk.delta;
          onChunk(chunk);
        },
        this.currentAbortController.signal
      );
    } catch {
      // If error occurs, attempt fallback to other provider
      const fallback = this.activeEngine === "chrome-gemini" ? this.backendProvider : this.chromeProvider;
      await fallback.streamChat(
        this.messages.slice(0, -1),
        (chunk) => {
          assistantMsg.content += chunk.delta;
          onChunk(chunk);
        },
        this.currentAbortController.signal
      );
    } finally {
      this.currentAbortController = null;
    }
  }
}
