# letshang-create-event

A minimal, desktop-first Create Event flow with local previews for flyer and background images, plus config-driven optional modules.

## Tech stack
- Vite + React (JavaScript)
- Tailwind CSS (utility styling)
- PostCSS + Autoprefixer

## High-level architecture
- `CreateEventPage` holds primary state (event fields, flyer preview, background image, enabled modules) and composes the page layout.
- Config-driven modules: `src/mock/eventConfig.js` lists available modules; the UI reads this config to show “Quick Links” and to decide which modules to render.
- Dynamic rendering via `ModuleRenderer`, which maps module types to their respective components (capacity, gallery, links, privacy). Adding a new module only requires updating the config and adding a component.
- Local-only media previews: flyer and background images use `URL.createObjectURL` for instant feedback; nothing is uploaded or persisted.

## Key design decisions & tradeoffs
- **Local state over backend calls:** Everything stays client-side for speed; persistence intentionally omitted.
- **Config-driven modules:** Avoids hardcoding module lists and keeps extensibility straightforward.
- **Minimal styling:** Tailwind utilities for spacing, alignment, and readability; no heavy theming or animations to keep focus on structure.
- **Readability on backgrounds:** Optional dark overlay over custom backgrounds to preserve text contrast.

## Intentionally skipped (for now)
- Form validation and submission flows
- Accessibility hardening and comprehensive keyboard/focus states
- Persistence or API integration for event data or uploads
- Mobile-specific tuning (layout is desktop-first)
