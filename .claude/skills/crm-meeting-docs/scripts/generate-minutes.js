#!/usr/bin/env node
/**
 * Renders CRM meeting Minutes (structured data in, styled HTML out) for the
 * Secretary to open in a browser and print to PDF. Pure function — no file
 * I/O — so it can be unit tested directly; see generate-minutes.test.js.
 *
 * CLI usage:
 *   node generate-minutes.js --data minutes-data.json
 *
 * Prints the rendered HTML to stdout.
 */

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatMoney(amount) {
  const sign = amount < 0 ? '-' : '';
  return `${sign}$${Math.abs(amount).toFixed(2)}`;
}

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  return `${monthNames[month - 1]} ${day}, ${year}`;
}

function renderList(items, emptyMessage, renderItem) {
  if (!items || items.length === 0) {
    return `<p class="empty">${escapeHtml(emptyMessage)}</p>`;
  }
  return `<ul>${items.map(renderItem).join('')}</ul>`;
}

function renderActionItem(item) {
  const carried = item.carriedFrom
    ? ` <span class="tag">carried forward from ${escapeHtml(item.carriedFrom)}</span>`
    : '';
  return `<li><strong>${escapeHtml(item.owner)}</strong> — ${escapeHtml(item.task)} ` +
    `<span class="status status-${escapeHtml(item.status)}">${escapeHtml(item.status)}</span>${carried}</li>`;
}

function renderBookkeepingLineItem(item) {
  const signed = item.type === 'expense' ? -Math.abs(item.amount) : Math.abs(item.amount);
  return `<tr>` +
    `<td>${escapeHtml(item.date)}</td>` +
    `<td>${escapeHtml(item.description)}</td>` +
    `<td>${escapeHtml(item.category || '—')}</td>` +
    `<td>${escapeHtml(item.approvalStatus || '—')}</td>` +
    `<td class="amount">${formatMoney(signed)}</td>` +
    `</tr>`;
}

function renderAnticipatedExpense(item) {
  const provenance = item.status === 'approved'
    ? `approved — tied to proposal "${escapeHtml(item.proposalTitle || '—')}"`
    : 'informal — no proposal yet';
  return `<li>${escapeHtml(item.description)}, ${formatMoney(item.amount)} ` +
    `(<span class="tag">${provenance}</span>)</li>`;
}

/**
 * @param {object} data
 * @param {string} data.date - YYYY-MM-DD, required
 * @param {string} [data.facilitator]
 * @param {string} [data.noteTaker]
 * @param {string} [data.timeKeeper]
 * @param {string[]} [data.attendees]
 * @param {{topic?: string, presenter?: string, summary?: string}} [data.communityAssembly]
 * @param {{decisions?: string[], actionItems?: Array<{owner: string, task: string, status: string, carriedFrom?: string}>}} [data.membersCouncil]
 * @param {{summary?: string}} [data.workingSession]
 * @param {{priorRunningTotal?: number, lineItems?: Array<{date: string, description: string, amount: number, category: string, type: 'contribution'|'expense', approvalStatus: string}>, anticipated?: Array<{description: string, amount: number, status: 'approved'|'informal', proposalTitle?: string}>}} [data.bookkeeping]
 * @param {string} [data.nextMeetingDate]
 * @returns {string} A standalone HTML document.
 */
