import { AiProvider, ChatMessage, StreamCallback } from "./types";
import { PersonaService } from "./local_knowledge";

interface ChromeAiCapabilities {
  available: "readily" | "after-download" | "no";
}

interface ChromeAiSession {
  promptStreaming(input: string): AsyncIterable<string>;
  prompt?(input: string): Promise<string>;
  destroy(): void;
}

interface ChromeLanguageModel {
  capabilities(): Promise<ChromeAiCapabilities>;
  create(options?: { systemPrompt?: string }): Promise<ChromeAiSession>;
}

declare global {
  interface Window {
    ai?: {
      languageModel?: ChromeLanguageModel;
      createTextSession?: (options?: unknown) => Promise<ChromeAiSession>;
    };
    model?: {
      createTextSession?: (options?: unknown) => Promise<ChromeAiSession>;
    };
  }
}

export class ChromeAiProvider implements AiProvider {
  public name = "Chrome Gemini Nano";
  private session: ChromeAiSession | null = null;

  public async isAvailable(): Promise<boolean> {
    if (typeof window === "undefined") return false;

    // Strict native check for Safari / Firefox / non-flag Chrome
    if (window.ai?.languageModel) {
      try {
        const caps = await window.ai.languageModel.capabilities();
        return caps.available === "readily" || caps.available === "after-download";
      } catch {
        return false;
      }
    }

    if (
      typeof window.ai?.createTextSession === "function" ||
      typeof window.model?.createTextSession === "function"
    ) {
      return true;
    }

    return false;
  }

  public async streamChat(
    messages: ChatMessage[],
    onChunk: StreamCallback,
    signal?: AbortSignal
  ): Promise<void> {
    const lastUserMessage = messages[messages.length - 1]?.content || "";

    // 1. Native Chrome Gemini Nano Prompt API
    if (window.ai?.languageModel) {
      if (!this.session) {
        this.session = await window.ai.languageModel.create({
          systemPrompt:
            "You are the personal AI Assistant for Ganeshan Arumuganainar, AI Software Engineer. " +
            "Answer questions about Ganeshan's background, agentic systems, Celery evaluation sidecars, and Graph RAG.",
        });
      }

      const stream = this.session.promptStreaming(lastUserMessage);
      let previousLength = 0;

      for await (const cumulativeChunk of stream) {
        if (signal?.aborted) break;
        const delta = cumulativeChunk.slice(previousLength);
        previousLength = cumulativeChunk.length;

        onChunk({
          delta,
          done: false,
          provider: "chrome-gemini-nano",
        });
      }

      onChunk({
        delta: "",
        done: true,
        provider: "chrome-gemini-nano",
      });
      return;
    }

    // 2. Client-side local engine fallback
    const responseText = PersonaService.generateResponse(lastUserMessage);
    const words = responseText.split(" ");

    for (let i = 0; i < words.length; i++) {
      if (signal?.aborted) break;
      const chunk = words[i] + (i < words.length - 1 ? " " : "");
      onChunk({
        delta: chunk,
        done: false,
        provider: "chrome-gemini-nano (local)",
      });
      await new Promise((resolve) => setTimeout(resolve, 20));
    }

    onChunk({
      delta: "",
      done: true,
      provider: "chrome-gemini-nano (local)",
    });
  }
}
