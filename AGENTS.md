# personal-folio

Personal portfolio / landing site for **Ganeshan Arumuganainar** — AI Software Engineer.
Terminal-aesthetic design: near-black background, twinkling starfield of ASCII glyphs,
gravity-bound particle clusters that scatter under the cursor and reunite on exit.

## Stack (decided — do not change without updating plans/)

| Layer    | Choice                                   | Why |
| -------- | ---------------------------------------- | --- |
| Frontend | Vite + vanilla TypeScript, no framework  | Direct canvas/rAF control for particle physics; zero abstraction tax |
| Backend  | FastAPI + Python, managed with **uv**    | Contact/API endpoints; uv for env + lockfile |
| Serving  | Vite dev server proxies `/api` to FastAPI in dev; FastAPI serves built `dist/` in prod | Single origin |

## Commands

```bash
# backend
cd backend && uv sync          # install deps
uv run pytest                  # tests
uv run ruff check .            # lint
uv run mypy .                  # types

# frontend
cd frontend && npm ci          # install deps
npm run build && npm run typecheck

# from repo root
make dev                       # runs both (see Makefile)
```

## Planning discipline (REQUIRED)

Every non-trivial task gets a plan doc in `plans/` **before** implementation:

- Filename: `NNN-kebab-title.md`, numbered sequentially.
- Required sections: `Goal`, `Context`, `Decisions` (with rationale), `Steps`,
  `Verification` (exact commands + expected outcomes), `Status`.
- Status field is updated as work progresses (`draft → in-progress → done`),
  and may only be set to `done` after the Verification commands actually ran
  and passed in this session. Never claim done without evidence.
- Profile content (bio, projects, links) lives in `plans/profile-content.md`
  once provided; until then use clearly-marked placeholder copy.

## Verification habit (REQUIRED)

Before declaring any task complete:

1. Run lint + typecheck + tests listed above.
2. For anything visual: screenshot via Playwright MCP at desktop + mobile
   viewport widths, confirm no console errors.
3. Report what was run and the outcome.

## Code style

- TypeScript: strict mode, no unused vars, prefer small pure modules
  (physics math separate from rendering).
- Python: ruff + mypy strict, pydantic models for all API schemas,
  docstrings on public functions only.
- No comments unless they explain *why*; no TODOs without a plan reference.
