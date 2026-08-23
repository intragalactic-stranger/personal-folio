import "./styles/main.css";
import "./styles/terminal.css";
import "./styles/chat.css";

import { PhysicsEngine } from "./physics/engine";
import { TerminalChatUi } from "./chat/terminal_chat_ui";
import { TerminalWindow } from "./ui/terminal_window";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Terminal Boot Splash Overlay (<450ms)
  const splash = document.createElement("div");
  splash.id = "terminal-boot-splash";
  splash.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background: #060a10; z-index: 9999; display: flex; flex-direction: column;
    align-items: center; justify-content: center; font-family: 'JetBrains Mono', monospace;
    color: #00cccc; font-size: 0.9rem; transition: opacity 0.3s ease; pointer-events: none;
  `;
  splash.innerHTML = `
    <div style="font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem;">[ GANESHAN_OS // KERNEL_INIT ]</div>
    <div id="boot-status-text" style="color: #4ade80; font-size: 0.8rem;">INITIALIZING_SYSTEM...</div>
  `;
  document.body.appendChild(splash);

  const statusText = splash.querySelector("#boot-status-text");
  setTimeout(() => {
    if (statusText) statusText.textContent = "LOADING_KNOWLEDGE_GRAPH...";
  }, 150);
  setTimeout(() => {
    if (statusText) statusText.textContent = "GANESHAN_ONLINE // READY";
  }, 300);
  setTimeout(() => {
    splash.style.opacity = "0";
    setTimeout(() => splash.remove(), 300);
  }, 450);

  // 2. Initialize HTML5 Canvas 60FPS Gravitational Physics Engine
  let physics: PhysicsEngine | undefined;
  const canvas = document.getElementById("particle-canvas") as HTMLCanvasElement;
  if (canvas) {
    physics = new PhysicsEngine(canvas);
    physics.start();
  }

  // 3. Initialize AI Assistant
  const chatContainer = document.getElementById("chat-dock-container") as HTMLElement;
  const chatUi = new TerminalChatUi(chatContainer);

  // 4. Initialize Main Terminal Portfolio Shell
  const terminalContainer = document.getElementById("terminal-window-container") as HTMLElement;
  new TerminalWindow(terminalContainer, chatUi, physics);

  // 5. Wire Assistant toggle button in top nav
  const navAssistantBtn = document.getElementById("nav-assistant-btn");
  if (navAssistantBtn) {
    navAssistantBtn.addEventListener("click", () => {
      chatUi.toggle();
    });
  }

  console.log(
    "%c[GANESHAN_AI_NODE] System online. Central Knowledge Graph Active.",
    "color: #00cccc; font-weight: bold; background: #080b10; padding: 4px 8px; border: 1px solid #00cccc;"
  );
});
