# 001: Terminal Physics Portfolio & AI Chatbot Architecture

## Status
`done`

## Goal
Build a personal portfolio and landing site for **Ganeshan Arumuganainar** (AI Software Engineer) featuring:
1. A terminal-style visual aesthetic with deep space void background (`#080b10`), glowing blue theme (`#38bdf8` / `#58a6ff`), twinkling ASCII starfield, and rotating glyph spinners.
2. Interactive gravity-bound particle clusters (asteroid-like ASCII/pixel clusters) that scatter outward with radial velocity when the mouse cursor hovers/disturbs them, and smoothly reunite via gravitational attraction and damping once the cursor leaves.
3. A Claude Code / Terminal-style AI assistant window supporting dual intelligence:
   - Built-in Chrome Prompt API (`window.ai` / `ai.languageModel`) for zero-latency local inference.
   - Backend streaming fallback via FastAPI + Amazon Bedrock (`boto3`) with simulated offline testing fallback.
4. Clean, modular architecture: Vite + vanilla TypeScript frontend for 60FPS physics and zero abstraction tax, plus FastAPI Python backend managed with `uv`.

## Context
The user requested an evocative, terminal-inspired landing website with interactive ASCII/pixel particle clusters simulating gravitational asteroids, OpenCode/Claude Code blue highlights, and a terminal chatbot. The repository has strict planning, code style, and verification rules defined in `AGENTS.md`.

## Decisions & Rationale
1. **Frontend**: Vite + Vanilla TypeScript with direct HTML5 2D Canvas rendering:
   - *Rationale*: Zero framework overhead gives direct 60FPS control over `requestAnimationFrame`, HiDPI canvas scaling, and zero garbage collection spikes during particle vector computations.
2. **Particle Physics Engine**:
   - Split into distinct pure modules: `Vector2D`, `Particle`, `Cluster`, `Starfield`, and `PhysicsEngine`.
   - Centroid-based gravitational attraction $F_{\text{grav}} = -k \cdot (\vec{p} - \vec{C})$ with velocity damping $\mu \approx 0.94$.
   - Mouse repulsion field: inverse quadratic / linear falloff radius ($R \approx 150\text{px}$) exerting outward impulse $\vec{F}_{\text{repulse}}$.
   - Dual particle types: Glowing pixel dots and rotating ASCII glyphs (`*`, `+`, `·`, `✧`, `✦`, `°`, `×`, `~`, `^`, `⌬`, `⠋`, `⠙`, `⠹`, `⠸`, `⠼`, `⠴`, `⠦`, `⠧`, `⠇`, `⠏`).
3. **Backend & Serving**:
   - FastAPI + Pydantic v2 + uv for dependency management.
   - API endpoints: `/api/health`, `/api/chat` (SSE streaming Bedrock/offline router), `/api/contact` (message submission).
   - In dev: Vite proxies `/api` to FastAPI on `:8000`. In prod: FastAPI serves Vite's built `dist/`.
4. **Chatbot Architecture**:
   - Terminal dock popup widget with expand/minimize/fullscreen controls and typing stream.
   - Client detects `window.ai` (Chrome Built-in Prompt API). If present and available, creates a local session. Otherwise, streams from `/api/chat`.
   - Slash command system (`/help`, `/projects`, `/skills`, `/experience`, `/contact`, `/clear`).

## Steps
1. **Project Scaffold**:
   - Setup `backend/` with `pyproject.toml`, FastAPI app, SSE chat router, Bedrock service, Pydantic schemas, and pytest suite.
   - Setup `frontend/` with `package.json`, `tsconfig.json`, `vite.config.ts`, HTML layout, and styles.
   - Create root `Makefile` orchestrating `make dev`, `make test`, `make lint`, `make build`.
2. **Particle & Starfield Engine**:
   - Implement math vectors, particle dynamics, cluster centroids, gravitational spring attraction, mouse hover scatter physics, and ASCII renderer.
   - Implement HiDPI auto-resizing, frame budgeting, visibility pausing.
3. **Terminal UI & Portfolio Content**:
   - Implement terminal shell, prompt navigation (`about`, `projects`, `skills`, `experience`, `contact`), command parser, and responsive layouts.
   - Wire in content from `plans/profile-content.md`.
4. **AI Assistant Integration**:
   - Implement `ChromeAiProvider` detecting `window.ai` / `ai.languageModel`.
   - Implement `BedrockApiProvider` streaming from `/api/chat`.
   - Build terminal chat UI with command history, streaming token typewriter, and slash commands.
5. **Quality Verification**:
   - Run backend tests (`pytest`), linting (`ruff`), and type checking (`mypy`).
   - Run frontend typecheck (`tsc`) and build (`vite build`).
   - Visual verification and responsiveness check.

## Verification
- Backend tests: `cd backend && uv run pytest` -> 100% pass.
- Backend lint & types: `cd backend && uv run ruff check . && uv run mypy .` -> 0 errors.
- Frontend build & types: `cd frontend && npm run build && npm run typecheck` -> 0 errors.
- End-to-end launch: `make dev` -> Server and Vite running cleanly on localhost.
