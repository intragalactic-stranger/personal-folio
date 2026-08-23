---
name: chrome-ai-assistant
description: >-
  Integration patterns for hybrid in-browser AI assistants supporting Chrome Built-in Prompt API
  (window.ai / ai.languageModel) with graceful fallback to backend Amazon Bedrock streaming LLM endpoints.
---

# Hybrid Terminal AI Assistant Architecture

## 1. Provider Resolution Flow
1. **Tier 1: Chrome Built-in Prompt API**
   - Check if `window.ai?.languageModel` or `window.model?.createSession` or Chrome 128+ `ai.languageModel` is available and ready (`capabilities().available === "readily"`).
   - If available, instantiate local session with terminal system prompt persona for instant zero-latency responses.
2. **Tier 2: Backend Streaming API (FastAPI + AWS Bedrock)**
   - If local model is unavailable or encounters quota/device limits, automatically route requests to `/api/chat`.
   - Backend calls Amazon Bedrock Runtime (`boto3`) with streaming SSE response (`anthropic.claude-3-5-sonnet` / `amazon.nova-pro` / `amazon.nova-lite`).
   - Mock / offline fallback: If AWS credentials are not configured, graceful simulated terminal streaming AI responses ensure development and showcase sites remain 100% functional.

## 2. Terminal Chat UI & Experience
- Dockable terminal overlay widget (`>_ AI TERMINAL`) with minimize, maximize, and popout toggle.
- Fast token streaming with typewriter effect and glowing block cursor.
- Quick slash commands:
  - `/help`: List interactive terminal commands
  - `/projects`: Display interactive project portfolio cards
  - `/skills`: Display AI Software Engineering tech stack & architecture badges
  - `/experience`: Display timeline of career and achievements
  - `/contact`: Open interactive terminal contact form or trigger email dispatch
  - `/clear`: Clear terminal buffer
