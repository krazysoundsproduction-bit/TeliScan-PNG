const DEFAULT_RULES = {
  lengths: [12, 14],
  prefixes: ['11', '12', '13', '14'],
};

const MIN_HISTORY = 20;
const MAX_HISTORY = 100;

const DEFAULT_SETTINGS = {
  autoCopy: false,
  darkMode: false,
  successFeedback: 'vibration',
};

function normalizeVoucherCode(rawCode) {
  if (typeof rawCode !== 'string') {
    return '';
  }

  return rawCode.replace(/[^0-9]/g, '');
}

function validateVoucherCode(code, rules = DEFAULT_RULES) {
  const cleaned = normalizeVoucherCode(code);

  if (!cleaned) {
    return { valid: false, reason: 'empty_code', cleaned };
  }

  if (!rules.lengths.includes(cleaned.length)) {
    return { valid: false, reason: 'invalid_length', cleaned };
  }

  if (rules.prefixes.length > 0 && !rules.prefixes.some((prefix) => cleaned.startsWith(prefix))) {
    return { valid: false, reason: 'invalid_prefix', cleaned };
  }

  return { valid: true, reason: 'ok', cleaned };
}

function formatDialCode(voucherCode, shortcode = '*123') {
  const cleaned = normalizeVoucherCode(voucherCode);
  return `${shortcode}*${cleaned}#`;
}

class TeliScanService {
  constructor(options = {}) {
    this.rules = options.rules || DEFAULT_RULES;
    const requestedMaxHistory = options.maxHistory ?? MIN_HISTORY;
    this.maxHistory = Math.min(Math.max(requestedMaxHistory, MIN_HISTORY), MAX_HISTORY);
    this.settings = { ...DEFAULT_SETTINGS, ...(options.settings || {}) };
    this.history = [];
  }

  setSettings(settingsPatch) {
    this.settings = { ...this.settings, ...settingsPatch };
    return this.settings;
  }

  processCode(rawCode, source = 'manual') {
    const validation = validateVoucherCode(rawCode, this.rules);
    const result = {
      rawCode,
      code: validation.cleaned,
      source,
      status: validation.valid ? 'valid' : 'invalid',
      reason: validation.reason,
      dialCode: validation.valid ? formatDialCode(validation.cleaned) : null,
      timestamp: new Date().toISOString(),
    };

    this.history.unshift(result);
    this.history = this.history.slice(0, this.maxHistory);

    return result;
  }

  getHistory() {
    return [...this.history];
  }

  clearHistory() {
    this.history = [];
  }
}

module.exports = {
  DEFAULT_RULES,
  DEFAULT_SETTINGS,
  normalizeVoucherCode,
  validateVoucherCode,
  formatDialCode,
  TeliScanService,
};
