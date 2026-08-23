# 009: Compact Floating Terminal Button & Bottom Galaxy Cluster Balance

## Status
`done`

## Goal
1. **Compact Floating `[ ⌨ OPEN_TERMINAL ]` Button**:
   - Restore the button below the Graph Legend in bottom-left (`left: 20px; bottom: 16px;`).
   - Give it a compact, proportional size (`width: auto; padding: 5px 12px; font-size: 0.75rem;`).
   - Automatically **hide** the button whenever the terminal window is open (`display: none` or `opacity: 0`), so it never overlaps the terminal window cards.
2. **Bottom Cluster & Galaxy Balance**:
   - Shift the Central Core Node slightly upward to `cy = height * 0.45`.
   - Position Cluster 05 (`05 // FORECASTING_&_ML`) at Bottom-Center (`x: cx, y: height * 0.82`), providing >180px of clear space between the central node callout and Cluster 05.
   - Symmetrically distribute the remaining 4 clusters:
     - Top-Left: `01 // AGENTIC_SYSTEMS` (`cx - Rx * 0.82, cy - Ry * 0.65`)
     - Top-Right: `02 // GRAPH_&_RETRIEVAL` (`cx + Rx * 0.82, cy - Ry * 0.65`)
     - Bottom-Left: `04 // CLOUD_&_PLATFORMS` (`cx - Rx * 0.78, cy + Ry * 0.70`)
     - Bottom-Right: `03 // EVALS_&_INFRA` (`cx + Rx * 0.78, cy + Ry * 0.70`)
   - Increase particle density per cluster (24 particles per cluster) with rich constellation filaments.

## Verification
- Run backend tests: `cd backend && uv run pytest`
- Run backend lint and typing: `cd backend && uv run ruff check . && uv run mypy .`
- Run frontend typecheck and build: `cd frontend && npm run build && npm run typecheck`
