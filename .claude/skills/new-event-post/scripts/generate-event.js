#!/usr/bin/env node
/**
 * Generates a .ics file and Google Calendar URL for a CRM monthly meetup.
 *
 * Usage:
 *   node generate-event.js --date 2026-07-01 --title "July 2026 Meetup" \
 *     [--startTime 19:00] [--endTime 21:00] \
 *     [--locationName "The Parlor at UU Church"] \
 *     [--locationAddress "274 Pleasant St, Concord, NH 03301"] \
 *     [--description "..."]
 *
 * Outputs JSON to stdout:
 *   { icsFilename, icsContent, googleCalUrl }
 */

const args = process.argv.slice(2);

function getArg(name, fallback) {
  const idx = args.indexOf(`--${name}`);
  if (idx !== -1 && args[idx + 1]) return args[idx + 1];
  return fallback;
}

const date = getArg('date');
if (!date) {
  console.error('Error: --date is required (YYYY-MM-DD)');
  process.exit(1);
}

const title = getArg('title', `Capital Region Mesh Meetup`);
const startTime = getArg('startTime', '19:00');
const endTime = getArg('endTime', '21:00');
const locationName = getArg('locationName', 'The Parlor at UU Church');
const locationAddress = getArg('locationAddress', '274 Pleasant St, Concord, NH 03301');
const description = getArg('description', `Join us for the ${title}.\n\nLocation: ${locationName}, ${locationAddress}\n\nRSVP: events@capitalmesh.net`);

// Parse date parts
const [year, month, day] = date.split('-').map(Number);
const [startHour, startMin] = startTime.split(':').map(Number);
const [endHour, endMin] = endTime.split(':').map(Number);

function pad(n) { return String(n).padStart(2, '0'); }

function toIcsDate(y, mo, d, h, m) {
  return `${y}${pad(mo)}${pad(d)}T${pad(h)}${pad(m)}00`;
}

// Derive slug for filename: e.g. "july-2026" from date 2026-07-01
const monthNames = ['january','february','march','april','may','june',
                    'july','august','september','october','november','december'];
const monthSlug = monthNames[month - 1];
const icsFilename = `crm-${monthSlug}-${year}-meetup.ics`;
const uid = `crm-meetup-${year}${pad(month)}${pad(day)}`;

// Generate a stable DTSTAMP from today (approximate — not critical for correctness)
const now = new Date();
const dtstamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth()+1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}00Z`;

const dtstart = toIcsDate(year, month, day, startHour, startMin);
const dtend = toIcsDate(year, month, day, endHour, endMin);

// Escape special iCalendar characters in text fields
function escapeIcs(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Capital Region Mesh//new-event-post//EN
METHOD:PUBLISH
BEGIN:VTIMEZONE
TZID:America/New_York
LAST-MODIFIED:20250410T142247Z
TZURL:https://www.tzurl.org/zoneinfo-outlook/America/New_York
X-LIC-LOCATION:America/New_York
BEGIN:DAYLIGHT
TZNAME:EDT
TZOFFSETFROM:-0500
TZOFFSETTO:-0400
DTSTART:19700308T020000
RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU
END:DAYLIGHT
BEGIN:STANDARD
TZNAME:EST
TZOFFSETFROM:-0400
TZOFFSETTO:-0500
DTSTART:19701101T020000
RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU
END:STANDARD
END:VTIMEZONE
BEGIN:VEVENT
DTSTAMP:${dtstamp}
CLASS:PUBLIC
CREATED:${dtstamp}
DESCRIPTION:${escapeIcs(description)}
DTSTART;TZID=America/New_York:${dtstart}
DTEND;TZID=America/New_York:${dtend}
LAST-MODIFIED:${dtstamp}
LOCATION:${escapeIcs(locationName)}
PRIORITY:0
SEQUENCE:0
SUMMARY:${escapeIcs(title)}
TRANSP:OPAQUE
UID:${uid}
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
ORGANIZER;CN=Sam from Capital Region Mesh:mailto:info@capitalmesh.net
END:VEVENT
END:VCALENDAR`;

// Google Calendar URL
// GCal expects UTC times in format YYYYMMDDTHHmmSSZ
// Convert local ET start/end to UTC (ET = UTC-5 in winter, UTC-4 in summer)
// Use a simple heuristic: EDT (UTC-4) from 2nd Sun March to 1st Sun Nov, else EST (UTC-5)
function isEDT(y, mo, d) {
  // Rough check: April–October is always EDT; March/November need exact DST date
  if (mo >= 4 && mo <= 10) return true;
  if (mo === 3) {
    // 2nd Sunday of March
    const firstDay = new Date(y, 2, 1).getDay(); // 0=Sun
    const secondSunday = 8 + (7 - firstDay) % 7;
    return d >= secondSunday;
  }
  if (mo === 11) {
    // 1st Sunday of November
    const firstDay = new Date(y, 10, 1).getDay();
    const firstSunday = 1 + (7 - firstDay) % 7;
    return d < firstSunday;
  }
  return false;
}

const offsetHours = isEDT(year, month, day) ? 4 : 5;

function toUtcIcsDate(y, mo, d, h, m) {
  let utcH = h + offsetHours;
  let utcD = d;
  let utcMo = mo;
  let utcY = y;
  if (utcH >= 24) {
    utcH -= 24;
    utcD += 1;
    // Simplified: not handling month rollover (meetings won't run past midnight)
  }
  return `${utcY}${pad(utcMo)}${pad(utcD)}T${pad(utcH)}${pad(m)}00Z`;
}

const gcalStart = toUtcIcsDate(year, month, day, startHour, startMin);
const gcalEnd = toUtcIcsDate(year, month, day, endHour, endMin);
const gcalText = encodeURIComponent(title);
const gcalLocation = encodeURIComponent(`${locationName}, ${locationAddress}`);
const gcalDetails = encodeURIComponent(description);
const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${gcalText}&dates=${gcalStart}/${gcalEnd}&details=${gcalDetails}&location=${gcalLocation}`;

console.log(JSON.stringify({ icsFilename, icsContent, googleCalUrl }, null, 2));
