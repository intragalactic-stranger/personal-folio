import { Starfield } from "../physics/starfield";
import { Cluster } from "../physics/cluster";
import { Particle } from "../physics/particle";
import { Vector2D } from "../physics/vector2d";
import { SPINNER_FRAMES, TECH_CLUSTERS_CONFIG } from "./ascii_glyphs";

export interface SelectedNodeInfo {
  particle: Particle;
  clusterTheme: string;
  category: string;
}

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
        ctx.fillStyle = `rgba(0, 204, 204, ${clampedAlpha})`;
        ctx.shadowColor = "rgba(0, 204, 204, 0.6)";
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
    const pulse = (Math.sin(this.pulseTimer) + 1) / 2;
    const radius = 74;

    ctx.save();

    // 1. Outer pulsing ring
    const ringRadius = radius + 10 + pulse * 6;
    ctx.strokeStyle = `rgba(0, 204, 204, ${0.25 + pulse * 0.25})`;
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
    grad.addColorStop(0, "rgba(10, 18, 28, 0.95)");
    grad.addColorStop(0.75, "rgba(8, 14, 22, 0.92)");
    grad.addColorStop(1, "rgba(0, 204, 204, 0.35)");

    ctx.fillStyle = grad;
    ctx.strokeStyle = "rgba(0, 204, 204, 0.85)";
    ctx.lineWidth = 2;
    ctx.shadowColor = "#00cccc";
    ctx.shadowBlur = 16 + pulse * 8;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // 3. Central Node Typography
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Status indicator
    ctx.font = "bold 11px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#4ade80";
    ctx.shadowColor = "#4ade80";
    ctx.shadowBlur = 6;
    ctx.fillText("● AI_CORE_NODE", center.x, center.y - 32);

    // Big Name
    ctx.font = "bold 13px 'JetBrains Mono', monospace";
    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    ctx.shadowColor = "#00cccc";
    ctx.shadowBlur = 10;
    ctx.fillText("GANESHAN", center.x, center.y - 12);
    ctx.fillText("ARUMUGANAINAR", center.x, center.y + 6);

    // Headline tag
    ctx.font = "9px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#00cccc";
    ctx.shadowBlur = 4;
    ctx.fillText("SYSTEMS & EVALS", center.x, center.y + 26);

    // 4. Interactive Callout below central node
    if (!isTerminalOpen) {
      const hintY = center.y + radius + 28;
      const hintText = "[ ✦ CLICK NODE TO OPEN TERMINAL ]";
      ctx.font = "bold 10px 'JetBrains Mono', monospace";
      ctx.fillStyle = `rgba(0, 204, 204, ${0.7 + pulse * 0.3})`;
      ctx.shadowColor = "#00cccc";
      ctx.shadowBlur = 8;
      ctx.fillText(hintText, center.x, hintY);
    }

    ctx.restore();
  }

  public drawClusters(
    clusters: Cluster[],
    centerNode: Vector2D,
    hoveredCluster: Cluster | null,
    selectedNode: SelectedNodeInfo | null
  ): void {
    const ctx = this.ctx;

    for (const cluster of clusters) {
      const isHovered = hoveredCluster?.id === cluster.id;

      // 1. Draw Master Constellation Trunk
      ctx.save();
      const trunkGrad = ctx.createLinearGradient(
        centerNode.x,
        centerNode.y,
        cluster.center.x,
        cluster.center.y
      );
      trunkGrad.addColorStop(0, "rgba(0, 204, 204, 0.45)");
      trunkGrad.addColorStop(0.5, "rgba(0, 204, 204, 0.2)");
      trunkGrad.addColorStop(1, cluster.color);

      ctx.strokeStyle = trunkGrad;
      ctx.lineWidth = isHovered ? 2.0 : 1.2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(centerNode.x, centerNode.y);
      ctx.lineTo(cluster.center.x, cluster.center.y);
      ctx.stroke();
      ctx.restore();

      // 2. Draw cluster title badge in a dark pill background
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "bold 10px 'JetBrains Mono', monospace";
      const titleText = `⬡ ${cluster.themeTitle}`;
      const titleWidth = ctx.measureText(titleText).width;
      const titleY = cluster.center.y - cluster.radius - 14;

      ctx.fillStyle = "rgba(6, 10, 16, 0.9)";
      ctx.strokeStyle = isHovered ? "rgba(0, 204, 204, 0.8)" : "rgba(0, 204, 204, 0.35)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(cluster.center.x - titleWidth / 2 - 8, titleY - 10, titleWidth + 16, 20, 4);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = isHovered ? "#ffffff" : "rgba(0, 204, 204, 0.85)";
      ctx.shadowColor = "#00cccc";
      ctx.shadowBlur = isHovered ? 8 : 4;
      ctx.fillText(titleText, cluster.center.x, titleY);
      ctx.restore();

      // 3. Draw inter-particle constellation lines
      ctx.save();
      const pLen = cluster.particles.length;
      for (let i = 0; i < pLen; i++) {
        const p1 = cluster.particles[i];
        for (let j = i + 1; j < pLen; j++) {
          const p2 = cluster.particles[j];
          const distSq = (p1.pos.x - p2.pos.x) ** 2 + (p1.pos.y - p2.pos.y) ** 2;
          const maxDist = 75;
          if (distSq < maxDist * maxDist) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / maxDist) * 0.28;
            ctx.strokeStyle = `rgba(0, 204, 204, ${lineAlpha})`;
            ctx.lineWidth = (p1.type === "label" && p2.type === "label") ? 1.0 : 0.7;
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
        if (p.type === "label" && p.label && p.label !== "undefined" && p.label.trim()) {
          ctx.font = "10px 'JetBrains Mono', monospace";
          const textWidth = ctx.measureText(p.label).width;
          const paddingX = 6;
          const height = 18;

          ctx.fillStyle = "rgba(6, 10, 16, 0.88)";
          ctx.strokeStyle = p.isHovered ? "#00cccc" : "rgba(0, 204, 204, 0.45)";
          ctx.lineWidth = p.isHovered ? 1.5 : 1;
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

          ctx.fillStyle = p.isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.88)";
          ctx.shadowColor = "#00cccc";
          ctx.shadowBlur = p.isHovered ? 8 : 4;
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

    // 5. Draw Cluster Zone Hover Stat Card
    if (hoveredCluster) {
      this.drawClusterHoverCard(hoveredCluster);
    }

    // 6. Draw Selected Node Click Tooltip Card
    if (selectedNode) {
      this.drawNodeTooltip(selectedNode);
    }
  }

  private drawClusterHoverCard(cluster: Cluster): void {
    const ctx = this.ctx;
    ctx.save();
    ctx.font = "10px 'JetBrains Mono', monospace";
    const summaryWidth = ctx.measureText(cluster.meta.summary).width;
    const titleWidth = ctx.measureText(`⬡ ${cluster.meta.zoneCode}`).width;
    const contentWidth = Math.max(summaryWidth, titleWidth);
    const boxWidth = Math.max(340, contentWidth + 40);
    const boxHeight = 52;

    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    let boxY: number;
    if (cluster.center.y > screenH * 0.52) {
      boxY = cluster.center.y - cluster.radius - boxHeight - 20;
    } else {
      boxY = cluster.center.y + cluster.radius + 20;
    }

    boxY = Math.max(65, Math.min(screenH - boxHeight - 20, boxY));

    let boxX = cluster.center.x;
    boxX = Math.max(boxWidth / 2 + 16, Math.min(screenW - boxWidth / 2 - 16, boxX));

    ctx.fillStyle = "rgba(6, 10, 16, 0.96)";
    ctx.strokeStyle = "#00cccc";
    ctx.lineWidth = 1.3;
    ctx.shadowColor = "#00cccc";
    ctx.shadowBlur = 14;

    ctx.beginPath();
    ctx.roundRect(boxX - boxWidth / 2, boxY, boxWidth, boxHeight, 5);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.font = "bold 11px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#00cccc";
    ctx.fillText(`⬡ ${cluster.meta.zoneCode}`, boxX, boxY + 18);

    ctx.font = "10px 'JetBrains Mono', monospace";
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.fillText(cluster.meta.summary, boxX, boxY + 36);

    ctx.restore();
  }

  private drawNodeTooltip(info: SelectedNodeInfo): void {
    const ctx = this.ctx;
    const p = info.particle;
    const width = 230;
    const height = 54;
    const screenW = window.innerWidth;

    let x = p.pos.x;
    x = Math.max(width / 2 + 16, Math.min(screenW - width / 2 - 16, x));

    let y = p.pos.y - 45;
    y = Math.max(70, y);

    ctx.save();
    ctx.fillStyle = "rgba(6, 10, 16, 0.96)";
    ctx.strokeStyle = "#00cccc";
    ctx.lineWidth = 1.5;
    ctx.shadowColor = "#00cccc";
    ctx.shadowBlur = 14;

    ctx.beginPath();
    ctx.roundRect(x - width / 2, y - height, width, height, 4);
    ctx.fill();
    ctx.stroke();

    // Triangle notch
    ctx.beginPath();
    ctx.moveTo(x - 6, y);
    ctx.lineTo(x + 6, y);
    ctx.lineTo(x, y + 6);
    ctx.closePath();
    ctx.fillStyle = "#00cccc";
    ctx.fill();

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.font = "bold 11px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`NODE: ${p.label || "SYSTEM_PARTICLE"}`, x, y - height + 18);

    ctx.font = "9px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#00cccc";
    ctx.fillText(`ZONE: ${info.clusterTheme}`, x, y - height + 36);

    ctx.restore();
  }

  public drawLegendOverlay(_width: number, height: number, isCollapsed: boolean): void {
    const ctx = this.ctx;
    const x = 20;
    const y = height - (isCollapsed ? 92 : 218);
    const w = 260;
    const h = isCollapsed ? 32 : 155;

    ctx.save();
    ctx.fillStyle = "rgba(6, 10, 16, 0.92)";
    ctx.strokeStyle = "rgba(0, 204, 204, 0.35)";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 4);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

    // Header
    ctx.font = "bold 10px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#00cccc";
    ctx.fillText(`⬡ GRAPH LEGEND [${isCollapsed ? "+" : "—"}]`, x + 12, y + 16);

    if (!isCollapsed) {
      ctx.font = "9px 'JetBrains Mono', monospace";
      TECH_CLUSTERS_CONFIG.forEach((cfg, i) => {
        const itemY = y + 42 + i * 22;
        ctx.fillStyle = cfg.color;
        ctx.beginPath();
        ctx.arc(x + 16, itemY, 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
        ctx.fillText(cfg.theme, x + 26, itemY);
      });
    }

    ctx.restore();
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
    grad.addColorStop(0, "rgba(0, 204, 204, 0.14)");
    grad.addColorStop(0.7, "rgba(0, 204, 204, 0.03)");
    grad.addColorStop(1, "rgba(0, 204, 204, 0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(mousePos.x, mousePos.y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
