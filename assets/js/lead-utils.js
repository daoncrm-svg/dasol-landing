(function (root, factory) {
  const api = factory();

  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  }

  if (root) {
    root.LeadUtils = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const MOBILE_PHONE_REGEX = /^01[016789]\d{7,8}$/;

  function toDigits(value) {
    return String(value || '').replace(/\D/g, '');
  }

  function normalizePhone(value) {
    return toDigits(value).slice(0, 11);
  }

  function isValidPhone(value) {
    return MOBILE_PHONE_REGEX.test(toDigits(value));
  }

  function formatPhoneInputValue(value) {
    const digits = normalizePhone(value);

    if (!digits) return '';
    if (digits.length <= 3) return digits;
    if (digits.length <= 7) {
      return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    }
    if (digits.length === 10) {
      return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    }

    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
  }

  function maskPhone(value) {
    const digits = toDigits(value);

    if (digits.length === 10) {
      return `${digits.slice(0, 3)}-***-${digits.slice(-4)}`;
    }
    if (digits.length >= 11) {
      return `${digits.slice(0, 3)}-****-${digits.slice(-4)}`;
    }

    return formatPhoneInputValue(digits);
  }

  function maskName(value) {
    const trimmed = String(value || '').trim();

    if (!trimmed) return '';
    if (trimmed.length === 1) return trimmed;
    if (trimmed.length === 2) return `${trimmed[0]}*`;

    return `${trimmed[0]}${'*'.repeat(Math.max(1, trimmed.length - 2))}${trimmed.at(-1)}`;
  }

  function normalizePhoneToE164(value) {
    const digits = toDigits(value);

    if (!digits) return '';
    if (digits.startsWith('0')) return `+82${digits.slice(1)}`;
    if (digits.startsWith('82')) return `+${digits}`;

    return `+${digits}`;
  }

  function normalizeName(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function isLikelyValidLeadName(value) {
    const normalized = normalizeName(value);

    if (!normalized) return false;
    if (normalized.length < 2 || normalized.length > 20) return false;
    if (/\d/.test(normalized)) return false;
    if (!/^[A-Za-z가-힣\s]+$/.test(normalized)) return false;

    const compact = normalized.replace(/\s+/g, '');
    const lower = compact.toLowerCase();
    const blocked = new Set([
      'admin',
      'asdf',
      'none',
      'null',
      'qwer',
      'test',
      'tester',
      'unknown',
      '무',
      '없음',
      '테스트'
    ]);

    if (blocked.has(lower)) return false;
    if (/^(.)\1+$/.test(compact)) return false;

    return true;
  }

  function isObviouslyFakeKoreanMobile(value) {
    const digits = normalizePhone(value);

    if (!isValidPhone(digits)) return false;

    const subscriber = digits.slice(3);

    if (/^(\d)\1+$/.test(subscriber)) return true;
    if (/^1234567\d?$/.test(subscriber)) return true;
    if (/^0000000\d?$/.test(subscriber)) return true;
    if (/^1111111\d?$/.test(subscriber)) return true;

    return false;
  }

  function createSafeCompleteData(data) {
    return {
      name: maskName(data && data.name),
      phone: maskPhone(data && data.phone),
      type: String((data && data.type) || '').trim()
    };
  }

  return {
    createSafeCompleteData,
    formatPhoneInputValue,
    isObviouslyFakeKoreanMobile,
    isLikelyValidLeadName,
    isValidPhone,
    maskName,
    maskPhone,
    normalizeName,
    normalizePhone,
    normalizePhoneToE164,
    toDigits
  };
});
