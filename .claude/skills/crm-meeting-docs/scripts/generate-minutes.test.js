const { test } = require('node:test');
const assert = require('node:assert/strict');
const { generateMinutesHtml } = require('./generate-minutes.js');

test('renders the letterhead with org name, "Meeting Minutes", and the date', () => {
  const html = generateMinutesHtml({ date: '2026-09-01' });
  assert.match(html, /Capital Region Mesh/);
  assert.match(html, /Meeting Minutes/);
  assert.match(html, /September 1, 2026/);
});

test('renders gracefully with only a date (no attendees, no decisions, no bookkeeping)', () => {
  const html = generateMinutesHtml({ date: '2026-09-01' });
  assert.match(html, /No attendees recorded/);
  assert.match(html, /No decisions recorded/);
  assert.match(html, /No action items/);
  // first-ever meeting: no prior running total to carry forward defaults to $0.00
  assert.match(html, /\$0\.00/);
});

test('renders attendees, roles, decisions, and action items with carried-forward status', () => {
  const html = generateMinutesHtml({
    date: '2026-09-01',
    facilitator: 'Alex',
    noteTaker: 'Jamie',
    timeKeeper: 'Sam',
    attendees: ['Alex', 'Jamie', 'Sam', 'Riley'],
    membersCouncil: {
      decisions: ['Approved the September budget line for printing.'],
      actionItems: [
        { owner: 'Jamie', task: 'Order printed agendas', status: 'open' },
        { owner: 'Riley', task: 'Follow up with venue', status: 'done', carriedFrom: '2026-08-01' },
      ],
    },
  });
  assert.match(html, /Alex/);
  assert.match(html, /Jamie/);
  assert.match(html, /Riley/);
  assert.match(html, /Approved the September budget line for printing\./);
  assert.match(html, /Order printed agendas/);
  assert.match(html, /open/);
  assert.match(html, /done/);
  assert.match(html, /carried forward from 2026-08-01/);
});

test('computes and displays the running bookkeeping total from a prior total plus this meeting\'s line items', () => {
  const html = generateMinutesHtml({
    date: '2026-09-01',
    bookkeeping: {
      priorRunningTotal: 120.5,
      lineItems: [
        { date: '2026-09-01', description: 'Member contribution', amount: 50, category: 'contribution', type: 'contribution', approvalStatus: 'pre-approved' },
        { date: '2026-09-01', description: 'Printing costs', amount: 15.25, category: 'printing', type: 'expense', approvalStatus: 'ratification' },
      ],
    },
  });
  // 120.50 + 50.00 - 15.25 = 155.25
  assert.match(html, /\$155\.25/);
  assert.match(html, /Member contribution/);
  assert.match(html, /Printing costs/);
  assert.match(html, /pre-approved/);
  assert.match(html, /ratification/);
});

test('distinguishes anticipated expenses tied to a passed proposal from informal heads-up', () => {
  const html = generateMinutesHtml({
    date: '2026-09-01',
    bookkeeping: {
      anticipated: [
        { description: 'New antenna mount', amount: 80, status: 'approved', proposalTitle: 'Antenna Mount Purchase' },
        { description: 'Possible venue deposit next spring', amount: 100, status: 'informal' },
      ],
    },
  });
  assert.match(html, /New antenna mount/);
  assert.match(html, /Antenna Mount Purchase/);
  assert.match(html, /Possible venue deposit next spring/);
  assert.match(html, /informal/i);
});

test('escapes HTML special characters in free-text fields', () => {
  const html = generateMinutesHtml({
    date: '2026-09-01',
    attendees: ['<script>alert(1)</script>'],
    membersCouncil: {
      decisions: ['Discussed "quotes" & <tags>'],
    },
  });
  assert.doesNotMatch(html, /<script>alert/);
  assert.match(html, /&lt;script&gt;/);
  assert.match(html, /&amp;/);
  assert.match(html, /&quot;quotes&quot;/);
});

test('falls back to a placeholder rather than "undefined" for a line item missing category/approvalStatus', () => {
  const html = generateMinutesHtml({
    date: '2026-09-01',
    bookkeeping: {
      lineItems: [
        { date: '2026-09-01', description: 'Member contribution', amount: 50, type: 'contribution' },
      ],
    },
  });
  assert.doesNotMatch(html, /undefined/);
});

test('falls back to a placeholder rather than "undefined" for an approved anticipated expense missing a proposalTitle', () => {
  const html = generateMinutesHtml({
    date: '2026-09-01',
    bookkeeping: {
      anticipated: [
        { description: 'Thing', amount: 10, status: 'approved' },
      ],
    },
  });
  assert.doesNotMatch(html, /undefined/);
});

test('throws a clear error when date is missing', () => {
  assert.throws(() => generateMinutesHtml({}), /date is required/i);
});
