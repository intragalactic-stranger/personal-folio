## Goal

Deploy the existing Vite frontend of this repository to GitHub Pages via GitHub Actions without changing the documented Vite + vanilla TypeScript + FastAPI stack.

## Context

- The repository is a Vite frontend (`frontend/`) with a FastAPI backend (`backend/`).
- GitHub Pages can host only static artifacts, so only the frontend build output can be deployed there.
- The frontend currently builds to `frontend/dist` and has no existing GitHub Actions workflow for Pages.
- Repository planning discipline requires status tracking and verified command outcomes before marking work done.

## Decisions

1. Add a dedicated Pages workflow that builds only the frontend and deploys the uploaded static artifact.
   - Rationale: This matches GitHub Pages hosting capabilities and avoids implying backend runtime hosting on Pages.
2. Add Vite base-path handling for GitHub Pages project-site deployment (repository subpath).
   - Rationale: Asset URLs must resolve under `/<repo>/` for project Pages deployments.
3. Update README with explicit Pages setup and backend limitation notes.
   - Rationale: Prevents confusion that FastAPI endpoints are hosted by GitHub Pages and documents required repo settings.

## Steps

1. Create workflow file under `.github/workflows/` for Pages deploy (permissions, concurrency, artifact upload, deploy job).
2. Update `frontend/vite.config.ts` to derive correct build `base` for GitHub Pages project subpath.
3. Update README with deployment instructions and static-hosting limitation for `/api` endpoints.
4. Run verification commands and record results.
5. Update this plan status through `draft` → `in-progress` → `done` only after successful verification evidence.

## Verification

Run these commands from repository root and confirm expected outcomes:

1. `cd frontend && npm ci`
   - Expected: dependencies install successfully.
2. `cd frontend && npm run typecheck`
   - Expected: TypeScript no-emit typecheck passes.
3. `cd frontend && npm run build`
   - Expected: Vite production build succeeds and outputs `frontend/dist`.
4. `cd backend && uv sync`
   - Expected: backend dependencies resolve/install successfully.
5. `cd backend && uv run pytest`
   - Expected: backend test suite passes.
6. `cd backend && uv run ruff check .`
   - Expected: no lint errors.
7. `cd backend && uv run mypy .`
   - Expected: no type errors.

## Status

draft
