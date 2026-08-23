# 006: Fix Graph View Overlaps, Single-Line Skills Radials & Remove Scroll Hint

## Status
`done`

## Goal
Address user feedback:
1. **Remove Scroll Hint**: Remove `▼ [ SCROLL TO EXPLORE ARSENAL & SYSTEMS ]` from About section.
2. **Single-Line Skills Radial Rings**: Remove `Celery Eval` widget from radial rings and layout the remaining 7 rings in a single horizontal row across the container.
3. **Fix Graph Universe Overlaps & Positioning**:
   - Move floating `[ ⌨ OPEN_TERMINAL ]` button to bottom-center / bottom-right so it never collides with the bottom-left Legend overlay.
   - Adjust Cluster 05 (`Forecasting & ML`) base position so it has ample bottom clearance.
   - Dynamically compute cluster hover box width (auto-sized to text + padding) so text never overflows.
   - Smart vertical positioning for cluster hover cards: if cluster is in lower half of screen, display the hover card above the cluster so it is never pushed offscreen. Clamp all tooltip coordinates inside viewport boundaries.

## Verification
- Run backend tests: `cd backend && uv run pytest`
- Run backend lint and typing: `cd backend && uv run ruff check . && uv run mypy .`
- Run frontend typecheck and build: `cd frontend && npm run build && npm run typecheck`
