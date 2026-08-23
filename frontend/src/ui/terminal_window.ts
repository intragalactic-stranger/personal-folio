import { ContentSections } from "./content_sections";
import { CommandRegistry } from "./command_registry";
import { TerminalChatUi } from "../chat/terminal_chat_ui";
import { PhysicsEngine } from "../physics/engine";

export class TerminalWindow {
  private container: HTMLElement;
  private chatUi: TerminalChatUi;
  private physicsEngine: PhysicsEngine | null = null;
  private currentTab = "about";
  private commandHistory: string[] = [];
  private historyIndex = -1;
  private isTerminalOpen = false;

  constructor(container: HTMLElement, chatUi: TerminalChatUi, physicsEngine?: PhysicsEngine) {
    this.container = container;
    this.chatUi = chatUi;
    if (physicsEngine) {
      this.physicsEngine = physicsEngine;
      this.physicsEngine.setCenterNodeClickCallback(() => {
        this.openTerminal();
      });
    }

    this.render();
    this.setupEvents();
    this.switchTab("about");

    // Start in full graph universe view
    this.closeTerminal();
  }

  private render(): void {
    this.container.innerHTML = `
      <div class="terminal-window">
        <div class="terminal-header">
          <div class="terminal-controls">
            <span class="t-dot red" id="t-dot-close" title="Close Terminal &amp; View Graph"></span>
            <span class="t-dot yellow" id="t-dot-min" title="Minimize"></span>
            <span class="t-dot green" id="t-dot-expand" title="Active Node"></span>
          </div>
          <div class="terminal-title">ganeshan@ai-node: ~/${this.currentTab}</div>
          <div class="terminal-actions">
            <button class="nav-btn" id="btn-close-to-graph" style="padding: 2px 8px; font-size: 0.7rem;">⬡ GRAPH_VIEW</button>
            <div class="terminal-badge">SYS_ACTIVE</div>
          </div>
        </div>

        <div class="terminal-body" id="terminal-body">
          <div class="banner-container">
            <div class="ascii-banner">${ContentSections.getAsciiBanner()}</div>
            <div class="banner-subtitle">[ AI SOFTWARE ENGINEER // AGENTIC SYSTEMS // EVALS &amp; LLM INFRASTRUCTURE ]</div>
          </div>
          ${ContentSections.getMetaGrid()}
          <div id="dynamic-content"></div>
        </div>

        <div class="terminal-cli-bar">
          <span class="cli-prompt">ganeshan@ai-node:~$</span>
          <input type="text" class="cli-input" id="terminal-cli-input" placeholder="Type a command (e.g. 'projects', 'skills', 'chat', 'help')..." autocomplete="off" />
        </div>
      </div>
    `;
  }

