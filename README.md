# Capital Region Mesh — Site

The website for [Capital Region Mesh](https://capitalmesh.net), a community-driven LoRa mesh networking group in New Hampshire's Capital Region. Built with [Hugo](https://gohugo.io) and the [PaperMod](https://github.com/adityatelange/hugo-PaperMod) theme, deployed to GitHub Pages.

## Local Development

Hugo extended is required. Install it from the [Hugo releases page](https://github.com/gohugoio/hugo/releases) (v0.151.0+), then:

```bash
hugo server
```

The site will be available at `http://localhost:1313` with live reload.

## Adding Content

```bash
# New blog post
hugo new content blog/my-post-title.md

# New event post
hugo new content blog/events/2026/event-name.md
```

Posts are created from the archetype in `archetypes/default.md`. Set `draft = false` when ready to publish.

## Deployment

Pushing to `main` triggers a GitHub Actions workflow that builds with Hugo and deploys to GitHub Pages at [capitalmesh.net](https://capitalmesh.net).
