# Repo Notes

This repository is a plain static site. There is no build step, package manager, or framework.

## Files That Matter

- `index.html`: page structure, SEO, OGP, canonical URL
- `style.css`: all styling and responsive rules
- `app.js`: spot data, route generation, filters, share/copy behavior
- `toyohashi_stamp_route_app_spec.md`: product intent and requirements
- `KNOWLEDGE_v1.1.md`: background notes to preserve context

## Editing Rules

- Keep the app framework-free unless the user explicitly asks for tooling.
- Preserve the existing Japanese tone and simple one-page UX.
- Avoid unnecessary renames of core files.
- Keep indentation at 2 spaces across HTML, CSS, JS, and Markdown.

## When Changing Behavior

- If spot data changes, update the `spots` array in `app.js`.
- If default start/end should change, update both `renderSelects()` and `resetSelections()` in `app.js`.
- If two entries represent the same physical location, update `sameLocationPairs` in `app.js`.
- If deployment URL changes, update `canonical` and `og:url` in `index.html`.
- If share wording changes, update `buildShareUrl()` in `app.js`.
- If product behavior changes materially, sync the relevant notes in `toyohashi_stamp_route_app_spec.md` or `KNOWLEDGE_v1.1.md`.

## Validation

- Run a static server such as `python3 -m http.server 8080` from the repo root.
- Manually verify route generation, mode switching, URL copy, and share button behavior.
