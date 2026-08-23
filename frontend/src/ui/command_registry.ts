export interface CommandResult {
  output?: string;
  action?: "switch-tab" | "clear" | "toggle-chat" | "open-link";
  target?: string;
}

export class CommandRegistry {
  public static execute(input: string): CommandResult {
    const raw = input.trim().toLowerCase();
    if (!raw) return {};

    const [cmd, ...args] = raw.split(/\s+/);

    switch (cmd) {
      case "help":
        return {
          output:
            "Available Terminal Commands:\n" +
            "  about       - Switch to Operator Bio\n" +
            "  projects    - View Featured AI Projects\n" +
            "  skills      - Inspect Technical Arsenal & Stack\n" +
            "  experience  - View Career Timeline\n" +
            "  contact     - Open Transmission & Contact Form\n" +
            "  chat [msg]  - Launch or send message to AI Assistant\n" +
            "  clear       - Reset terminal buffer\n" +
            "  status      - Display system telemetry\n" +
            "  github      - Open Ganeshan's GitHub profile",
        };

      case "about":
      case "01":
      case "bio":
        return { action: "switch-tab", target: "about" };

      case "projects":
      case "02":
      case "work":
        return { action: "switch-tab", target: "projects" };

      case "skills":
      case "03":
      case "stack":
        return { action: "switch-tab", target: "skills" };

      case "experience":
      case "04":
      case "timeline":
        return { action: "switch-tab", target: "experience" };

      case "contact":
      case "05":
      case "email":
        return { action: "switch-tab", target: "contact" };

      case "chat":
      case "ai":
      case "ask":
        return { action: "toggle-chat", target: args.join(" ") };

      case "clear":
      case "cls":
        return { action: "clear" };

      case "status":
        return {
          output:
            "[SYS_STATUS: ONLINE]\n" +
            "Kernel: 60FPS Canvas Physics + Hybrid LLM Engine\n" +
            "Operator: Ganeshan Arumuganainar\n" +
            "Region: ASIA-SOUTH1 // GLOBAL_NODE\n" +
            "Load: 0.04 (Nominal)",
        };

      case "github":
        return { action: "open-link", target: "https://github.com/ganeshan" };

      default:
        return {
          output: `Command not found: '${cmd}'. Type 'help' for a list of valid commands.`,
        };
    }
  }
}
