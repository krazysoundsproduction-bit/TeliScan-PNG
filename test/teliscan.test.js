const test = require('node:test');
const assert = require('node:assert/strict');
const {
  normalizeVoucherCode,
  validateVoucherCode,
  formatDialCode,
  TeliScanService,
} = require('../src/teliscan');

test('normalizeVoucherCode removes whitespace and symbols', () => {
  assert.equal(normalizeVoucherCode(' 11-22 33*44#55 '), '1122334455');
});

test('validateVoucherCode accepts known prefix and length', () => {
  const result = validateVoucherCode('11 1234 5678 90');
  assert.equal(result.valid, true);
  assert.equal(result.cleaned, '111234567890');
});

test('validateVoucherCode rejects unknown prefix', () => {
  const result = validateVoucherCode('991234567890');
  assert.equal(result.valid, false);
  assert.equal(result.reason, 'invalid_prefix');
});

test('formatDialCode prepares dialable USSD format', () => {
  assert.equal(formatDialCode('11 1234 5678 90'), '*123*111234567890#');
});

test('formatDialCode supports a custom shortcode', () => {
  assert.equal(formatDialCode('11 1234 5678 90', '*888'), '*888*111234567890#');
});

test('TeliScanService tracks source/status and limits history', () => {
  const service = new TeliScanService({ maxHistory: 25 });

  service.processCode('111234567890', 'camera');
  const invalid = service.processCode('abcd', 'manual');

  assert.equal(invalid.status, 'invalid');
  assert.equal(service.getHistory()[0].source, 'manual');
  assert.equal(service.getHistory()[1].source, 'camera');

  for (let i = 0; i < 30; i += 1) {
    service.processCode(`1112345678${String(i).padStart(2, '0')}`);
  }

  assert.equal(service.getHistory().length, 25);
});


test('TeliScanService updates settings for UX toggles', () => {
  const service = new TeliScanService();
  const settings = service.setSettings({ autoCopy: true, darkMode: true, successFeedback: 'sound' });

  assert.equal(settings.autoCopy, true);
  assert.equal(settings.darkMode, true);
  assert.equal(settings.successFeedback, 'sound');
});
