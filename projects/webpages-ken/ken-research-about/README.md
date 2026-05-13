# ken-research-about

> Static HTML About-Us page mock for Ken Research. Vanilla HTML/CSS/JS with GSAP scroll animations.

## Stack
- Vanilla HTML5 + CSS3 + ES6 JS
- GSAP 3 (CDN)
- WebGL canvas overlay (custom)

## Prerequisites
- Modern browser (Chrome/Safari/Firefox latest)
- Optional: Python 3 for local server

## Quick start
```bash
# Direct (limited — module behavior may differ):
open index.html

# Local server (recommended):
python3 -m http.server 8080
# → http://localhost:8080
```

## Project layout
```
.
├── index.html          # page structure + content
├── style.css           # all styles
├── main.js             # GSAP animations + interactivity
├── ankur.png           # team photo
├── avdhesh.png         # team photo
├── namit.png           # team photo
└── FOLDER_CONTEXT.md   # design-team note
```

## Brand tokens
Hard-coded in `style.css`. Workspace canonical tokens at `../../Quick_start_guide.md` — not consumed here. Tech to swap to CSS vars during prod migration.

## Handover
See `HANDOVER.md` for tech-team integration notes.
See `STATUS.md` for current handover state.

## License
Private — internal Ken Research design project.
