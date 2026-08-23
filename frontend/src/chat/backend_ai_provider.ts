import { AiProvider, ChatMessage, StreamCallback } from "./types";

export class BackendAiProvider implements AiProvider {
  public name = "Amazon Bedrock (FastAPI)";

  public async isAvailable(): Promise<boolean> {
    try {
      const res = await fetch("/api/health");
      return res.ok;
    } catch {
      return false;
    }
  }

  public async streamChat(
    messages: ChatMessage[],
    onChunk: StreamCallback,
    signal?: AbortSignal
  ): Promise<void> {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        stream: true,
      }),
      signal,
    });

    if (!response.ok) {
      throw new Error(`Chat API error: ${response.status} ${response.statusText}`);
    }

    if (!response.body) {
      throw new Error("No response stream body available");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith(":") || trimmed.startsWith("event:")) {
          continue;
        }

        if (trimmed.startsWith("data:")) {
          const jsonStr = trimmed.slice(5).trim();
          if (!jsonStr) continue;

          try {
            const data = JSON.parse(jsonStr);
            onChunk({
              delta: data.delta || "",
              done: data.done || false,
              provider: data.provider || "bedrock",
            });
          } catch {
            // Raw text chunk fallback
            onChunk({
              delta: jsonStr,
              done: false,
              provider: "bedrock",
            });
          }
        }
      }
    }

    onChunk({
      delta: "",
      done: true,
      provider: "bedrock",
    });
  }
}
