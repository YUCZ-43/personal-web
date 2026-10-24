import test from 'node:test';
import assert from 'node:assert/strict';
import {
  resolveInitialLanguage,
  toggleService,
  calculateScrubTime,
  lerpValue,
  calculatePointerOffset,
  calculateBreathingState,
  calculateSpiralStarPoint,
  getTypewriterState,
  formatInquiryBanner,
  getScrollRevealProps,
  validateContactForm,
  buildMailtoPayload,
} from './heroLogic';

test('resolveInitialLanguage defaults to zh-CN and respects saved preferences', () => {
  assert.equal(resolveInitialLanguage(null), 'zh-CN');
  assert.equal(resolveInitialLanguage(undefined), 'zh-CN');
  assert.equal(resolveInitialLanguage('invalid'), 'zh-CN');
  assert.equal(resolveInitialLanguage('en'), 'en');
  assert.equal(resolveInitialLanguage('zh-CN'), 'zh-CN');
});

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

test('calculateBreathingState produces bounded subtle float, scale, and rim glow', () => {
  const state0 = calculateBreathingState(0, 7.2);
  assert.equal(Number(state0.floatY.toFixed(2)), 0);
  assert.ok(state0.scale >= 1 && state0.scale <= 1.02);
  assert.ok(state0.rimGlow >= 0.45 && state0.rimGlow <= 1.0);

  const statePeak = calculateBreathingState(1.8, 7.2); // quarter period = peak
  assert.ok(statePeak.floatY > 3.0);
  assert.ok(statePeak.scale > 1.01);
});

test('calculateSpiralStarPoint generates 3D coordinates with higher coreFactor near center', () => {
  const coreStar = calculateSpiralStarPoint(5, 1000);
  const outerStar = calculateSpiralStarPoint(950, 1000);
  assert.ok(coreStar.coreFactor > outerStar.coreFactor);
  assert.ok(Number.isFinite(coreStar.x) && Number.isFinite(coreStar.y) && Number.isFinite(coreStar.z));
});

test('getTypewriterState slices text accurately and reports done state', () => {
  const target = 'Designing intelligent products.';
  const start = getTypewriterState(target, 0);
  assert.equal(start.displayed, '');
  assert.equal(start.done, false);

  const end = getTypewriterState(target, target.length);
  assert.equal(end.displayed, target);
  assert.equal(end.done, true);
});

test('formatInquiryBanner supports both English and Simplified Chinese', () => {
  assert.equal(
    formatInquiryBanner([], 'en'),
    'Select one or more areas above to tailor your inquiry.'
  );
  assert.equal(
    formatInquiryBanner(['AI Product', 'Consulting'], 'en'),
    'Selected areas: AI Product, Consulting'
  );
  assert.equal(
    formatInquiryBanner(['AI Product', 'Automation'], 'zh-CN'),
    '已选探讨领域：AI 产品设计、智能体与自动化'
  );
});

test('getScrollRevealProps configures whileInView fade-in and upward motion', () => {
  const props = getScrollRevealProps(0.15, 28);
  assert.deepEqual(props.initial, { opacity: 0, y: 28 });
  assert.deepEqual(props.whileInView, { opacity: 1, y: 0 });
  assert.equal(props.viewport.once, true);
  assert.equal(props.transition.delay, 0.15);
});

test('validateContactForm enforces required fields in both en and zh-CN', () => {
  const emptyZh = validateContactForm(
    {
      name: '  ',
      email: 'invalid-email',
      message: '',
      selectedServices: [],
    },
    'zh-CN'
  );
  assert.equal(emptyZh.valid, false);
  assert.equal(emptyZh.errors.name, '请输入您的姓名或称呼。');

  const validResult = validateContactForm({
    name: '魚橙子',
    email: 'hello@yuchengzi.studio',
    message: 'Exploring a cosmic interactive portfolio.',
    selectedServices: ['AI Product'],
  });
  assert.equal(validResult.valid, true);
  assert.deepEqual(validResult.errors, {});
});

test('buildMailtoPayload generates encoded mailto link with 魚橙子 YU CHENGZI subject', () => {
  const payload = buildMailtoPayload('hello@yuchengzi.studio', {
    name: 'Alex Chen',
    email: 'alex@example.com',
    message: 'Let us build an AI tool.',
    selectedServices: ['AI Product', 'Web Experience'],
  });
  assert.ok(payload.mailtoUrl.startsWith('mailto:hello%40yuchengzi.studio?subject='));
  assert.ok(payload.subject.includes('魚橙子 YU CHENGZI'));
  assert.ok(payload.bodyText.includes('Areas of Interest: AI Product, Web Experience'));
});
