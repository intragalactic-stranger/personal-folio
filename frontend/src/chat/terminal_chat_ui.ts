import { ChatController } from "./chat_controller";

export class TerminalChatUi {
  private container: HTMLElement;
  private controller: ChatController;
  private messagesContainer!: HTMLElement;
  private inputElement!: HTMLInputElement;
  private engineTagElement!: HTMLElement;
  private isMinimized = false;
  private isFullscreen = false;
  private isStreaming = false;

  constructor(container: HTMLElement) {
    this.container = container;
    this.controller = new ChatController();
    this.render();
    this.setupEvents();
    this.initEngine();
  }

  private render(): void {
    this.container.className = "chat-dock hidden";
    this.container.innerHTML = `
      <div class="chat-header" id="chat-header">
        <div class="chat-title-group">
          <span class="chat-pulse-icon" style="font-weight: 700; font-size: 0.85rem; color: #00cccc;">&gt;_&lt;</span>
          <span class="chat-title">GANESHAN // AI_ASSISTANT</span>
          <button class="chat-engine-tag" id="chat-engine-tag" title="Click to toggle between Chrome Gemini & Bedrock">
            INITIALIZING...
          </button>
        </div>
        <div class="chat-actions">
          <button class="chat-tool-btn" id="chat-btn-fullscreen" title="Toggle Fullscreen">⛶</button>
          <button class="chat-tool-btn" id="chat-btn-minimize" title="Minimize">─</button>
          <button class="chat-tool-btn" id="chat-btn-close" title="Close Panel">✕</button>
        </div>
      </div>
      <div class="chat-messages" id="chat-messages">
        <div class="msg-row assistant">
          <div class="msg-header">
            <span class="msg-assistant-tag">&gt;_&lt; GANESHAN_AI</span>
            <span class="msg-time">${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
          </div>
          <div class="msg-body">Terminal AI Assistant initialized. Ask me about Ganeshan's work at PibyThree, LangGraph multi-agent architectures, Celery evaluation sidecars, or production Graph RAG.
Type <code>/projects</code>, <code>/skills</code>, or <code>/contact</code> for quick answers.</div>
        </div>
      </div>
      <div class="quick-prompts">
        <button class="prompt-chip" data-prompt="/projects">/projects</button>
        <button class="prompt-chip" data-prompt="/skills">/skills</button>
        <button class="prompt-chip" data-prompt="/experience">/experience</button>
        <button class="prompt-chip" data-prompt="Explain Ganeshan's Celery evaluation sidecar">Eval Sidecar</button>
        <button class="prompt-chip" data-prompt="/contact">/contact</button>
        <button class="prompt-chip" data-prompt="/clear">/clear</button>
      </div>
      <div class="chat-input-bar">
        <span class="chat-input-prefix">&gt;</span>
        <input type="text" class="chat-input" id="chat-input" placeholder="Ask AI Assistant or type /help..." autocomplete="off" />
        <button class="chat-send-btn" id="chat-send-btn">SEND</button>
      </div>
    `;

    this.messagesContainer = this.container.querySelector("#chat-messages") as HTMLElement;
    this.inputElement = this.container.querySelector("#chat-input") as HTMLInputElement;
    this.engineTagElement = this.container.querySelector("#chat-engine-tag") as HTMLElement;

    this.controller.onEngineSwitchCallback = (newEngine, reason) => {
      this.updateEngineBadge(newEngine);
      if (reason) {
        this.appendSystemMessage(`ℹ System Notice: ${reason} Active: **${newEngine}**`);
      }
    };
  }

  private async initEngine(): Promise<void> {
    const engineMode = await this.controller.initialize();
    this.updateEngineBadge(engineMode);
  }

  private updateEngineBadge(mode: string): void {
    this.engineTagElement.textContent = mode;
    if (mode.includes("CHROME")) {
      this.engineTagElement.style.color = "#00cccc";
      this.engineTagElement.style.borderColor = "rgba(0, 204, 204, 0.4)";
      this.inputElement.placeholder = "Ask Chrome Gemini Assistant or type /help...";
    } else {
      this.engineTagElement.style.color = "#4ade80";
      this.engineTagElement.style.borderColor = "rgba(74, 222, 128, 0.4)";
      this.inputElement.placeholder = "Ask Bedrock Assistant (Claude 3.5 Sonnet)...";
    }
  }

