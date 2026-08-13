---
name: crm-meeting-docs
disable-model-invocation: true
description: Generates Capital Region Mesh event announcements, meeting Minutes, and recap posts.
---

# CRM Meeting Docs

## Quick start

Tell me which workflow you need:
- **"new event"** — upcoming event announcement, on its own (needs: date + Community
  Assembly topic)
- **"new recap"** / **"meeting minutes"** / **"post-meeting"** — the combined post-meeting
  interview, which produces the internal Minutes, the public recap post, and (if the next
  Community Assembly topic is already decided) a draft of the next event announcement, all
  from one interview

## Workflow: new-event

**Collect inputs** (ask for any not provided):
- Event date — required
- Community Assembly topic and presenter name/description — required
- Any special Member's Council agenda items — optional
- Venue override — see Defaults table below

**Generate calendar files:**

Run `node .claude/skills/crm-meeting-docs/scripts/generate-event.js` with the event details.
Pass `--title "Capital Region Mesh [Month] [Year] Meetup"`, `--date YYYY-MM-DD`,
`--description` (a 1-2 sentence summary of the event), and any non-default
`--startTime` / `--endTime` / `--locationName` / `--locationAddress` (see Defaults
table below). Parse the JSON output for `icsFilename`, `icsContent`, and `googleCalUrl`.

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

## Workflow: post-meeting (Minutes + recap + next event)

One combined interview covers everything from a meeting that just happened. It produces up
to three artifacts: the internal Minutes (a PDF-ready HTML file, never published), the public
recap post, and — only if the next meeting's topic is already known — a draft of the next
event announcement.

**Before asking anything**, find and read the previous meeting's Minutes file: look in
`.claude/skills/crm-meeting-docs/.minutes/` for the most recent `YYYY-MM-DD.md` file dated
before this meeting. If one exists, read it and note:
- Any action items marked open — you'll ask about each one's status below.
- The running bookkeeping total from its "Running total" line — this is this meeting's
  starting `priorRunningTotal`.

If no prior file exists (first-ever run), treat both as empty — no carried-forward action
items, `priorRunningTotal` of 0. Don't ask the user to supply either; read them yourself.

**Interview the user one question at a time** — don't ask multiple questions in one message
— in the order the meeting actually happened:

1. What month/year and date is this for? (confirms file paths)
2. Who served as Facilitator, Note-Taker, and Time-Keeper this meeting?
3. Who attended? (names, for the Minutes attendee list)
4. Community Assembly — what was the topic, who presented, and what were the key points or
   moments that stood out? (feeds both the Minutes summary and the recap narrative)
5. Member's Council — what decisions were made, and what proposals or working group reports
   came up? For each decision with a follow-up, who owns it and what's the task?
6. For each action item carried forward from last meeting (if any): is it done, or still
   open?
7. Working Session — did it happen, and what was worked on or discussed?
8. Bookkeeping — any expenses since last meeting? For each: date, description, amount,
   category, and whether it was pre-approved via a proposal or is being presented for
   ratification now. Any contributions received?
9. Any anticipated expenses to flag? For each, is it tied to an already-passed proposal
   (get the proposal's title) or just an informal heads-up with no proposal yet?
10. Any notable quotes, highlights, or memorable moments from the evening? (recap only)
11. What's the next meeting's date?
12. Is next month's Community Assembly topic and presenter already decided? If yes, collect
    what's needed to draft the announcement (see Workflow: new-event's inputs above); if
    no, skip announcement generation for this session — the standalone `new-event` workflow
    remains available once it's decided.

**Generate the Minutes:**

Assemble the answers into a JSON object matching `generate-minutes.js`'s data shape (date,
facilitator/noteTaker/timeKeeper, attendees, communityAssembly, membersCouncil with
decisions/actionItems, workingSession, bookkeeping with priorRunningTotal/lineItems/
anticipated, nextMeetingDate). Write it to
`.claude/skills/crm-meeting-docs/.minutes/YYYY-MM-DD.data.json`, then run
`node .claude/skills/crm-meeting-docs/scripts/generate-minutes.js --data <that file>` and
write its stdout to `.claude/skills/crm-meeting-docs/.minutes/YYYY-MM-DD.html`.

Also write a human-readable `.claude/skills/crm-meeting-docs/.minutes/YYYY-MM-DD.md` covering
the same content in plain markdown (header with roles/attendees, decisions, action items
with status, bookkeeping line items and running total, next meeting date). This markdown
file — not the `.json` — is what next month's carry-forward step reads, so keep its action
items and running total legible as plain text.

Tell the user the HTML file's path and that opening it in a browser and using Print → Save
as PDF produces the document to email — the tool does not send it.

**Generate the recap post** at `content/blog/events/YYYY/[month-slug]-meetup-recap/index.md`
from the same answers:

- TOML frontmatter: `title "[Month] YYYY Meetup Recap"`, `date` (today),
  `tags`, `description`, `summary`, `draft = false`
- H2 opening with attendance context and overall tone
- Sections for each agenda segment that had content
- `## Looking Ahead` section linking to the next event post (if it exists)
- Newsletter signup HTML form — copy verbatim from any existing recap post
  (e.g. `content/blog/events/2026/may-meetup-recap/index.md`)

Reference existing recaps for tone: warm, narrative, community-first. The recap never
includes Bookkeeping or action-item detail — that stays in the Minutes.

**If next month's topic was decided** (question 12), follow Workflow: new-event's "Generate
calendar files" and "Create the post" steps using the collected details.

**Do not commit or push anything.** Once the files are written, tell the user what changed
and suggest they run `hugo server` to preview the recap (and next-event post, if generated)
locally before deciding to commit. These are public-facing posts and an internal governance
record — they should get a visual review, not go straight to git.

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
