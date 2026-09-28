# 008: Harmonious Node Distribution, Label Spacing & Top-Nav View Toggle

## Status
`done`

## Goal
Address user feedback from screenshots:
1. **Harmonious 5-Cluster Orbital Distribution**:
   - Eliminate central collision below the central node.
   - Position the 5 clusters in a balanced elliptical orbit around the central core:
     - Cluster 01 (Agentic Systems): Top-Left (`cx - Rx * 0.82`, `cy - Ry * 0.65`)
     - Cluster 02 (Graph & Retrieval): Top-Right (`cx + Rx * 0.82`, `cy - Ry * 0.65`)
     - Cluster 03 (Evals & Infra): Bottom-Right (`cx + Rx * 0.85`, `cy + Ry * 0.70`)
     - Cluster 04 (Cloud & Platforms): Bottom-Left (`cx - Rx * 0.85`, `cy + Ry * 0.70`)
     - Cluster 05 (Forecasting & ML): Top-Center (`cx`, `cy - Ry * 0.98`)
   - Expand cluster dispersion radius from 75px to 95–105px with increased separation forces so label nodes never overlap each other within a cluster.
2. **Remove Big Floating Overlap Button & Move to Top-Nav**:
   - Remove the bottom-left floating button (`#float-graph-view-btn`) that was overlapping the terminal window content.
   - Add a sleek `[ ⬡ GRAPH_VIEW ]` / `[ ⌨ TERMINAL ]` view mode toggle button directly in the **Top Navigation Bar** (next to `[01 // ABOUT]` ... `[05 // CONTACT]`), plus keep the header toggle inside the terminal window.
3. **Compact Sleek Bottom-Left Legend**:
   - Streamline the canvas Legend to a sleek 28px collapsed / 140px expanded badge in the bottom-left corner with zero DOM element conflicts.

## Verification
- Backend tests: `cd backend && uv run pytest`
- Backend lint & typing: `cd backend && uv run ruff check . && uv run mypy .`
- Frontend typecheck & build: `cd frontend && npm run build && npm run typecheck`
