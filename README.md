# Ganeshan Arumuganainar — Personal Folio

> Terminal-aesthetic interactive portfolio, 60FPS canvas gravitational particle physics engine, and dual-engine AI assistant (Chrome Built-in Gemini Nano + Amazon Bedrock streaming).

---

## Architecture & Stack

| Layer | Choice | Why |
|---|---|---|
| **Frontend** | Vite + Vanilla TypeScript, HTML5 Canvas 2D | Direct `requestAnimationFrame` control for high-performance gravitational physics, zero abstraction tax, and HiDPI Retina support. |
| **Backend** | FastAPI + Python 3.12+, managed with **uv** | Pydantic v2 schemas, Server-Sent Events (SSE) streaming, and Amazon Bedrock (`boto3`) integration. |
| **AI Assistant** | Hybrid Chrome Prompt API (`window.ai`) + Bedrock fallback | Zero-latency on-device token streaming in Chrome, with cloud Bedrock SSE streaming fallback. |
| **Serving** | Vite dev server proxies `/api` to FastAPI in dev; FastAPI serves built `frontend/dist` in production. | Single origin architecture. |

---

## Quickstart

### Prerequisites
- Node.js (v18+) & npm
- Python (3.11+) & [uv](https://docs.astral.sh/uv/)

### Development

```bash
# Run both backend (FastAPI) and frontend (Vite) concurrently
make dev
```

The application will be accessible at:
- **Frontend / Full UI**: `http://localhost:5173`
- **FastAPI Backend & Swagger**: `http://localhost:8000/docs`
- **Health Check**: `http://localhost:8000/api/health`

### Automated Verification

```bash
# Run backend pytest suite & frontend typecheck
make test

# Run backend ruff linter & mypy static type analysis
make lint

# Build frontend production bundle
make build
```

### GitHub Pages Deployment (Frontend Only)

This repository includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml` that deploys the static Vite frontend to GitHub Pages.

Repository settings required:

1. Open **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the Actions tab).
4. If you see `pages build and deployment` / Jekyll failures referencing `./docs`, Pages is still using legacy branch-source mode. Keep Source on **GitHub Actions** so `.github/workflows/deploy-pages.yml` is used instead.

Important limitation:

- GitHub Pages hosts static files only. It does **not** run the FastAPI backend.
- Frontend requests to `/api/*` require an externally hosted backend (for example on a separate service) if you want Bedrock/chat/contact backend features in production.

---

## Project Structure

```
personal-folio/
├── .agents/skills/               # Specialized AI agent skills
│   ├── ui-ux-pro/
│   ├── particle-physics-canvas/
│   └── chrome-ai-assistant/
├── plans/                        # Sequential planning and verified profile specs
│   ├── profile-content.md
│   ├── 001-terminal-physics-portfolio-and-ai-chat.md
│   ├── 002-visual-enhancements-mascot-and-cv.md
│   ├── 003-central-graph-landing-and-metrics.md
│   └── 004-layout-streamlining-and-chrome-ai-mode.md
├── backend/                      # FastAPI Python backend
│   ├── app/
│   │   ├── api/                  # Endpoints: /api/health, /api/chat, /api/contact
│   │   ├── schemas/              # Pydantic models
│   │   └── services/             # Bedrock streaming & persona grounding
│   ├── tests/                    # Pytest test suite
│   └── pyproject.toml
├── frontend/                     # Vite + Vanilla TypeScript
│   ├── src/
│   │   ├── physics/              # 60FPS Canvas gravitational physics engine
│   │   ├── render/               # ASCII glyphs & constellation renderers
│   │   ├── chat/                 # Hybrid Chrome Gemini / Bedrock AI controller
│   │   ├── ui/                   # Monospace terminal window & command registry
│   │   └── data/                 # Grounded profile content & projects
│   └── index.html
├── Makefile                      # Build and dev orchestration
├── opencode.json                 # Agent & MCP configuration
└── README.md
```

---

## License

MIT © [Ganeshan Arumuganainar](https://ganeshan.dev)
