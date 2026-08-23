import { Particle } from "./particle";
import { Vector2D } from "./vector2d";
import { TECH_CLUSTERS_CONFIG } from "../render/ascii_glyphs";

export interface ClusterConfig {
  id: number;
  center: Vector2D;
  particleCount: number;
  radius: number;
  gravityStrength: number;
  wanderSpeed?: number;
  color?: string;
  themeTitle?: string;
}

export class Cluster {
  public id: number;
  public center: Vector2D;
  public baseCenter: Vector2D;
  public particles: Particle[] = [];
  public radius: number;
  public gravityStrength: number;
  public wanderAngle: number;
  public wanderSpeed: number;
  public wanderRadius: number;
  public color: string;
  public themeTitle: string;

  constructor(cfg: ClusterConfig) {
    this.id = cfg.id;
    this.center = cfg.center.clone();
    this.baseCenter = cfg.center.clone();
    this.radius = cfg.radius;
    this.gravityStrength = cfg.gravityStrength;
    this.wanderAngle = Math.random() * Math.PI * 2;
    this.wanderSpeed = cfg.wanderSpeed ?? 0.003 + Math.random() * 0.003;
    this.wanderRadius = 20 + Math.random() * 25;
    this.color = cfg.color ?? "#38bdf8";

    const clusterData = TECH_CLUSTERS_CONFIG[cfg.id % TECH_CLUSTERS_CONFIG.length];
    this.themeTitle = cfg.themeTitle ?? clusterData.theme;

    this.initParticles(cfg.particleCount, clusterData.tags);
  }

  private initParticles(count: number, tags: string[]): void {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.pow(Math.random(), 0.55) * this.radius;
      const px = this.center.x + Math.cos(angle) * r;
      const py = this.center.y + Math.sin(angle) * r;

      const tag = i < tags.length && typeof tags[i] === "string" && tags[i].trim() ? tags[i] : null;
      const isLabel = tag !== null;
      const isSpinner = !isLabel && Math.random() < 0.25;

      let type: "dot" | "ascii" | "spinner" | "label" = "dot";
      let char = "•";
      let label = "";
      let size = 2.5 + Math.random() * 2;

      if (isLabel && tag) {
        type = "label";
        label = tag;
        size = 11;
      } else if (isSpinner) {
        type = "spinner";
        char = "⠋";
        size = 11;
      } else {
        type = "dot";
        char = "•";
        size = 3;
      }

      const p = new Particle({
        x: px,
        y: py,
        type,
        char,
        label,
        mass: isLabel ? 1.5 : 0.9 + Math.random() * 1.2,
        color: this.color,
        size,
        clusterId: this.id,
        orbitRadius: r,
        orbitSpeed: (0.003 + Math.random() * 0.005) * (Math.random() > 0.5 ? 1 : -1),
        orbitAngle: angle,
      });

      this.particles.push(p);
    }
  }

  public update(): void {
    // Gentle centroid orbital wander
    this.wanderAngle += this.wanderSpeed;
    this.center.x = this.baseCenter.x + Math.cos(this.wanderAngle) * this.wanderRadius;
    this.center.y = this.baseCenter.y + Math.sin(this.wanderAngle) * (this.wanderRadius * 0.7);

    // Update each particle's home position based on dynamic cluster orbit
    for (const p of this.particles) {
      const homeX = this.center.x + Math.cos(p.orbitAngle) * p.orbitRadius;
      const homeY = this.center.y + Math.sin(p.orbitAngle) * p.orbitRadius;
      p.homePos.set(homeX, homeY);

      // Gravitational attraction toward dynamic home position
      const toHome = Vector2D.sub(p.homePos, p.pos);
      const dist = toHome.mag();

      if (dist > 0.5) {
        const springForce = dist * this.gravityStrength;
        toHome.normalize().mult(Math.min(springForce, 4.0));
        p.applyForce(toHome);
      }

      p.update(0.93);
    }
  }
}
