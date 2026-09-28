# 007: Precise Canvas Interactions, Button Layout & LLM Streaming Transparency

## Status
`done`

## Goal
Implement interaction precision and layout alignment:
1. **Mouse-Only Intentional Navigation into Terminal**:
   - Remove global `keydown` event listener that was triggering terminal open on random keypresses.
   - Remove random canvas background click triggers.
   - Only open the terminal when:
     - User explicitly clicks the **Central Profile Core Node** (`dist < 85px`),
     - User clicks the `[ ⌨ OPEN_TERMINAL ]` button,
     - User clicks any navigation tab in top bar (`ABOUT`, `PROJECTS`, `SKILLS`, `EXPERIENCE`, `CONTACT`).
   - Clicking elsewhere on canvas, dragging cursor, or clicking satellite nodes (for tooltips) keeps user in the Graph Universe without accidental terminal popping.
2. **Bottom-Left Unified Legend & Terminal Button Layout**:
   - Align the `[ ⌨ OPEN_TERMINAL ]` button in the bottom-left below the Legend overlay.
   - Keep the `[ ⬡ GRAPH_VIEW ]` button in the top navigation / window header intact.
3. **LLM Engine Transparency & Verification**:
   - Ensure backend Bedrock SSE stream is the default active engine in Safari/Firefox/Chrome without flags, with real network calls to `/api/chat`.

## Verification
- Backend tests: `cd backend && uv run pytest`
- Backend lint & typing: `cd backend && uv run ruff check . && uv run mypy .`
- Frontend typecheck & build: `cd frontend && npm run build && npm run typecheck`
