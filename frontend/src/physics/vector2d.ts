/**
 * High-performance 2D Vector math module.
 */
export class Vector2D {
  public x: number;
  public y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  public set(x: number, y: number): this {
    this.x = x;
    this.y = y;
    return this;
  }

  public clone(): Vector2D {
    return new Vector2D(this.x, this.y);
  }

  public add(v: Vector2D): this {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  public sub(v: Vector2D): this {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  public mult(n: number): this {
    this.x *= n;
    this.y *= n;
    return this;
  }

  public div(n: number): this {
    if (n !== 0) {
      this.x /= n;
      this.y /= n;
    }
    return this;
  }

  public magSq(): number {
    return this.x * this.x + this.y * this.y;
  }

  public mag(): number {
    return Math.sqrt(this.magSq());
  }

  public dist(v: Vector2D): number {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  public normalize(): this {
    const m = this.mag();
    if (m !== 0) {
      this.div(m);
    }
    return this;
  }

  public limit(max: number): this {
    const mSq = this.magSq();
    if (mSq > max * max) {
      this.div(Math.sqrt(mSq)).mult(max);
    }
    return this;
  }

  public static dist(v1: Vector2D, v2: Vector2D): number {
    return v1.dist(v2);
  }

  public static sub(v1: Vector2D, v2: Vector2D): Vector2D {
    return new Vector2D(v1.x - v2.x, v1.y - v2.y);
  }
}