  private setupEvents(): void {
    // Nav buttons open the terminal to that specific tab
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const tab = (btn as HTMLElement).dataset.tab;
        if (tab) {
          this.openTerminal();
          this.switchTab(tab);
        }
      });
    });

    // Close to Graph triggers
    const closeBtn = this.container.querySelector("#btn-close-to-graph");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.closeTerminal());
    }

    const redDot = this.container.querySelector("#t-dot-close");
    if (redDot) {
      redDot.addEventListener("click", () => this.closeTerminal());
    }

    // Floating Graph Universe Toggle button
    const floatGraphBtn = document.getElementById("float-graph-view-btn");
    if (floatGraphBtn) {
      floatGraphBtn.addEventListener("click", () => {
        if (this.isTerminalOpen) {
          this.closeTerminal();
        } else {
          this.openTerminal();
        }
      });
    }

    // Top Brand title click opens/toggles terminal
    const brand = document.querySelector(".brand-section");
    if (brand) {
      brand.addEventListener("click", () => {
        if (this.isTerminalOpen) {
          this.closeTerminal();
        } else {
          this.openTerminal();
        }
      });
    }

    // Pressing any key while on graph view opens the terminal
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (!this.isTerminalOpen && e.key !== "Tab" && e.key !== "Escape") {
        this.openTerminal();
        const cliInput = this.container.querySelector("#terminal-cli-input") as HTMLInputElement;
        if (cliInput && e.key.length === 1) {
          cliInput.focus();
        }
      }
    });

    // CLI input bar
    const cliInput = this.container.querySelector("#terminal-cli-input") as HTMLInputElement;
    cliInput.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const value = cliInput.value.trim();
        if (value) {
          this.commandHistory.push(value);
          this.historyIndex = this.commandHistory.length;
          this.handleCliCommand(value);
          cliInput.value = "";
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (this.historyIndex > 0) {
          this.historyIndex--;
          cliInput.value = this.commandHistory[this.historyIndex] || "";
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (this.historyIndex < this.commandHistory.length - 1) {
          this.historyIndex++;
          cliInput.value = this.commandHistory[this.historyIndex] || "";
        } else {
          this.historyIndex = this.commandHistory.length;
          cliInput.value = "";
        }
      }
    });
  }

  public openTerminal(): void {
    this.isTerminalOpen = true;
    const appContainer = document.querySelector(".app-container");
    if (appContainer) {
      appContainer.classList.remove("canvas-peek");
    }
    if (this.physicsEngine) {
      this.physicsEngine.setTerminalOpen(true);
    }
    const floatBtn = document.getElementById("float-graph-view-btn");
    if (floatBtn) {
      floatBtn.innerHTML = "<span>⬡</span> VIEW_GRAPH_UNIVERSE";
    }
  }

  public closeTerminal(): void {
    this.isTerminalOpen = false;
    const appContainer = document.querySelector(".app-container");
    if (appContainer) {
      appContainer.classList.add("canvas-peek");
    }
    if (this.physicsEngine) {
      this.physicsEngine.setTerminalOpen(false);
    }
    const floatBtn = document.getElementById("float-graph-view-btn");
    if (floatBtn) {
      floatBtn.innerHTML = "<span>⌨</span> OPEN_TERMINAL";
    }
  }

  public switchTab(tab: string): void {
    this.currentTab = tab;

    // Update nav active states
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      const bTab = (btn as HTMLElement).dataset.tab;
      btn.classList.toggle("active", bTab === tab);
    });

    // Update window header title
    const title = this.container.querySelector(".terminal-title");
    if (title) {
      title.textContent = `ganeshan@ai-node: ~/${tab}`;
    }

    const dynamicContent = this.container.querySelector("#dynamic-content");
    if (!dynamicContent) return;

    switch (tab) {
      case "about":
        dynamicContent.innerHTML = ContentSections.renderAbout();
        break;
      case "projects":
        dynamicContent.innerHTML = ContentSections.renderProjects();
        break;
      case "skills":
        dynamicContent.innerHTML = ContentSections.renderSkills();
        break;
      case "experience":
        dynamicContent.innerHTML = ContentSections.renderExperience();
        break;
      case "contact":
        dynamicContent.innerHTML = ContentSections.renderContact();
        this.wireContactForm();
        break;
      default:
        dynamicContent.innerHTML = ContentSections.renderAbout();
    }
  }

  private wireContactForm(): void {
    const form = this.container.querySelector("#contact-form") as HTMLFormElement;
    if (!form) return;

    const statusMsg = this.container.querySelector("#contact-status-msg") as HTMLElement;
    const submitBtn = this.container.querySelector("#contact-submit-btn") as HTMLButtonElement;

    form.addEventListener("submit", async (e: Event) => {
      e.preventDefault();
      const name = (form.querySelector("#c-name") as HTMLInputElement).value;
      const email = (form.querySelector("#c-email") as HTMLInputElement).value;
      const subject = (form.querySelector("#c-subject") as HTMLInputElement).value;
      const message = (form.querySelector("#c-message") as HTMLTextAreaElement).value;

      submitBtn.disabled = true;
      submitBtn.textContent = "TRANSMITTING...";
      statusMsg.innerHTML = '<span style="color: var(--color-blue-primary);">Transmitting packet to server...</span>';

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, subject, message }),
        });

        if (res.ok) {
          const data = await res.json();
          statusMsg.innerHTML = `<span style="color: var(--color-status-green);">✔ [200 OK] ${data.message}</span>`;
          form.reset();
        } else {
          statusMsg.innerHTML = '<span style="color: var(--color-status-red);">✖ [ERROR] Transmission failed. Please reach via ganeshanarumuganainar@gmail.com</span>';
        }
      } catch {
        statusMsg.innerHTML = '<span style="color: var(--color-status-red);">✖ [OFFLINE] Network unreachable. Please contact directly via ganeshanarumuganainar@gmail.com</span>';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "TRANSMIT PACKET ➔";
      }
    });
  }

  private handleCliCommand(input: string): void {
    const res = CommandRegistry.execute(input);

    if (res.action === "switch-tab" && res.target) {
      this.openTerminal();
      this.switchTab(res.target);
    } else if (res.action === "toggle-chat") {
      this.chatUi.show();
    } else if (res.action === "open-link" && res.target) {
      window.open(res.target, "_blank");
    } else if (res.action === "clear") {
      const dynamicContent = this.container.querySelector("#dynamic-content");
      if (dynamicContent) {
        dynamicContent.innerHTML = '<div style="color: var(--color-text-dim); padding: 2rem 0;">Terminal buffer cleared. Enter a command or select a tab.</div>';
      }
    } else if (res.output) {
      const dynamicContent = this.container.querySelector("#dynamic-content");
      if (dynamicContent) {
        dynamicContent.innerHTML = `
          <div style="background: rgba(0,0,0,0.5); padding: 1rem; border-radius: 4px; border: 1px solid var(--border-dim); white-space: pre-wrap; font-family: var(--font-mono); color: var(--color-blue-primary);">
${res.output}
          </div>
        `;
      }
    }
  }
}
