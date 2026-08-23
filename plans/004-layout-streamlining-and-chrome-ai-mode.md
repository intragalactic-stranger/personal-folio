# 004: Layout Streamlining & Dual AI Engine Switcher

## Status
`done`

## Goal
Implement refinements based on visual screenshot review:
1. **Remove Top Bulky Widget Boxes**: Remove the 6 circular widget boxes above the terminal so the About page layout is clean, fully visible in the viewport, and matches the ideal layout shown in Screenshot 3.
2. **Side-by-Side Clean About Layout**: Ensure the About page displays the ASCII Banner, Metadata Grid, Bio text, and the two side-by-side cards (`🎓 ACADEMIC_CREDENTIALS` on left, `🏆 ACHIEVEMENTS & IMPACT` on right) with zero vertical clutter.
3. **Dual AI Engine Mode Switcher (Chrome Gemini Nano & Amazon Bedrock)**:
   - Provide an active engine selector toggle in the AI Assistant header: `[ ✨ CHROME GEMINI NANO ]` vs `[ ⚡ AMAZON BEDROCK ]`.
   - Comprehensive Chrome Prompt API detection across `window.ai.languageModel`, `ai.languageModel`, `(window as any).ai`, and graceful local Gemini simulation mode with setup instructions for Chrome flags.
   - Real-time token streaming in both modes.

## Verification
- Backend test suite: `cd backend && uv run pytest`
- Backend lint & typing: `cd backend && uv run ruff check . && uv run mypy .`
- Frontend typecheck & build: `cd frontend && npm run build && npm run typecheck`
