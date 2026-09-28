import { Vector2D } from "./vector2d";

export interface ParticleOptions {
  x: number;
  y: number;
  type?: "dot" | "ascii" | "spinner" | "label";
  char?: string;
  label?: string;
  mass?: number;
  color?: string;
  size?: number;
  clusterId?: number;
  orbitRadius?: number;
  orbitSpeed?: number;
  orbitAngle?: number;
}

export class Particle {
  public pos: Vector2D;
  public vel: Vector2D;
  public acc: Vector2D;
  public homePos: Vector2D;
  public type: "dot" | "ascii" | "spinner" | "label";
  public char: string;
  public label: string;
  public mass: number;
  public color: string;
  public size: number;
  public clusterId: number;
  public orbitRadius: number;
  public orbitSpeed: number;
  public orbitAngle: number;
  public rotation = 0;
  public isHovered = false;

  constructor(opts: ParticleOptions) {
    this.pos = new Vector2D(opts.x, opts.y);
    this.vel = new Vector2D(0, 0);
    this.acc = new Vector2D(0, 0);
    this.homePos = new Vector2D(opts.x, opts.y);
    this.type = opts.type ?? "dot";
    this.char = opts.char ?? "•";
    this.label = (opts.label && opts.label !== "undefined" && opts.label.trim()) ? opts.label.trim() : "";
    this.mass = opts.mass ?? 1.0;
    this.color = opts.color ?? "#00cccc";
    this.size = opts.size ?? 3;
    this.clusterId = opts.clusterId ?? 0;
    this.orbitRadius = opts.orbitRadius ?? 30;
    this.orbitSpeed = opts.orbitSpeed ?? 0.005;
    this.orbitAngle = opts.orbitAngle ?? Math.random() * Math.PI * 2;
  }

  public applyForce(force: Vector2D): void {
    const f = Vector2D.div(force, this.mass);
    this.acc.add(f);
  }

  public update(damping = 0.93): void {
    this.vel.add(this.acc);
    this.vel.mult(damping);
    this.pos.add(this.vel);
    this.acc.set(0, 0);

    // Orbit angle progression
    this.orbitAngle += this.orbitSpeed;
    this.rotation += 0.02;
  }
}
