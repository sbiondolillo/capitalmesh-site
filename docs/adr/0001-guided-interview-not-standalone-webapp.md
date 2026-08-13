# Guided AI interview over a standalone web app for meeting minutes

The Secretary needs a tool to turn a monthly meeting into Minutes, a Recap post, and (sometimes)
the next event announcement. The original framing was "a simple web interface," which implies a
standalone app: its own hosting, its own LLM API calls to turn notes into prose, and auth for a
single named user. We instead extended the existing `crm-meeting-docs` Claude Code skill so the
Secretary runs the same guided interview she already uses for recaps, just covering more ground
in one pass.

CRM is a two-person-maintained volunteer project with no infrastructure budget or on-call. A
standalone app would add hosting, billing, and auth surface that neither maintainer has taken on
before, for a tool used once a month. The guided-interview approach reuses infrastructure that
already exists (Claude Code, the `crm-meeting-docs` skill, this repo) and needs zero new services.

If usage or maintainer capacity changes and a browser-only tool becomes worth the overhead,
this is reversible — but it is a real rebuild, not a config flip, so the alternative is recorded here
rather than left to be silently re-litigated in code review.
