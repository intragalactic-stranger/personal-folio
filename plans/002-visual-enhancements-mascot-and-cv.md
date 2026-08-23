# 002: Visual Enhancements, Technology Clusters, Terminal Mascot & CV Download

## Status
`done`

## Goal
Implement UI/UX refinements based on user feedback:
1. **ASCII Banner & Subtitle Spacing**: Add proper margin and line-height between the ASCII name banner and the subtitle tag.
2. **Experience Progress & Metric Bars**: Add green-accented animated progress bars and telemetry metrics to work experience.
3. **Knowledge Graph Clusters with Named Tech Particles**: Replace generic cluster characters with real profile technologies (`LangGraph`, `FastAPI`, `Neo4j`, `Bedrock`, `Celery`, `Kubernetes`, `RAGAS`, `TFT`, `PyTorch`, `Claude`, `Gemini`, `LiteLLM`).
4. **Canvas Visibility / Zen Mode**: Add a toggleable `[👁 PEEK_CANVAS]` / `[⛶ ZEN_MODE]` control so users can hide the terminal window to explore the gravitational physics across the full screen.
5. **Interactive Skills Visualizations & Animations**: Add animated monospace proficiency meters (`[████████████░░] 92%`), category radar tags, and glowing skill bars.
6. **Top Experience Telemetry Bar**: Add top stat widgets (`07 PROD SYSTEMS`, `~25K/day EVALS`, `18mo PROMOTED`, `40K req/day`).
7. **Download CV Button**: Prominent styled download button in top nav and About/Contact sections.
8. **Mascot & Icon**: Update AI Assistant icon to `>_<` and add a cute interactive Claude Code-style ASCII doodle pet companion (`[ ⬡ ◕‿◕ ⬡ ]` / `(づ｡◕‿‿◕｡)づ`).

## Verification
- Backend tests: `cd backend && uv run pytest`
- Backend lint & types: `cd backend && uv run ruff check . && uv run mypy .`
- Frontend build & types: `cd frontend && npm run build && npm run typecheck`
