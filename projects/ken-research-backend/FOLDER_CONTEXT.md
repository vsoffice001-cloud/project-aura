# Ken Research Backend — Django API

**What**: Professional Django REST Framework (DRF) backend for Ken Research projects.
**Why**: Handles complex server-side logic, database management, and AI integrations (Python-native).
**Stack**: Python 3.x, Django 4.2+, Django REST Framework, django-cors-headers, SQLite (dev)
**Structure**:
- `core/` — Project settings and URL configurations.
- `api/` — Main API application containing views, serializers, and models.
- `venv/` — Python virtual environment (isolated dependencies).

**How to run**:
1. `source venv/bin/activate`
2. `python manage.py runserver 8000`

**Current Status**: Initialized with a health check endpoint at `/api/health/`.
**Skills to use**: `mcp-builder` (if building tools), pure Python/Django reasoning.
