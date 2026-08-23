import { STARFIELD_GLYPHS, SPINNER_FRAMES } from "../render/ascii_glyphs";

export interface StarGlyph {
  x: number;
  y: number;
  char: string;
  isSpinner: boolean;
  spinnerIndex: number;
  spinnerSpeed: number;
  spinnerTimer: number;
  baseOpacity: number;
  twinklePhase: number;
  twinkleSpeed: number;
  size: number;
  driftX: number;
  driftY: number;
}

export class Starfield {
  public stars: StarGlyph[] = [];
  public width = 0;
  public height = 0;

  public resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.initStars();
  }

  private initStars(): void {
    this.stars = [];
    const count = Math.floor((this.width * this.height) / 8000);

    for (let i = 0; i < count; i++) {
      const isSpinner = Math.random() < 0.08;
      const char = isSpinner
        ? SPINNER_FRAMES[0]
        : STARFIELD_GLYPHS[Math.floor(Math.random() * STARFIELD_GLYPHS.length)];

      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        char,
        isSpinner,
        spinnerIndex: Math.floor(Math.random() * SPINNER_FRAMES.length),
        spinnerSpeed: 6 + Math.floor(Math.random() * 8),
        spinnerTimer: 0,
        baseOpacity: 0.15 + Math.random() * 0.45,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.015 + Math.random() * 0.03,
        size: isSpinner ? 11 : 9 + Math.random() * 4,
        driftX: (Math.random() - 0.5) * 0.1,
        driftY: (Math.random() - 0.5) * 0.1,
      });
    }
  }

  public update(): void {
    for (const star of this.stars) {
      star.twinklePhase += star.twinkleSpeed;
      star.x += star.driftX;
      star.y += star.driftY;

      if (star.x < 0) star.x = this.width;
      if (star.x > this.width) star.x = 0;
      if (star.y < 0) star.y = this.height;
      if (star.y > this.height) star.y = 0;

      if (star.isSpinner) {
        star.spinnerTimer++;
        if (star.spinnerTimer >= star.spinnerSpeed) {
          star.spinnerTimer = 0;
          star.spinnerIndex = (star.spinnerIndex + 1) % SPINNER_FRAMES.length;
          star.char = SPINNER_FRAMES[star.spinnerIndex];
        }
      }
    }
  }
}
