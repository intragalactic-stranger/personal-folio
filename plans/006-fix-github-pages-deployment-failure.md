## Goal

Fix the current GitHub Pages deployment failure and ensure the existing Vite frontend can be deployed from this working branch via GitHub Actions.

## Context

- Recent failed run is `pages build and deployment` (`dynamic/pages/pages-build-deployment`) using Jekyll and `source: ./docs`.
- Failure log shows Jekyll error because `/github/workspace/docs` does not exist.
- Repository stack is Vite frontend + FastAPI backend; Pages must host static frontend artifact only.
- Existing repository workflow `.github/workflows/deploy-pages.yml` deploys `frontend/dist` with Pages actions.

## Decisions

1. Keep deployment on GitHub Actions artifact flow rather than branch-source/Jekyll flow.
   - Rationale: The project is Vite-based and does not have a Jekyll `docs/` site.
2. Expand workflow push triggers to include the active deployment branch.
   - Rationale: Allows immediate deployment from the branch containing the fix without waiting for merge.
3. Update README with explicit remediation for the Jekyll `pages-build-deployment` failure mode.
   - Rationale: Prevents repeated misconfiguration by ensuring Pages source is set to GitHub Actions.

## Steps

1. Add this plan and set initial status to `draft`.
2. Update `.github/workflows/deploy-pages.yml` to include the current branch in push triggers.
3. Update README deployment section with explicit note about disabling legacy branch-source/Jekyll mode.
4. Run verification commands for frontend build/typecheck and validate backend checks where feasible.
5. Record verification outcomes and mark status `done` only after successful evidence.

## Verification

Run these commands from repository root and confirm expected outcomes:

1. `cd frontend && npm ci`
   - Expected: dependencies install successfully.
2. `cd frontend && npm run typecheck`
   - Expected: TypeScript typecheck passes.
3. `cd frontend && npm run build`
   - Expected: build succeeds and outputs `frontend/dist`.
4. `cd backend && python -m uv sync --extra dev`
   - Expected: backend and dev tooling install.
5. `cd backend && python -m uv run pytest`
   - Expected: tests pass.
6. `cd backend && python -m uv run ruff check .`
   - Expected: no lint errors.
7. `cd backend && python -m uv run mypy .`
   - Expected: no type errors.

Verification run results in this session:

- `cd frontend && npm ci` ✅
- `cd frontend && npm run typecheck` ✅
- `cd frontend && npm run build` ✅
- `cd backend && python -m uv sync --extra dev` ✅
- `cd backend && python -m uv run pytest` ✅ (5 passed)
- `cd backend && python -m uv run ruff check .` ✅
- `cd backend && python -m uv run mypy .` ✅
- `cd backend && python -m uv run python - <<'PY' ...` (YAML parse check for `.github/workflows/deploy-pages.yml`) ✅

## Status

done
