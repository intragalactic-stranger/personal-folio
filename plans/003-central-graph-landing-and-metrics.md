# 003: Central Graph Landing Page, Tangible Circular Metrics & UI Polish

## Status
`done`

## Goal
Implement major UX architecture upgrade and visual polish:
1. **Interactive Knowledge Graph Landing Page by Default**:
   - On initial load, the site opens directly to the full interactive canvas universe.
   - At the screen center, render the **Central Operator Node** (`GANESHAN ARUMUGANAINAR // AI CORE NODE`) with constellation links radiating outward to the 5 satellite technology clusters.
   - Hovering, dragging, and interacting with the central node and satellite clusters provides immediate direct-canvas feedback.
   - Clicking the center node, pressing Enter/Space, or selecting any navigation tab (`ABOUT`, `PROJECTS`, `SKILLS`, `EXPERIENCE`, `CONTACT`) smoothly transitions open the Terminal Shell overlay.
   - Toggle button in navigation `[⬡ GRAPH_VIEW]` allows returning to the full canvas anytime.
2. **Fix Particle Badges (Eliminate 'undefined' labels)**:
   - Fix label indexing so only valid technology strings are rendered as badges; remaining particles render as crisp ASCII glyphs or glowing dots.
3. **Remove Pet Doodle**:
   - Completely remove the pet mascot.
4. **Remove Download CV from About Page**:
   - Keep CV download strictly in the top navigation bar.
5. **Tangible Circular Metrics Widgets**:
   - Replace the generic text strip with sleek SVG circular gauge meters displaying verified production metrics:
     - `25K/d` (Asynchronous Agent Evals)
     - `40K/d` (K8s Traffic Capacity)
     - `-38%` (LLM Spend Reduction)
     - `1.2M` (Neo4j Graph Nodes)
     - `13%` (WAPE Demand Forecast)
     - `07` (Delivered Systems)
6. **Chrome Built-in LLM Detection & Tooltip**:
   - Enhance Chrome Prompt API detection across `window.ai.languageModel`, `(window as any).ai`, and provide clear engine indication.

## Verification
- Run backend tests: `cd backend && uv run pytest`
- Run backend lint and typing: `cd backend && uv run ruff check . && uv run mypy .`
- Run frontend typecheck and build: `cd frontend && npm run build && npm run typecheck`
