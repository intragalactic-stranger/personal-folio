import { Starfield } from "../physics/starfield";
import { Cluster } from "../physics/cluster";
import { Vector2D } from "../physics/vector2d";
import { SPINNER_FRAMES } from "./ascii_glyphs";

export class CanvasRenderer {
  private ctx: CanvasRenderingContext2D;
  private pulseTimer = 0;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  public clear(width: number, height: number): void {
    this.ctx.clearRect(0, 0, width, height);
    this.pulseTimer += 0.03;
  }

  public drawStarfield(starfield: Starfield): void {
    const ctx = this.ctx;
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "10px 'JetBrains Mono', monospace";

    for (const star of starfield.stars) {
      const alpha = star.baseOpacity + Math.sin(star.twinklePhase) * 0.25;
      const clampedAlpha = Math.max(0.05, Math.min(1.0, alpha));

      if (star.isSpinner) {
        ctx.fillStyle = `rgba(56, 189, 248, ${clampedAlpha})`;
        ctx.shadowColor = "rgba(56, 189, 248, 0.6)";
        ctx.shadowBlur = 4;
      } else {
        ctx.fillStyle = `rgba(148, 163, 184, ${clampedAlpha * 0.7})`;
        ctx.shadowBlur = 0;
      }

      ctx.fillText(star.char, star.x, star.y);
    }
    ctx.restore();
  }

  public drawCentralNode(center: Vector2D, isTerminalOpen: boolean): void {
    const ctx = this.ctx;
    const pulse = (Math.sin(this.pulseTimer) + 1) / 2; // 0 to 1
    const radius = 72;

    ctx.save();

    // 1. Outer cybernetic pulsing ring
    const ringRadius = radius + 10 + pulse * 6;
    ctx.strokeStyle = `rgba(56, 189, 248, ${0.25 + pulse * 0.25})`;
    ctx.lineWidth = 1.2;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.arc(center.x, center.y, ringRadius, 0, Math.PI * 2);
    ctx.stroke();

    // 2. Central Core Background with radial glow
    const grad = ctx.createRadialGradient(
      center.x,
      center.y,
      0,
      center.x,
      center.y,
      radius
    );
    grad.addColorStop(0, "rgba(14, 22, 34, 0.95)");
    grad.addColorStop(0.75, "rgba(10, 15, 23, 0.92)");
    grad.addColorStop(1, "rgba(56, 189, 248, 0.35)");

    ctx.fillStyle = grad;
    ctx.strokeStyle = "rgba(56, 189, 248, 0.85)";
    ctx.lineWidth = 2;
    ctx.shadowColor = "#38bdf8";
    ctx.shadowBlur = 16 + pulse * 8;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // 3. Central Node Typography
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Top icon / status
    ctx.font = "bold 11px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#4ade80";
    ctx.shadowColor = "#4ade80";
    ctx.shadowBlur = 6;
    ctx.fillText("● AI_CORE_NODE", center.x, center.y - 32);

    // Big Name
    ctx.font = "bold 13px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "#38bdf8";
    ctx.shadowBlur = 10;
    ctx.fillText("GANESHAN", center.x, center.y - 12);
    ctx.fillText("ARUMUGANAINAR", center.x, center.y + 6);

    // Tag
    ctx.font = "9px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#38bdf8";
    ctx.shadowBlur = 4;
    ctx.fillText("SYSTEMS & EVALUATIONS", center.x, center.y + 26);

    // 4. Interactive Callout below central node (when terminal is closed)
    if (!isTerminalOpen) {
      const hintY = center.y + radius + 28;
      const hintText = "[ ✦ CLICK NODE OR PRESS ANY KEY TO OPEN TERMINAL ]";
      ctx.font = "bold 10px 'JetBrains Mono', monospace";
      ctx.fillStyle = `rgba(56, 189, 248, ${0.7 + pulse * 0.3})`;
      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 8;
      ctx.fillText(hintText, center.x, hintY);
    }

    ctx.restore();
  }

  public drawClusters(clusters: Cluster[], centerNode: Vector2D): void {
    const ctx = this.ctx;

    for (const cluster of clusters) {
      // 1. Draw Master Constellation Trunk from Center Node to Cluster
      ctx.save();
      const trunkGrad = ctx.createLinearGradient(
        centerNode.x,
        centerNode.y,
        cluster.center.x,
        cluster.center.y
      );
      trunkGrad.addColorStop(0, "rgba(56, 189, 248, 0.45)");
      trunkGrad.addColorStop(0.5, "rgba(56, 189, 248, 0.2)");
      trunkGrad.addColorStop(1, "rgba(88, 166, 255, 0.35)");

      ctx.strokeStyle = trunkGrad;
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(centerNode.x, centerNode.y);
      ctx.lineTo(cluster.center.x, cluster.center.y);
      ctx.stroke();
      ctx.restore();

      // 2. Draw cluster title badge at centroid
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "bold 9px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(56, 189, 248, 0.75)";
      ctx.shadowColor = "rgba(56, 189, 248, 0.5)";
      ctx.shadowBlur = 6;
      ctx.fillText(`⬡ ${cluster.themeTitle}`, cluster.center.x, cluster.center.y - cluster.radius - 12);
      ctx.restore();

      // 3. Draw inter-particle constellation lines within cluster
      ctx.save();
      const pLen = cluster.particles.length;
      for (let i = 0; i < pLen; i++) {
        const p1 = cluster.particles[i];
        for (let j = i + 1; j < pLen; j++) {
          const p2 = cluster.particles[j];
          const distSq = (p1.pos.x - p2.pos.x) ** 2 + (p1.pos.y - p2.pos.y) ** 2;
          const maxDist = 70;
          if (distSq < maxDist * maxDist) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / maxDist) * 0.26;
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.pos.x, p1.pos.y);
            ctx.lineTo(p2.pos.x, p2.pos.y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      // 4. Draw particles & technology labels
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (const p of cluster.particles) {
        if (p.type === "label" && p.label && p.label.trim()) {
          // Draw neat glowing technology tag
          ctx.font = "10px 'JetBrains Mono', monospace";
          const textWidth = ctx.measureText(p.label).width;
          const paddingX = 5;
          const height = 16;

          ctx.fillStyle = "rgba(8, 12, 18, 0.85)";
          ctx.strokeStyle = "rgba(56, 189, 248, 0.5)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(
            p.pos.x - textWidth / 2 - paddingX,
            p.pos.y - height / 2,
            textWidth + paddingX * 2,
            height,
            3
          );
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = "#f1f5f9";
          ctx.shadowColor = "#38bdf8";
          ctx.shadowBlur = 6;
          ctx.fillText(p.label, p.pos.x, p.pos.y);
        } else if (p.type === "spinner") {
          const frame = SPINNER_FRAMES[Math.floor(p.rotation * 4) % SPINNER_FRAMES.length];
          ctx.font = `${p.size}px 'JetBrains Mono', monospace`;
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.fillText(frame, p.pos.x, p.pos.y);
        } else {
          // Dot
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(p.pos.x, p.pos.y, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    }
  }

  public drawCursorField(mousePos: Vector2D | null, radius: number): void {
    if (!mousePos) return;
    const ctx = this.ctx;
    ctx.save();
    const grad = ctx.createRadialGradient(
      mousePos.x,
      mousePos.y,
      0,
      mousePos.x,
      mousePos.y,
      radius
    );
    grad.addColorStop(0, "rgba(56, 189, 248, 0.14)");
    grad.addColorStop(0.7, "rgba(56, 189, 248, 0.03)");
    grad.addColorStop(1, "rgba(56, 189, 248, 0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(mousePos.x, mousePos.y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
