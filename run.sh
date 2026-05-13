#!/bin/bash
set -euo pipefail

# Ken Research Workspace — Runner Script
# Usage: ./run.sh [frontend|backend|design|dashboard|tokens]

ROOT="$(cd "$(dirname "$0")" && pwd)"

case "${1:-}" in
  frontend)
    echo "❌ No active frontend consumer surface. Last (ken-v2) deleted 2026-05-05."
    echo "   Build a new one via /page <recipe-name> after picking target path."
    exit 1
    ;;
  backend)
    echo "🐍 Starting Django Backend..."
    cd "$ROOT/projects/ken-research-backend"
    if [ ! -f venv/bin/activate ]; then
      echo "❌ venv not found at projects/ken-research-backend/venv. Create it with: python3 -m venv venv && pip install -r requirements.txt"
      exit 1
    fi
    source venv/bin/activate
    python manage.py runserver
    ;;
  design)
    echo "🎨 Starting Design System Core..."
    cd "$ROOT/design-system/core"
    pnpm dev
    ;;
  dashboard)
    echo "📊 Starting Design System Dashboard..."
    cd "$ROOT/design-system/dashboard"
    pnpm dev
    ;;
  tokens)
    echo "🎯 Building design tokens (Style Dictionary)..."
    cd "$ROOT/design-system/tokens"
    pnpm build
    ;;
  *)
    echo "Usage: ./run.sh [frontend|backend|design|dashboard|tokens]"
    echo ""
    echo "  frontend   (no active project — placeholder)"
    echo "  backend    Django backend (port 8000)"
    echo "  design     DS Core Vite (port 5173)"
    echo "  dashboard  DS Dashboard Vite (port 5174)"
    echo "  tokens     Build all token outputs from tokens.json"
    exit 1
    ;;
esac
