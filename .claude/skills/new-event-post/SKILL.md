---
name: new-event-post
description: Creates upcoming event announcement posts and recap posts for Capital Region
  Mesh monthly meetups, including iCalendar (.ics) file generation and Google Calendar
  links. Use when creating a new CRM event announcement, writing a meetup recap, or when
  the user says "new event", "new recap", or "write the [month] meetup post".
---

# New Event Post

## Quick start

Tell me which workflow you need:
- **"new event"** — upcoming event announcement (needs: date + Community Assembly topic)
- **"new recap"** — post-meeting recap (needs: notes from the meeting)

## Workflow: new-event

**Collect inputs** (ask for any not provided):
- Event date — required
- Community Assembly topic and presenter name/description — required
- Any special Member's Council agenda items — optional
- Venue override — default: Kent/Thomas Room at UU Church, 274 Pleasant St, Concord NH

**Generate calendar files:**

Run `node .claude/skills/new-event-post/scripts/generate-event.js` with the event details.
Pass `--title "Capital Region Mesh [Month] [Year] Meetup"`, `--date YYYY-MM-DD`,
`--description` (a 1-2 sentence summary of the event), and any non-default
`--locationName` / `--locationAddress`. Parse the JSON output for `icsFilename`,
`icsContent`, and `googleCalUrl`.

Write `icsContent` to `static/events/<icsFilename>`.

**Create the post** at `content/blog/events/YYYY/[month-slug]-meetup/index.md`:

- TOML frontmatter: `title`, `date` (today — the announcement date, not the event date),
  `tags` (include `events`), `description`, `summary`, `draft = false`
- H1 title with a relevant emoji (🛰️ 🌐 📡 etc.)
- Date/time/location block: `📅 Weekday, Month D, YYYY` / `🕖 7:00–10:00 PM` / `📍 Venue`
  with Google Maps link
- `---` separator
- `## ✨ What to Expect` — link to the previous month's recap, then describe the evening
  using the standard agenda from `.claude/event-agenda.md`
- Concrete `### Agenda` with time-stamped bullet list derived from `.claude/event-agenda.md`
- `## [Community Assembly Topic]` section — describe the presentation/topic in 2-3 paragraphs
- `## 🤝 Members' Council` section — describe any known agenda items; otherwise use the
  standard description (working group reports, proposals, open floor)
- `## 🛠️ Working Group Breakout & Social Time` section
- `## 🧭 RSVP + Directions` with `{{< figure src="/images/shared/Kent-Thomas-Room.jpg" ... >}}`
  and RSVP instructions (email events@capitalmesh.net, enter East entrance)
- `## 📅 Add to Your Calendar` — link to `/events/<icsFilename>` and the Google Calendar URL
- Closing quote block

Reference `content/blog/events/2026/june-meetup/index.md` for tone and structure.

## Workflow: new-recap

Interview the user one question at a time — don't ask multiple questions in one message:

1. What month/year is this recap for? (to confirm the post path)
2. How many people attended?
3. What was the Community Assembly topic and who presented? What were the key points or
   moments that stood out?
4. What came up in the Member's Council? Any decisions, proposals, or working group reports?
5. Did the Working Session happen? What was worked on or discussed?
6. Any notable quotes, highlights, or memorable moments from the evening?
7. What's coming up next? Any link to the next event post?

After all questions are answered, synthesize into a recap post at
`content/blog/events/YYYY/[month-slug]-meetup-recap/index.md`:

- TOML frontmatter: `title "[Month] YYYY Meetup Recap"`, `date` (today),
  `tags`, `description`, `summary`, `draft = false`
- H2 opening with attendance context and overall tone
- Sections for each agenda segment that had content
- `## Looking Ahead` section linking to the next event post (if it exists)
- Newsletter signup HTML form — copy verbatim from any existing recap post
  (e.g. `content/blog/events/2026/may-meetup-recap/index.md`)

Reference existing recaps for tone: warm, narrative, community-first.

## Defaults

| Field            | Default                                        |
|------------------|------------------------------------------------|
| Start time       | 7:00 PM                                        |
| End time         | 10:00 PM                                       |
| Venue name       | Kent/Thomas Room at UU Church                  |
| Venue address    | 274 Pleasant St, Concord, NH 03301             |
| Venue photo      | `/images/shared/Kent-Thomas-Room.jpg`          |
| Maps link        | https://maps.app.goo.gl/1dg2gf1RueUyXagJ7     |
| RSVP email       | events@capitalmesh.net                         |
| Entrance         | East entrance, first room on the right         |