  private setupEvents(): void {
    const header = this.container.querySelector("#chat-header") as HTMLElement;
    const minBtn = this.container.querySelector("#chat-btn-minimize") as HTMLElement;
    const fsBtn = this.container.querySelector("#chat-btn-fullscreen") as HTMLElement;
    const closeBtn = this.container.querySelector("#chat-btn-close") as HTMLElement;
    const sendBtn = this.container.querySelector("#chat-send-btn") as HTMLElement;

    header.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).closest(".chat-actions") || (e.target as HTMLElement).closest("#chat-engine-tag")) return;
      this.toggleMinimize();
    });

    // Engine toggle button
    this.engineTagElement.addEventListener("click", (e) => {
      e.stopPropagation();
      const newMode = this.controller.toggleEngine();
      this.updateEngineBadge(newMode);
      this.appendSystemMessage(`Switched AI Engine to **${newMode}**.`);
    });

    minBtn.addEventListener("click", () => this.toggleMinimize());
    fsBtn.addEventListener("click", () => this.toggleFullscreen());
    closeBtn.addEventListener("click", () => this.hide());

    sendBtn.addEventListener("click", () => this.handleSubmit());
    this.inputElement.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this.handleSubmit();
      }
    });

    // Quick prompt chip clicks
    this.container.querySelectorAll(".prompt-chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        const prompt = (btn as HTMLElement).dataset.prompt || "";
        if (prompt === "/clear") {
          this.clearMessages();
        } else {
          this.inputElement.value = prompt;
          this.handleSubmit();
        }
      });
    });
  }

  public show(): void {
    this.container.classList.remove("hidden");
    if (this.isMinimized) {
      this.toggleMinimize();
    }
    this.inputElement.focus();
  }

  public hide(): void {
    this.container.classList.add("hidden");
  }

  public toggle(): void {
    if (this.container.classList.contains("hidden")) {
      this.show();
    } else {
      this.hide();
    }
  }

  public toggleMinimize(): void {
    this.isMinimized = !this.isMinimized;
    this.container.classList.toggle("minimized", this.isMinimized);
  }

  public toggleFullscreen(): void {
    this.isFullscreen = !this.isFullscreen;
    this.container.classList.toggle("fullscreen", this.isFullscreen);
  }

  public clearMessages(): void {
    this.controller.clearHistory();
    this.messagesContainer.innerHTML = `
      <div class="msg-row assistant">
        <div class="msg-header">
          <span class="msg-assistant-tag">SYSTEM</span>
          <span class="msg-time">${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
        </div>
        <div class="msg-body">[Buffer cleared]. Ready for new queries.</div>
      </div>
    `;
  }

  private async handleSubmit(): Promise<void> {
    const text = this.inputElement.value.trim();
    if (!text || this.isStreaming) return;

    this.inputElement.value = "";

    if (text.toLowerCase() === "/clear") {
      this.clearMessages();
      return;
    }

    if (text.toLowerCase() === "/help") {
      this.appendUserMessage(text);
      this.appendSystemMessage(
        "Available terminal commands:\n" +
        "• `/projects` - List Ganeshan's featured AI projects\n" +
        "• `/skills` - View technical stack & architectures\n" +
        "• `/experience` - View production career highlights\n" +
        "• `/contact` - View direct contact channels\n" +
        "• `/clear` - Clear conversation history\n" +
        "Or ask any natural language question!"
      );
      return;
    }

    this.appendUserMessage(text);

    // Create assistant streaming message node
    const engineTag = this.controller.getActiveEngine() === "chrome-gemini" ? "CHROME_GEMINI" : "BEDROCK";
    const assistantRow = document.createElement("div");
    assistantRow.className = "msg-row assistant";
    assistantRow.innerHTML = `
      <div class="msg-header">
        <span class="msg-assistant-tag">&gt;_&lt; ${engineTag}</span>
        <span class="msg-time">${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
      </div>
      <div class="msg-body"><span class="cursor-blink">▋</span></div>
    `;
    this.messagesContainer.appendChild(assistantRow);
    this.scrollToBottom();

    const bodySpan = assistantRow.querySelector(".msg-body") as HTMLElement;
    let accumulatedText = "";
    this.isStreaming = true;
    this.setSendingState(true);

    try {
      await this.controller.sendMessage(text, (chunk) => {
        if (!chunk.done) {
          accumulatedText += chunk.delta;
          bodySpan.innerHTML = `${this.formatMarkdown(accumulatedText)} <span class="cursor-blink">▋</span>`;
          this.scrollToBottom();
        } else {
          bodySpan.innerHTML = this.formatMarkdown(accumulatedText);
        }
      });
    } catch {
      bodySpan.innerHTML = `<span style="color: var(--color-status-red)">ENGINE_ERROR: Unable to connect. Try /contact for direct reach.</span>`;
    } finally {
      this.isStreaming = false;
      this.setSendingState(false);
      this.scrollToBottom();
    }
  }

  private setSendingState(sending: boolean): void {
    const sendBtn = this.container.querySelector("#chat-send-btn") as HTMLButtonElement;
    sendBtn.disabled = sending;
    sendBtn.textContent = sending ? "..." : "SEND";
    this.inputElement.disabled = sending;
    if (!sending) this.inputElement.focus();
  }

  private appendUserMessage(text: string): void {
    const row = document.createElement("div");
    row.className = "msg-row user";
    row.innerHTML = `
      <div class="msg-header">
        <span class="msg-user-tag">YOU</span>
        <span class="msg-time">${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
      </div>
      <div class="msg-body">${this.escapeHtml(text)}</div>
    `;
    this.messagesContainer.appendChild(row);
    this.scrollToBottom();
  }

  private appendSystemMessage(text: string): void {
    const row = document.createElement("div");
    row.className = "msg-row assistant";
    row.innerHTML = `
      <div class="msg-header">
        <span class="msg-assistant-tag">SYSTEM</span>
        <span class="msg-time">${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
      </div>
      <div class="msg-body">${this.formatMarkdown(text)}</div>
    `;
    this.messagesContainer.appendChild(row);
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  private escapeHtml(str: string): string {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  private formatMarkdown(str: string): string {
    let html = this.escapeHtml(str);
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
    html = html.replace(/^### (.*$)/gim, '<div style="font-weight:700; color:var(--color-blue-primary); margin:0.35rem 0;">$1</div>');
    return html;
  }
}
