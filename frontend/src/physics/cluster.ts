import { Particle } from "./particle";
import { Vector2D } from "./vector2d";
import { TECH_CLUSTERS_CONFIG, TechClusterMeta } from "../render/ascii_glyphs";

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
  public meta: TechClusterMeta;
  public isHovered = false;

  constructor(cfg: ClusterConfig) {
    this.id = cfg.id;
    this.center = cfg.center.clone();
    this.baseCenter = cfg.center.clone();
    this.radius = cfg.radius;
    this.gravityStrength = cfg.gravityStrength;
    this.wanderAngle = Math.random() * Math.PI * 2;
    this.wanderSpeed = cfg.wanderSpeed ?? 0.0015 + Math.random() * 0.002;
    this.wanderRadius = 14 + Math.random() * 12;
    this.color = cfg.color ?? "#00cccc";

    const clusterData = TECH_CLUSTERS_CONFIG[cfg.id % TECH_CLUSTERS_CONFIG.length];
    this.meta = clusterData;
    this.themeTitle = cfg.themeTitle ?? clusterData.theme;

    // Filter valid non-empty tags strictly
    const validTags = clusterData.tags.filter(
      (t) => typeof t === "string" && t.trim().length > 0 && t !== "undefined"
    );

    this.initParticles(cfg.particleCount, validTags);
  }

  private initParticles(count: number, validTags: string[]): void {
    const numTags = validTags.length;

    for (let i = 0; i < count; i++) {
      const hasTag = i < numTags;
      const tag = hasTag ? validTags[i] : null;
      const isSpinner = !hasTag && Math.random() < 0.25;

      let angle: number;
      let r: number;

      if (hasTag) {
        // Distribute tags evenly in an outward staggered ring
        const baseAngle = (i / numTags) * Math.PI * 2;
        const stagger = (i % 2 === 0 ? 0.75 : 1.15);
        angle = baseAngle;
        r = this.radius * stagger;
      } else {
        angle = Math.random() * Math.PI * 2;
        r = Math.pow(Math.random(), 0.5) * (this.radius * 1.3);
      }

      const px = this.center.x + Math.cos(angle) * r;
      const py = this.center.y + Math.sin(angle) * r;

      let type: "dot" | "ascii" | "spinner" | "label" = "dot";
      let char = "•";
      let label = "";
      let size = 2.5 + Math.random() * 2;

      if (tag) {
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
        mass: tag ? 1.8 : 0.9 + Math.random() * 1.2,
        color: this.color,
        size,
        clusterId: this.id,
        orbitRadius: r,
        orbitSpeed: (0.001 + Math.random() * 0.002) * (i % 2 === 0 ? 1 : -1),
        orbitAngle: angle,
      });

      this.particles.push(p);
    }
  }

  public update(): void {
    // Gentle centroid wander
    this.wanderAngle += this.wanderSpeed;
    this.center.x = this.baseCenter.x + Math.cos(this.wanderAngle) * this.wanderRadius;
    this.center.y = this.baseCenter.y + Math.sin(this.wanderAngle) * (this.wanderRadius * 0.6);

    const pLen = this.particles.length;

    // Label-aware collision repulsion (wider horizontally than vertically)
    for (let i = 0; i < pLen; i++) {
      const p1 = this.particles[i];
      for (let j = i + 1; j < pLen; j++) {
        const p2 = this.particles[j];
        const dx = p1.pos.x - p2.pos.x;
        const dy = (p1.pos.y - p2.pos.y) * 1.6;
        const distSq = dx * dx + dy * dy;
        const minDist = (p1.type === "label" && p2.type === "label") ? 68 : 28;

        if (distSq < minDist * minDist && distSq > 0.01) {
          const dist = Math.sqrt(distSq);
          const pushForce = ((minDist - dist) / minDist) * 0.75;
          const forceVec = new Vector2D((dx / dist) * pushForce, ((p1.pos.y - p2.pos.y) / dist) * pushForce);
          p1.applyForce(forceVec);
          p2.applyForce(Vector2D.mult(forceVec, -1));
        }
      }
    }

    // Gravitational home attraction
    for (const p of this.particles) {
      const homeX = this.center.x + Math.cos(p.orbitAngle) * p.orbitRadius;
      const homeY = this.center.y + Math.sin(p.orbitAngle) * (p.orbitRadius * 0.85);
      p.homePos.set(homeX, homeY);

      const toHome = Vector2D.sub(p.homePos, p.pos);
      const dist = toHome.mag();

      if (dist > 0.5) {
        const springForce = dist * this.gravityStrength;
        toHome.normalize().mult(Math.min(springForce, 3.5));
        p.applyForce(toHome);
      }

      p.update(0.92);
    }
  }
}
