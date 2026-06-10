# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Hugo static site** for Capital Region Mesh, a community-driven LoRa/Meshtastic mesh networking group in New Hampshire's Capital Region. The site is deployed to GitHub Pages at `capitalmesh.net`.

## Commands

```bash
# Local development server (live reload)
hugo server

# Production build
hugo --gc --minify

# Create a new blog post
hugo new content blog/my-post-title.md

# Create a new event post
hugo new content blog/events/2026/event-name.md
```

Hugo version in CI: **0.151.0** (with Go 1.25.1 and Dart Sass 1.93.2).

## Architecture

- **`hugo.toml`** — Site config: baseURL, menu structure (weights control order), PaperMod theme settings, Goldmark renderer (raw HTML in markdown is enabled via `unsafe = true`)
- **`content/`** — All markdown content; top-level `.md` files are main nav pages, `blog/` holds posts and `blog/events/` holds dated meetup announcements and recaps
- **`static/`** — Unprocessed assets: `images/shared/` for reusable post images, `events/` for `.ics` calendar files, `favicons/`
- **`layouts/shortcodes/`** — Custom Hugo shortcodes (currently just `button.html`)
- **`archetypes/default.md`** — Template used by `hugo new content`; uses TOML frontmatter

Theme: **adityatelange/hugo-PaperMod** (via Hugo modules). Icons via **hugomods/icons/vendors/bootstrap**.

## Content Conventions

**Frontmatter** (TOML, as in archetypes):
```toml
+++
title = 'Post Title'
date = 2026-06-10T00:00:00-05:00
draft = false
tags = ["community", "newsletter"]
+++
```

**Available shortcodes:**
- `{{< ico bootstrap icon-name >}}` — Bootstrap icon by name
- `{{< qr text="..." />}}` — QR code from text
- `{{< figure src="..." caption="..." >}}` — Image with caption
- `{{< button text="Label" url="..." >}}` — Styled CTA button

**Tag taxonomy:** Tags live at `/blog/tags/:slug/`. Common tags: `newsletter`, `mission`, `community`, `emcomm`, `bridge-nodes`, `hardware`.

**HTML in markdown** is allowed and used for flex layouts (app store buttons, CTA rows). Event posts typically link a corresponding `.ics` file from `/static/events/`.

## Git

Use [Conventional Commits](https://www.conventionalcommits.org/) for all commit messages (e.g. `feat:`, `fix:`, `chore:`, `docs:`).

## Deployment

Push to `main` triggers the GitHub Actions workflow (`.github/workflows/hugo.yaml`), which builds with Hugo and deploys to GitHub Pages. The workflow also writes `CNAME` records for `capitalmesh.net` and `mumble.capitalmesh.net`.
