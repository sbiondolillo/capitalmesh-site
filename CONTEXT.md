# Capital Region Mesh Site

Hugo static site and content-generation tooling for Capital Region Mesh (CRM). Meeting-structure
vocabulary (Community Assembly, Member's Council, Working Session, Closing Circle) is defined in
`.claude/event-agenda.md`, not repeated here.

## Language

**Minutes**:
The internal, structured record of a monthly meeting — decisions, action items, and bookkeeping
— maintained by the Secretary and circulated to Members and Stewards only. Produced as a PDF,
never published to the public site.
_Avoid_: Notes, meeting notes (the charter uses these interchangeably, but this repo's tooling
treats "Minutes" as the canonical name for the structured artifact).

**Recap**:
The public, narrative blog post summarizing a meeting for the wider community. Published under
`content/blog/events/`. Distinct from Minutes — same underlying meeting, different audience and
form.
_Avoid_: Summary, writeup.

**Action Item**:
A task recorded in a meeting's Minutes with an owner and a status. Action items are read back
out of the previous meeting's Minutes file at the start of the next meeting's interview, so their
open/closed status carries forward month to month rather than resetting each meeting.

**Bookkeeping Ledger**:
The running record of CRM's voluntary contributions and expenses, carried in the Minutes'
Bookkeeping section. Since CRM holds no bank account, this is a plain running total (contributions
minus expenses to date), not an account balance. Line items distinguish expenses that were
pre-approved via the Proposals process from those presented for after-the-fact ratification.
