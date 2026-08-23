---
name: ui-ux-pro
description: >-
  Expert UI/UX design and frontend aesthetics skill specializing in terminal-style monospace interfaces,
  glowing cyberpunk color systems, micro-interactions, responsive typography, and high-converting portfolio UX.
---

# UI/UX Pro Design System: Terminal Aesthetic

## 1. Color Palette & Lighting Hierarchy
- **Base Background**: Deep space void `#080b10` / `#0d1117` with subtle linear noise or radial gradient.
- **Surface Elevation**: `#111827` (card background), `#1f2937` (borders/dividers with 1px border opacity).
- **Primary Glow / Accent**: OpenCode Signature Cyan-Blue:
  - Electric Blue: `#38bdf8` (primary highlight, active states)
  - Cobalt Cyan: `#58a6ff` (terminal glyphs, links, cursor)
  - Deep Azure: `#2563eb` (glow aura, button hover shadows)
- **Status Accents**:
  - Success / Active: `#4ade80` (Terminal green dot)
  - Warning / Idle: `#fbbf24` (Amber pulse)
  - Error: `#f87171`
- **Text Contrast**:
  - Primary Text: `#f1f5f9` (95% contrast)
  - Secondary / Metadata: `#94a3b8`
  - Dimmed ASCII / Background glyphs: `#334155` to `#1e293b`

## 2. Monospace Typography & Spacing
- **Font Stack**: `"JetBrains Mono", "Fira Code", "SF Mono", "Cascadia Code", monospace`
- **Typographic Scale**:
  - Hero Title: `clamp(2rem, 5vw, 3.5rem)` with tracking `-0.02em`
  - Terminal Command: `1rem` / line-height `1.6`
  - Code Blocks / Chat output: `0.9rem`
  - Metadata / Tag badges: `0.75rem` uppercase with letter spacing `0.05em`

## 3. Terminal Micro-Interactions & Aesthetic Details
- **Command Prompt Prompt Line**: `ganeshan@ai-engineer:~$ ` with pulsing block cursor `▋` (smooth blink animation).
- **Window Chrome**: Mac/Linux terminal window headers (red, yellow, green control dots, title centered).
- **Subtle Scanlines**: Optional CSS pseudo-element scanline texture with `pointer-events: none; opacity: 0.04`.
- **Keyboard Navigation & Accessibility**: Full focus rings `#38bdf8`, `tabindex`, ARIA attributes, semantic HTML.
- **Glassmorphism**: Backdrop blur `backdrop-filter: blur(12px)` for overlay windows and floating assistant terminal.
