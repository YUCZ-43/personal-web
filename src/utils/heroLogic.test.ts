import test from 'node:test';
import assert from 'node:assert/strict';
import {
  toggleService,
  calculateScrubTime,
  lerpValue,
  calculatePointerOffset,
  getTypewriterState,
  formatInquiryBanner,
  getScrollRevealProps,
  validateContactForm,
  buildMailtoPayload,
} from './heroLogic';

test('toggleService adds and removes portfolio areas cleanly', () => {
  let services: string[] = [];
  services = toggleService(services, 'AI Product');
  assert.deepEqual(services, ['AI Product']);

  services = toggleService(services, 'Automation');
  assert.deepEqual(services, ['AI Product', 'Automation']);

  services = toggleService(services, 'AI Product');
  assert.deepEqual(services, ['Automation']);
});

test('calculateScrubTime clamps between 0 and video duration', () => {
  const duration = 10;
  const viewportWidth = 1440;

  const t1 = calculateScrubTime(2, 720, viewportWidth, duration);
  assert.equal(Number(t1.toFixed(2)), 6.0);

  const tMax = calculateScrubTime(9, 1000, viewportWidth, duration);
  assert.equal(tMax, 10);

  const tMin = calculateScrubTime(1, -1000, viewportWidth, duration);
  assert.equal(tMin, 0);
});

test('lerpValue and calculatePointerOffset interpolate and clamp smoothly', () => {
  assert.equal(lerpValue(0, 10, 0.2), 2);
  const offset = calculatePointerOffset(1440, 0, 1440, 900);
  assert.equal(offset.nx, 1);
  assert.equal(offset.ny, -1);
});

test('getTypewriterState slices text accurately and reports done state', () => {
  const target = "Designing intelligent products.";
  const start = getTypewriterState(target, 0);
  assert.equal(start.displayed, '');
  assert.equal(start.done, false);

  const end = getTypewriterState(target, target.length);
  assert.equal(end.displayed, target);
  assert.equal(end.done, true);
});

test('formatInquiryBanner returns guidance when empty and selected areas when active', () => {
  assert.equal(
    formatInquiryBanner([]),
    'Select one or more areas above to tailor your inquiry.'
  );
  assert.equal(
    formatInquiryBanner(['AI Product', 'Consulting']),
    'Selected areas: AI Product, Consulting'
  );
});

test('getScrollRevealProps configures whileInView fade-in and upward motion', () => {
  const props = getScrollRevealProps(0.15, 28);
  assert.deepEqual(props.initial, { opacity: 0, y: 28 });
  assert.deepEqual(props.whileInView, { opacity: 1, y: 0 });
  assert.equal(props.viewport.once, true);
  assert.equal(props.transition.delay, 0.15);
});

test('validateContactForm enforces required fields and email format', () => {
  const emptyResult = validateContactForm({
    name: '  ',
    email: 'invalid-email',
    message: '',
    selectedServices: [],
  });
  assert.equal(emptyResult.valid, false);
  assert.ok(emptyResult.errors.name);
  assert.ok(emptyResult.errors.email);
  assert.ok(emptyResult.errors.message);

  const validResult = validateContactForm({
    name: 'Alex Chen',
    email: 'alex@example.com',
    message: 'Interested in building an autonomous developer workflow.',
    selectedServices: ['AI Product', 'Automation'],
  });
  assert.equal(validResult.valid, true);
  assert.deepEqual(validResult.errors, {});
});

test('buildMailtoPayload generates encoded mailto link and structured body', () => {
  const payload = buildMailtoPayload('hello@example.com', {
    name: 'Alex Chen',
    email: 'alex@example.com',
    message: 'Let us build an AI tool.',
    selectedServices: ['AI Product', 'Web Experience'],
  });
  assert.ok(payload.mailtoUrl.startsWith('mailto:hello%40example.com?subject='));
  assert.ok(payload.bodyText.includes('Areas of Interest: AI Product, Web Experience'));
  assert.ok(payload.bodyText.includes('Let us build an AI tool.'));
});
