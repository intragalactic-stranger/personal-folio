import "./styles/main.css";
import "./styles/terminal.css";
import "./styles/chat.css";

import { PhysicsEngine } from "./physics/engine";
import { TerminalChatUi } from "./chat/terminal_chat_ui";
import { TerminalWindow } from "./ui/terminal_window";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize HTML5 Canvas 60FPS Gravitational Physics Engine
  let physics: PhysicsEngine | undefined;
  const canvas = document.getElementById("particle-canvas") as HTMLCanvasElement;
  if (canvas) {
    physics = new PhysicsEngine(canvas);
    physics.start();
  }

  // 2. Initialize Claude Code / Terminal Style AI Assistant
  const chatContainer = document.getElementById("chat-dock-container") as HTMLElement;
  const chatUi = new TerminalChatUi(chatContainer);

  // 3. Initialize Main Terminal Portfolio Shell
  const terminalContainer = document.getElementById("terminal-window-container") as HTMLElement;
  new TerminalWindow(terminalContainer, chatUi, physics);

  // 4. Wire Assistant toggle button in top nav
  const navAssistantBtn = document.getElementById("nav-assistant-btn");
  if (navAssistantBtn) {
    navAssistantBtn.addEventListener("click", () => {
      chatUi.toggle();
    });
  }

  console.log(
    "%c[GANESHAN_AI_NODE] System online. Central Knowledge Graph Active.",
    "color: #38bdf8; font-weight: bold; background: #080b10; padding: 4px 8px; border: 1px solid #38bdf8;"
  );
});
