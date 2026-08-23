import { Vector2D } from "./vector2d";
import { Cluster } from "./cluster";
import { Starfield } from "./starfield";
import { CanvasRenderer, SelectedNodeInfo } from "../render/canvas_renderer";

export class PhysicsEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private renderer: CanvasRenderer;
  private starfield: Starfield;
  private clusters: Cluster[] = [];
  private centerNode: Vector2D;
  private mousePos: Vector2D | null = null;
  private mouseRadius = 150;
  private mouseForce = 12;
  private dpr = 1;
  private isRunning = false;
  private isTerminalOpen = false;
  private animFrameId: number | null = null;
  private onCenterNodeClickCallback: (() => void) | null = null;
  private hoveredCluster: Cluster | null = null;
  private selectedNode: SelectedNodeInfo | null = null;
  private isLegendCollapsed = true;

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
    if (open) {
      this.selectedNode = null;
      this.hoveredCluster = null;
    }
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
      this.checkHoverStates(e.clientX, e.clientY);
    });

    window.addEventListener("mouseleave", () => {
      this.mousePos = null;
      this.hoveredCluster = null;
    });

    this.canvas.addEventListener("click", (e: MouseEvent) => {
      const clickPos = new Vector2D(e.clientX, e.clientY);

      // 1. Check Legend overlay click in bottom-left
      if (
        !this.isTerminalOpen &&
        e.clientX >= 20 &&
        e.clientX <= 280 &&
        e.clientY >= window.innerHeight - 170 &&
        e.clientY <= window.innerHeight - 12
      ) {
        this.isLegendCollapsed = !this.isLegendCollapsed;
        return;
      }

      // 2. Check if a specific particle node was clicked
      if (!this.isTerminalOpen) {
        let clickedParticle = false;
        for (const c of this.clusters) {
          for (const p of c.particles) {
            if (p.type === "label" && p.label) {
              const d = clickPos.dist(p.pos);
              if (d < 24) {
                this.selectedNode = {
                  particle: p,
                  clusterTheme: c.themeTitle,
                  category: c.meta.zoneCode,
                };
                clickedParticle = true;
                break;
              }
            }
          }
          if (clickedParticle) break;
        }

        if (clickedParticle) return;
      }

      // 3. Check Central Profile Node click
      const clickDist = this.centerNode.dist(clickPos);
      if (clickDist < 85 || !this.isTerminalOpen) {
        this.selectedNode = null;
        if (this.onCenterNodeClickCallback) {
          this.onCenterNodeClickCallback();
        }
      }
    });

    window.addEventListener(
      "touchmove",
      (e: TouchEvent) => {
        if (e.touches.length > 0) {
          const touch = e.touches[0];
          if (!this.mousePos) {
            this.mousePos = new Vector2D(touch.clientX, touch.clientY);
          } else {
            this.mousePos.set(touch.clientX, touch.clientY);
          }
        }
      },
      { passive: true }
    );

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

  private checkHoverStates(x: number, y: number): void {
    if (this.isTerminalOpen) {
      this.hoveredCluster = null;
      return;
    }

    const mouse = new Vector2D(x, y);

    // Check cluster centroid proximity
    let foundCluster: Cluster | null = null;
    for (const c of this.clusters) {
      if (mouse.dist(c.center) < c.radius + 35) {
        foundCluster = c;
        break;
      }
    }
    this.hoveredCluster = foundCluster;

    // Check individual particle hover
    for (const c of this.clusters) {
      for (const p of c.particles) {
        p.isHovered = mouse.dist(p.pos) < 22;
      }
    }
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

    // Satellite positions with ample padding from screen edges
    const clusterPositions = [
      { x: width * 0.18, y: height * 0.26, count: 20, radius: 80, color: "#00cccc" }, // 01 Agentic Systems
      { x: width * 0.82, y: height * 0.26, count: 20, radius: 80, color: "#3888ff" }, // 02 Graph RAG
      { x: width * 0.84, y: height * 0.70, count: 18, radius: 78, color: "#00cccc" }, // 03 Evals & Infra
      { x: width * 0.16, y: height * 0.70, count: 20, radius: 80, color: "#3888ff" }, // 04 Cloud & Platforms
      { x: width * 0.50, y: height * 0.76, count: 18, radius: 75, color: "#00cccc" }, // 05 Forecasting & ML
    ];

    clusterPositions.forEach((cp, idx) => {
      this.clusters.push(
        new Cluster({
          id: idx,
          center: new Vector2D(cp.x, cp.y),
          particleCount: cp.count,
          radius: cp.radius,
          gravityStrength: 0.022,
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
    this.starfield.update();

    // Cursor repulsion physics
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

    // Cluster gravitation & spring update
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
    this.renderer.drawClusters(this.clusters, this.centerNode, this.hoveredCluster, this.selectedNode);

    if (!this.isTerminalOpen) {
      this.renderer.drawLegendOverlay(width, height, this.isLegendCollapsed);
    }
  }
}
