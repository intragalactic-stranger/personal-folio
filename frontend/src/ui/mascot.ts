/**
 * A small reactive glyph companion that lives in the chat dock header.
 * Same bracket width across every frame so it never reflows its neighbors.
 */
type MascotState = "idle" | "typing" | "thinking" | "happy" | "error";

const FRAMES: Record<MascotState, string[]> = {
  idle: ["[ ◉ ◉ ]", "[ ─ ─ ]"], // second frame is the blink
  typing: ["[ ◆ ◆ ]"],
  thinking: ["[ ◔ ◔ ]", "[ ◑ ◑ ]", "[ ◕ ◕ ]", "[ ● ● ]"],
  happy: ["[ ★ ★ ]"],
  error: ["[ ✕ ✕ ]"],
};

export class Mascot {
  private el: HTMLElement;
  private state: MascotState = "idle";
  private frameTimer: number | null = null;

  constructor(container: HTMLElement) {
    this.el = container;
    this.el.className = "mascot";
    this.el.setAttribute("aria-hidden", "true");
    this.setState("idle");
  }

  public setState(next: MascotState): void {
    if (this.frameTimer !== null) {
      window.clearInterval(this.frameTimer);
      this.frameTimer = null;
    }
    this.state = next;
    this.el.className = `mascot state-${next}`;
    this.el.textContent = FRAMES[next][0];

    if (next === "thinking") {
      let i = 0;
      this.frameTimer = window.setInterval(() => {
        i = (i + 1) % FRAMES.thinking.length;
        this.el.textContent = FRAMES.thinking[i];
      }, 220);
    }

    if (next === "happy" || next === "error" || next === "typing") {
      window.setTimeout(() => {
        if (this.state === next) this.setState("idle");
      }, next === "typing" ? 900 : 650);
    }
  }

  /** Call once after mount to start the idle blink loop. */
  public startIdleBlink(): void {
    window.setInterval(() => {
      if (this.state !== "idle") return;
      this.el.textContent = FRAMES.idle[1];
      window.setTimeout(() => {
        if (this.state === "idle") this.el.textContent = FRAMES.idle[0];
      }, 140);
    }, 3400 + Math.random() * 1800);
  }
}
