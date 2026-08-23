.PHONY: all dev build test lint backend-sync frontend-install

all: dev

dev:
	@echo "Starting backend (FastAPI) and frontend (Vite)..."
	@trap 'kill 0' EXIT; \
	(cd backend && uv run uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload) & \
	(cd frontend && npm run dev) & \
	wait

backend-sync:
	cd backend && uv sync

frontend-install:
	cd frontend && npm install

build:
	cd frontend && npm run build

test:
	cd backend && uv run pytest -v
	cd frontend && npm run typecheck

lint:
	cd backend && uv run ruff check . && uv run mypy .
