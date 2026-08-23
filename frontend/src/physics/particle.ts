import { Vector2D } from "./vector2d";

export type ParticleType = "dot" | "ascii" | "spinner" | "label";

export interface ParticleOptions {
  x: number;
  y: number;
  type?: ParticleType;
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
  public mass: number;
  public type: ParticleType;
  public char: string;
  public label: string;
  public color: string;
  public size: number;
  public opacity: number;
  public clusterId: number;
  public orbitRadius: number;
  public orbitSpeed: number;
  public orbitAngle: number;
  public rotation: number;
  public angularVelocity: number;
  public spinnerFrame: number;

  constructor(opts: ParticleOptions) {
    this.pos = new Vector2D(opts.x, opts.y);
    this.vel = new Vector2D((Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5);
    this.acc = new Vector2D(0, 0);
    this.homePos = new Vector2D(opts.x, opts.y);
    this.mass = opts.mass ?? 1;
    this.type = opts.type ?? "dot";
    this.char = opts.char ?? "•";
    this.label = opts.label ?? "";
    this.color = opts.color ?? "#38bdf8";
    this.size = opts.size ?? (this.type === "dot" ? 2.5 : this.type === "label" ? 11 : 12);
    this.opacity = 0.5 + Math.random() * 0.5;
    this.clusterId = opts.clusterId ?? 0;
    this.orbitRadius = opts.orbitRadius ?? 0;
    this.orbitSpeed = opts.orbitSpeed ?? 0;
    this.orbitAngle = opts.orbitAngle ?? Math.random() * Math.PI * 2;
    this.rotation = Math.random() * Math.PI * 2;
    this.angularVelocity = (Math.random() - 0.5) * 0.03;
    this.spinnerFrame = Math.floor(Math.random() * 10);
  }

  public applyForce(force: Vector2D): void {
    const f = force.clone().div(this.mass);
    this.acc.add(f);
  }

  public update(damping = 0.94): void {
    this.vel.add(this.acc);
    this.vel.mult(damping);
    this.pos.add(this.vel);
    this.acc.set(0, 0);

    this.rotation += this.angularVelocity;
    this.orbitAngle += this.orbitSpeed;
  }
}
