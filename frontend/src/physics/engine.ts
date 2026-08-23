import { Vector2D } from "./vector2d";
import { Cluster } from "./cluster";
import { Starfield } from "./starfield";
import { CanvasRenderer } from "../render/canvas_renderer";

export class PhysicsEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private renderer: CanvasRenderer;
  private starfield: Starfield;
  private clusters: Cluster[] = [];
  private centerNode: Vector2D;
  private mousePos: Vector2D | null = null;
  private mouseRadius = 160;
  private mouseForce = 14;
  private dpr = 1;
  private isRunning = false;
  private isTerminalOpen = false;
  private animFrameId: number | null = null;
  private onCenterNodeClickCallback: (() => void) | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Failed to get 2D canvas rendering context");
    }
    this.ctx = ctx;
    this.renderer = new CanvasRenderer(this.ctx);
    this.starfield = new Starfield();
    this.centerNode = new Vector2D(window.innerWidth / 2, window.innerHeight / 2);

    this.setupListeners();
    this.handleResize();
    this.initClusters();
  }

  public setCenterNodeClickCallback(cb: () => void): void {
    this.onCenterNodeClickCallback = cb;
  }

  public setTerminalOpen(open: boolean): void {
    this.isTerminalOpen = open;
  }

  private setupListeners(): void {
    window.addEventListener("resize", () => {
      this.handleResize();
      this.initClusters();
    });

    window.addEventListener("mousemove", (e: MouseEvent) => {
      if (!this.mousePos) {
        this.mousePos = new Vector2D(e.clientX, e.clientY);
      } else {
        this.mousePos.set(e.clientX, e.clientY);
      }
    });

    window.addEventListener("mouseleave", () => {
      this.mousePos = null;
    });

    this.canvas.addEventListener("click", (e: MouseEvent) => {
      const clickDist = this.centerNode.dist(new Vector2D(e.clientX, e.clientY));
      if (clickDist < 85 || !this.isTerminalOpen) {
        if (this.onCenterNodeClickCallback) {
          this.onCenterNodeClickCallback();
        }
      }
    });

    window.addEventListener("touchmove", (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        if (!this.mousePos) {
          this.mousePos = new Vector2D(touch.clientX, touch.clientY);
        } else {
          this.mousePos.set(touch.clientX, touch.clientY);
        }
      }
    }, { passive: true });

    window.addEventListener("touchend", () => {
      this.mousePos = null;
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.stop();
      } else {
        this.start();
      }
    });
  }

  public handleResize(): void {
    this.dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.canvas.width = width * this.dpr;
    this.canvas.height = height * this.dpr;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

    this.ctx.resetTransform();
    this.ctx.scale(this.dpr, this.dpr);

    this.centerNode.set(width / 2, height / 2);
    this.starfield.resize(width, height);
  }

  private initClusters(): void {
    this.clusters = [];
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.centerNode.set(width / 2, height / 2);

    // Orbital satellite positions around screen center
    const clusterPositions = [
      { x: width * 0.20, y: height * 0.26, count: 24, radius: 80, color: "#38bdf8" }, // 01 Agentic Systems (Top-Left)
      { x: width * 0.80, y: height * 0.26, count: 24, radius: 80, color: "#58a6ff" }, // 02 Graph RAG (Top-Right)
      { x: width * 0.83, y: height * 0.72, count: 22, radius: 75, color: "#38bdf8" }, // 03 Evals & Infra (Bottom-Right)
      { x: width * 0.17, y: height * 0.72, count: 24, radius: 80, color: "#58a6ff" }, // 04 Cloud & Platforms (Bottom-Left)
      { x: width * 0.50, y: height * 0.84, count: 22, radius: 75, color: "#38bdf8" }, // 05 Forecasting & ML (Bottom-Mid)
    ];

    clusterPositions.forEach((cp, idx) => {
      this.clusters.push(
        new Cluster({
          id: idx,
          center: new Vector2D(cp.x, cp.y),
          particleCount: cp.count,
          radius: cp.radius,
          gravityStrength: 0.024,
          color: cp.color,
        })
      );
    });
  }

  public start(): void {
    if (this.isRunning) return;
    this.isRunning = true;

    const loop = (): void => {
      if (!this.isRunning) return;
      this.update();
      this.render();
      this.animFrameId = requestAnimationFrame(loop);
    };

    this.animFrameId = requestAnimationFrame(loop);
  }

  public stop(): void {
    this.isRunning = false;
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  private update(): void {
    // 1. Starfield twinkling & slow drift
    this.starfield.update();

    // 2. Cursor repulsion physics over all cluster particles
    if (this.mousePos) {
      const mouse = this.mousePos;
      const rRepulse = this.mouseRadius;
      const maxForce = this.mouseForce;

      for (const cluster of this.clusters) {
        for (const p of cluster.particles) {
          const dx = p.pos.x - mouse.x;
          const dy = p.pos.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < rRepulse * rRepulse && distSq > 0.001) {
            const dist = Math.sqrt(distSq);
            const forceMag = (1 - dist / rRepulse) * maxForce;
            const repulseForce = new Vector2D((dx / dist) * forceMag, (dy / dist) * forceMag);
            p.applyForce(repulseForce);
          }
        }
      }
    }

    // 3. Cluster gravitation & spring update
    for (const cluster of this.clusters) {
      cluster.update();
    }
  }

  private render(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.renderer.clear(width, height);
    this.renderer.drawCursorField(this.mousePos, this.mouseRadius);
    this.renderer.drawStarfield(this.starfield);
    this.renderer.drawCentralNode(this.centerNode, this.isTerminalOpen);
    this.renderer.drawClusters(this.clusters, this.centerNode);
  }
}
