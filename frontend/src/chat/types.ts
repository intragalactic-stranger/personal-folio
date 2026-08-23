/**
 * Types and interfaces for hybrid chat providers.
 */

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: string;
  provider?: string;
}

export interface StreamChunk {
  delta: string;
  done: boolean;
  provider: string;
}

export type StreamCallback = (chunk: StreamChunk) => void;

export interface AiProvider {
  name: string;
  isAvailable(): Promise<boolean>;
  streamChat(messages: ChatMessage[], onChunk: StreamCallback, signal?: AbortSignal): Promise<void>;
}
