---
name: frontend-polish
description: Product-grade frontend and UX workflow for polished UI, screenshots, thumbnails, document viewers/editors, responsive behavior, visual hierarchy, and existing design-system alignment.
compatibility: opencode
---

## Use When

- Working on UI/UX, screenshots, document viewers/editors, thumbnails, outputs, dashboards, uploads, file management, landing pages, dark mode, or product polish.
- The user says `nice`, `beautiful`, `polished`, `premium`, `clunky`, `AI slop`, `Notion-grade`, `Google Docs level`, `thumbnail`, or provides screenshots.

## Standards

- Preserve the existing visual language unless explicitly asked to redesign.
- Build polished product experiences, not generic layouts.
- Avoid interchangeable cards, weak spacing, naive color palettes, broken dark mode, and visually noisy UI.
- Check desktop/mobile/responsive states for visible changes.
- Verify visually with screenshots/browser/manual checks when feasible.
- Prefer one coherent rendering/editing/preview pipeline over parallel systems.
- Reuse existing viewers, renderers, editors, preview endpoints, thumbnail paths, and shared components before adding new paths.

## Documents, Outputs, Thumbnails

- Keep source formats stable unless a deliberate migration is requested.
- Markdown viewer and editor should not drift in block support, layout, theme, or saved output.
- Thumbnails should be semantic and useful: document title/content preview, slide cover/front page, image preview, or type-specific visual treatment over generic file cards.
- Uploads should show file names, per-file progress, immediate list/grid updates, drag/drop affordances, and clear failure reasons.

## Workflow

1. Inspect current UI/design system/screenshots.
2. Identify visual, interaction, state, and code-path problems.
3. Plan a targeted polish pass.
4. Implement using existing product patterns and shared components.
5. Verify real interactions, screenshots, theme behavior, loading/error/empty states, and responsiveness.

## Never Do

- Do not rebuild the frontend from scratch before studying existing design language.
- Do not add a second renderer/editor/preview path when the source-of-truth pipeline can be improved.
- Do not claim visual quality from code inspection alone.
