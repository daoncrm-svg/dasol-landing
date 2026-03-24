(function (root, factory) {
  const api = factory();

  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  }

  if (root) {
    root.LeadUtils = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const MOBILE_PHONE_REGEX = /^010\d{8}$/;

  function toDigits(value) {
    return String(value || '').replace(/\D/g, '');
  }

  function getPhoneRestDigits(value) {
    const digits = toDigits(value);

    if (digits.startsWith('010')) {
      return digits.slice(3, 11);
    }
    if (digits.startsWith('10')) {
      return digits.slice(2, 10);
    }

    return digits.slice(0, 8);
  }

  function normalizePhone(value) {
    const digits = toDigits(value);

    if (digits.startsWith('010')) {
      return `010${getPhoneRestDigits(digits)}`;
    }
    if (digits.startsWith('10')) {
      return `010${getPhoneRestDigits(digits)}`;
    }

    return digits.slice(0, 11);
  }

  function isValidPhone(value) {
    return MOBILE_PHONE_REGEX.test(toDigits(value));
  }

  function formatPhoneInputValue(value) {
    const restDigits = getPhoneRestDigits(value);

    if (!restDigits) return '010-';
    if (restDigits.length <= 4) {
      return `010-${restDigits}`;
    }

    return `010-${restDigits.slice(0, 4)}-${restDigits.slice(4, 8)}`;
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
    const digits = normalizePhone(value);

    if (!isValidPhone(digits)) return '';

    return `+82${digits.slice(1)}`;
  }

  function normalizeName(value) {
    return String(value || '').replace(/\s+/g, '').trim();
  }

  function isLikelyValidLeadName(value) {
    const normalized = normalizeName(value);

    if (!normalized) return false;
    if (normalized.length < 3 || normalized.length > 5) return false;
    if (!/^[가-힣]+$/.test(normalized)) return false;

    const lower = normalized.toLowerCase();
    const blocked = new Set([
      '무',
      '없음',
      '테스트'
    ]);

    if (blocked.has(lower)) return false;
    if (/^(.)\1+$/.test(normalized)) return false;

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
