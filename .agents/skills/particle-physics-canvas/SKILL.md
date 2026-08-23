---
name: particle-physics-canvas
description: >-
  High-performance direct HTML5 Canvas and requestAnimationFrame physics engine for terminal-style
  interactive particle clusters, ASCII glyph starfields, gravitational attraction, cursor scatter dynamics,
  and HiDPI rendering optimization.
---

# Particle Physics & ASCII Canvas Engine

## 1. Core Physics Dynamics

### Gravitational Attraction & Cluster Cohesion
- Each particle cluster has a home centroid $C_k = (x_k, y_k)$ and orbit characteristics.
- Gravitational pull toward centroid:
  $$\vec{F}_{\text{grav}} = -k \cdot (\vec{p} - \vec{C}_k) \cdot \text{mass}$$
- Damping / Friction: $\vec{v} \leftarrow \vec{v} \cdot \mu$ where $\mu \approx 0.92 - 0.96$ prevents perpetual oscillation.
- Dynamic clustering: Particles orbit their local cluster center or wander through starfield grids.

### Cursor Scatter / Repulsion Dynamics
- Mouse cursor position $\vec{M} = (m_x, m_y)$ exerts radial repulsion within radius $R_{\text{repulsion}} \approx 140\text{px}$:
  $$\vec{d} = \vec{p} - \vec{M}, \quad r = |\vec{d}|$$
  $$\text{If } r < R_{\text{repulsion}}: \vec{F}_{\text{repulse}} = \frac{\vec{d}}{r} \cdot \left(1 - \frac{r}{R_{\text{repulsion}}}\right) \cdot F_{\text{max}}$$
- Elastic recoil & reunion: As cursor moves away, $\vec{F}_{\text{repulse}}$ drops to zero, and gravitational restitution smoothly pulls the scattered asteroid cluster back into its home orbit with gentle spring oscillation.

## 2. ASCII & Pixel Glyph Rendering
- **Starfield Background**: Subtle stationary/drifting glyphs (`*`, `+`, `·`, `✧`, `✦`, `°`, `×`, `~`, `^`, `⌬`) with sinusoidal luminescence modulation $L(t) = 0.2 + 0.8 \cdot \sin^2(\omega t + \phi)$.
- **Rotating Glyphs**: ASCII spinner cycles (`⠋`, `⠙`, `⠹`, `⠸`, `⠼`, `⠴`, `⠦`, `⠧`, `⠇`, `⠏` or `|`, `/`, `-`, `\`) that rotate based on angular velocity or time.
- **Particle Types**:
  - `PixelDot`: High-density sub-pixel glowing squares/circles.
  - `AsciiChar`: Monospace characters with canvas text rendering and glow `ctx.shadowBlur`.
  - `ClusterNode`: Inter-connected asteroid nodes with faint constellation lines when distance $< d_{\text{link}}$.

## 3. Performance & Resource Budgeting
- Locked to 60+ FPS using `requestAnimationFrame(loop)`.
- HiDPI sharp rendering: `canvas.width = window.innerWidth * window.devicePixelRatio`, scale context.
- Spatial partitioning or bounded array pooling for particle allocations (zero runtime GC pressure).
- Pause loop automatically via `document.hidden` / IntersectionObserver when tab is backgrounded.