function generateMinutesHtml(data) {
  if (!data || !data.date) {
    throw new Error('date is required (YYYY-MM-DD)');
  }

  const attendees = data.attendees || [];
  const communityAssembly = data.communityAssembly || {};
  const membersCouncil = data.membersCouncil || {};
  const decisions = membersCouncil.decisions || [];
  const actionItems = membersCouncil.actionItems || [];
  const workingSession = data.workingSession || {};
  const bookkeeping = data.bookkeeping || {};
  const priorRunningTotal = bookkeeping.priorRunningTotal || 0;
  const lineItems = bookkeeping.lineItems || [];
  const anticipated = bookkeeping.anticipated || [];

  const netChange = lineItems.reduce((total, item) => {
    const signed = item.type === 'expense' ? -Math.abs(item.amount) : Math.abs(item.amount);
    return total + signed;
  }, 0);
  const runningTotal = priorRunningTotal + netChange;

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Capital Region Mesh — Meeting Minutes — ${escapeHtml(formatDate(data.date))}</title>
<style>
  body { font-family: Georgia, 'Times New Roman', serif; max-width: 800px; margin: 2rem auto; color: #1a1a1a; }
  header.letterhead { border-bottom: 3px solid #1a1a1a; padding-bottom: 1rem; margin-bottom: 1.5rem; }
  header.letterhead .org-name { font-size: 1.6rem; font-weight: bold; }
  header.letterhead .doc-title { font-size: 1.1rem; }
  header.letterhead .doc-date { color: #555; }
  section { margin-bottom: 1.5rem; }
  h2 { border-bottom: 1px solid #ccc; padding-bottom: 0.25rem; }
  table { width: 100%; border-collapse: collapse; }
  th, td { text-align: left; padding: 0.25rem 0.5rem; border-bottom: 1px solid #eee; }
  td.amount { text-align: right; }
  .empty { color: #777; font-style: italic; }
  .tag { color: #555; font-size: 0.9em; }
  .status { font-size: 0.85em; text-transform: uppercase; }
  .roles { color: #555; }
</style>
</head>
<body>
<header class="letterhead">
  <div class="org-name">Capital Region Mesh</div>
  <div class="doc-title">Meeting Minutes</div>
  <div class="doc-date">${escapeHtml(formatDate(data.date))}</div>
</header>

<section>
  <p class="roles">
    Facilitator: ${escapeHtml(data.facilitator || '—')} &middot;
    Note-Taker: ${escapeHtml(data.noteTaker || '—')} &middot;
    Time-Keeper: ${escapeHtml(data.timeKeeper || '—')}
  </p>
  <h2>Attendees</h2>
  ${renderList(attendees, 'No attendees recorded.', (name) => `<li>${escapeHtml(name)}</li>`)}
</section>

<section>
  <h2>Community Assembly</h2>
  ${communityAssembly.topic ? `<p><strong>${escapeHtml(communityAssembly.topic)}</strong>${communityAssembly.presenter ? ` — presented by ${escapeHtml(communityAssembly.presenter)}` : ''}</p>` : ''}
  <p>${communityAssembly.summary ? escapeHtml(communityAssembly.summary) : '<span class="empty">No summary recorded.</span>'}</p>
</section>

<section>
  <h2>Member's Council</h2>
  <h3>Decisions</h3>
  ${renderList(decisions, 'No decisions recorded.', (d) => `<li>${escapeHtml(d)}</li>`)}
  <h3>Action Items</h3>
  ${renderList(actionItems, 'No action items.', renderActionItem)}
</section>

<section>
  <h2>Working Session</h2>
  <p>${workingSession.summary ? escapeHtml(workingSession.summary) : '<span class="empty">No outcomes recorded.</span>'}</p>
</section>

<section>
  <h2>Bookkeeping</h2>
  <table>
    <thead>
      <tr><th>Date</th><th>Description</th><th>Category</th><th>Approval</th><th class="amount">Amount</th></tr>
    </thead>
    <tbody>
      ${lineItems.length ? lineItems.map(renderBookkeepingLineItem).join('') : '<tr><td colspan="5" class="empty">No line items this meeting.</td></tr>'}
    </tbody>
  </table>
  <p><strong>Running total: ${formatMoney(runningTotal)}</strong> (prior total ${formatMoney(priorRunningTotal)})</p>
  <h3>Anticipated Expenses</h3>
  ${renderList(anticipated, 'None anticipated.', renderAnticipatedExpense)}
</section>

<section>
  <h2>Next Meeting</h2>
  <p>${data.nextMeetingDate ? escapeHtml(formatDate(data.nextMeetingDate)) : '<span class="empty">Not yet scheduled.</span>'}</p>
</section>

</body>
</html>`;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const dataFlagIdx = args.indexOf('--data');
  if (dataFlagIdx === -1 || !args[dataFlagIdx + 1]) {
    console.error('Error: --data <path-to-json-file> is required');
    process.exit(1);
  }
  const fs = require('fs');
  const data = JSON.parse(fs.readFileSync(args[dataFlagIdx + 1], 'utf8'));
  console.log(generateMinutesHtml(data));
}

module.exports = { generateMinutesHtml };
