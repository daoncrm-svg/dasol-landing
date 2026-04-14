/**
 * @fileoverview 다솔대부중개 랜딩페이지 인터랙션 및 UI 로직
 * @description Swiper 슬라이더, 대출 시뮬레이터, FAQ 아코디언, 폼 유효성 검증,
 *              스크롤 기반 노출 제어, 네비게이션 추적 등 랜딩페이지 전체 기능을 관리합니다.
 */

document.addEventListener('DOMContentLoaded', () => {
  initAdTracking();
  initCtaClickTracking();
  initLeadSubmitTracking();
  initPhoneClickTracking();
  initSwiper();
  initCtaRollers();
  initLoanSimulator();
  initFaq();
  initFadeIn();
  initForms();
  initFloatingFormVisibility();
  initFixedBottomBar();
  initMobileMinimalCtaVisibility();
  initNavTracking();
  initSmoothScroll();
  initTrustNumbers();
  injectResultToast();
  initHamburger();
  initConsentAll();
});

const LeadUtils = globalThis.LeadUtils;
const COMPLETE_PAGE_PATH = 'complete.html';
const GOOGLE_ADS_CONVERSION_ID = 'AW-17385092218/iTvsCP6yjOAbEPro7eFA';
const PENDING_META_LEAD_STORAGE_KEY = 'pendingMetaLeadEvent';

if (!LeadUtils) {
  throw new Error('LeadUtils must be loaded before landing.js');
}

/* =========================================================
 *  광고 식별자 + UTM + 유입 문맥 수집
 *  - 페이지 접속 시 URL 파라미터를 sessionStorage에 저장
 *  - 이미 저장된 값이 있으면 덮어쓰지 않음 (최초 클릭 보존)
 * ========================================================= */

/** @type {readonly string[]} 수집 대상 URL 파라미터 목록 */
const AD_TRACKING_PARAMS = /** @type {const} */ ([
  'gclid', 'gbraid', 'wbraid',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'
]);

/**
 * 광고 식별자, UTM 파라미터, referrer, landing URL, 디바이스 유형을
 * sessionStorage에 저장합니다.
 * 이미 저장된 값이 있으면 덮어쓰지 않습니다(첫 클릭 보존 원칙).
 * @returns {void}
 */
function initAdTracking() {
  if (!sessionStorage.getItem('_lp_first_seen_at')) {
    sessionStorage.setItem('_lp_first_seen_at', String(Date.now()));
  }

  // 이미 이번 세션에서 저장했으면 스킵
  if (sessionStorage.getItem('_ad_tracked')) return;

  const params = new URLSearchParams(window.location.search);
  /** @type {Record<string, string>} */
  const trackingData = {};

  // 1) URL 파라미터 (gclid, gbraid, wbraid, utm_*)
  for (const key of AD_TRACKING_PARAMS) {
    const val = params.get(key);
    if (val) trackingData[key] = val;
  }

  // 2) referrer
  if (document.referrer) {
    trackingData.referrer = document.referrer;
  }

  // 3) landing URL (쿼리스트링 포함 전체)
  trackingData.landing_url = window.location.href;

  // 4) device_type
  trackingData.device_type = getDeviceType();

  sessionStorage.setItem('_ad_tracking', JSON.stringify(trackingData));
  sessionStorage.setItem('_ad_tracked', '1');
}

/**
 * 사용자 디바이스 유형을 판별합니다.
 * @returns {'mobile' | 'tablet' | 'desktop'}
 */
function getDeviceType() {
  const ua = navigator.userAgent;
  if (/Mobi|Android.*Mobile|iPhone|iPod/i.test(ua)) return 'mobile';
  if (/Tablet|iPad|Android(?!.*Mobile)/i.test(ua)) return 'tablet';
  return 'desktop';
}

/**
 * sessionStorage에서 광고 추적 데이터를 읽어 반환합니다.
 * @returns {Record<string, string>}
 */
function getAdTrackingData() {
  try {
    const raw = sessionStorage.getItem('_ad_tracking');
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function getSessionDurationMs() {
  const firstSeenAt = Number(sessionStorage.getItem('_lp_first_seen_at'));

  if (!Number.isFinite(firstSeenAt) || firstSeenAt <= 0) {
    return null;
  }

  return Math.max(0, Date.now() - firstSeenAt);
}

function createMetaEventId() {
  if (globalThis.crypto && typeof globalThis.crypto.randomUUID === 'function') {
    return globalThis.crypto.randomUUID();
  }

  return `meta-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function rememberPendingMetaLeadEvent(payload) {
  try {
    sessionStorage.setItem(PENDING_META_LEAD_STORAGE_KEY, JSON.stringify(payload));
  } catch (error) {
    console.warn('Unable to persist pending Meta lead event.', error);
  }
}

function buildMetaLeadPayload(metaLeadEvent) {
  return {
    content_name: metaLeadEvent.leadType || '상담 신청',
    content_category: metaLeadEvent.formVariant || 'unknown_form',
    source_page: metaLeadEvent.sourcePage || '',
    landing_url: metaLeadEvent.landingUrl || '',
    page_path: window.location.pathname
  };
}

function trackMetaLead(metaLeadEvent) {
  if (typeof fbq !== 'function') {
    return false;
  }

  const leadPayload = buildMetaLeadPayload(metaLeadEvent);

  if (metaLeadEvent.eventId) {
    fbq('track', 'Lead', leadPayload, {
      eventID: metaLeadEvent.eventId
    });
  } else {
    fbq('track', 'Lead', leadPayload);
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'meta_browser_lead',
    ...leadPayload,
    meta_event_id: metaLeadEvent.eventId || '',
    trigger_context: 'form_submit_success'
  });

  return true;
}

function initPhoneClickTracking() {
  document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
    link.addEventListener('click', () => {
      const adData = getAdTrackingData();

      const eventPayload = {
        phone_href: link.getAttribute('href') || '',
        click_text: (link.textContent || '').trim(),
        click_context: detectPhoneClickContext(link),
        device_type: adData.device_type || getDeviceType(),
        landing_url: adData.landing_url || window.location.href
      };

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'phone_click',
        ...eventPayload
      });

      if (typeof gtag === 'function') {
        gtag('event', 'phone_click', eventPayload);
      }

      // Meta Pixel: 전화번호 클릭 커스텀 이벤트
      if (typeof fbq === 'function') {
        fbq('trackCustom', 'PhoneClick', {
          phone_href: eventPayload.phone_href,
          click_context: eventPayload.click_context,
          content_name: '전화문의',
          source_page: window.location.pathname
        });
      }
    });
  });
}

function initCtaClickTracking() {
  const ctaSelector = [
    '.hero-cta-btn',
    '.lp-spec-cta a',
    '.float-btn.apply',
    '.trust-card.product-link',
    '.nav-link[href*="cta"]',
    '.fab-item'
  ].join(', ');

  document.querySelectorAll(ctaSelector).forEach((element) => {
    element.addEventListener('click', () => {
      const adData = getAdTrackingData();
      const target = element.getAttribute('href')
        || element.getAttribute('data-scroll-to')
        || (element instanceof HTMLButtonElement ? 'form_submit' : '');

      const eventPayload = {
        click_text: (element.textContent || '').trim(),
        click_target: target,
        click_context: detectCtaClickContext(element),
        device_type: adData.device_type || getDeviceType(),
        landing_url: adData.landing_url || window.location.href
      };

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'cta_click',
        ...eventPayload
      });

      if (typeof gtag === 'function') {
        gtag('event', 'cta_click', eventPayload);
      }

      // Meta Pixel: CTA 클릭 커스텀 이벤트
      if (typeof fbq === 'function') {
        fbq('trackCustom', 'CtaClick', {
          click_text: eventPayload.click_text,
          click_target: eventPayload.click_target,
          click_context: eventPayload.click_context,
          source_page: window.location.pathname
        });
      }
    });
  });
}

function detectCtaClickContext(element) {
  const parent = element.closest('header, nav, .hero, .lp-spec-cta, .floating-cta, .final-cta-v2, .trust-grid, section');

  if (!parent) return 'unknown';
  if (parent.id) return parent.id;
  if (typeof parent.className === 'string' && parent.className.trim()) {
    return parent.className.trim().split(/\s+/)[0];
  }

  return 'unknown';
}

function trackAnalyticsEvent(eventName, payload) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...payload
  });

  if (typeof gtag === 'function') {
    gtag('event', eventName, payload);
  }
}

function trackLeadSubmitAttempt(form, submitBtn, phoneValue, nameValue) {
  trackAnalyticsEvent('lead_submit_attempt', {
    form_name: form.id || 'inquiry',
    form_variant: detectFormVariant(form),
    submit_text: (submitBtn?.textContent || '').trim(),
    has_name: Boolean(nameValue),
    has_phone: Boolean(phoneValue),
    phone_digits_length: LeadUtils.toDigits(phoneValue || '').length
  });
}

function trackLeadValidationError(form, fieldName, message) {
  trackAnalyticsEvent('lead_submit_validation_error', {
    form_name: form.id || 'inquiry',
    form_variant: detectFormVariant(form),
    invalid_field: fieldName,
    error_message: message
  });
}

function initLeadSubmitTracking() {
  document.querySelectorAll('form').forEach((form) => {
    form.addEventListener('submit', () => {
      /** @type {HTMLInputElement | null} */
      const nameInput = form.querySelector('input[name*="name"]');
      /** @type {HTMLInputElement | null} */
      const phoneInput = form.querySelector('input[type="tel"]');
      /** @type {HTMLSelectElement | null} */
      const typeSelect = form.querySelector('select[name*="propertyType"], select[name="loanType"]');
      /** @type {HTMLInputElement | null} */
      const privacyConsentInput = form.querySelector('input[name="consentPrivacy"], input[name="consent"]');
      /** @type {HTMLInputElement | null} */
      const thirdPartyConsentInput = form.querySelector('input[name="consentThirdParty"]');
      /** @type {HTMLButtonElement | null} */
      const submitBtn = form.querySelector('button[type="submit"]');

      const nameValue = nameInput ? nameInput.value.trim() : '';
      const phoneValue = phoneInput ? phoneInput.value.trim() : '';

      trackLeadSubmitAttempt(form, submitBtn, phoneValue, nameValue);

      // Meta Pixel: 폼 제출 시도 (표준 이벤트 InitiateCheckout)
      // 주의: 최종 Lead 이벤트는 서버(CAPI)에서 발송하므로 여기서는 '시도'만 기록
      if (typeof fbq === 'function') {
        fbq('track', 'InitiateCheckout', {
          content_name: form.id || 'inquiry_form',
          content_category: detectFormVariant(form),
          num_items: 1,
          value: 0,
          currency: 'KRW'
        });
      }

      if (nameInput && !nameValue) {
        trackLeadValidationError(form, 'name', '이름을 입력해 주세요.');
        return;
      }

      if (phoneInput && !validatePhone(phoneInput.value)) {
        trackLeadValidationError(form, 'phone', '전화번호를 확인해 주세요.');
        return;
      }

      if (typeSelect && !typeSelect.value) {
        trackLeadValidationError(form, 'loan_type', '대출 상품을 선택해 주세요.');
        return;
      }

      if (privacyConsentInput && !privacyConsentInput.checked) {
        trackLeadValidationError(form, 'consent_privacy', '개인정보 수집 및 이용에 동의해 주세요.');
        return;
      }

      if (thirdPartyConsentInput && !thirdPartyConsentInput.checked) {
        trackLeadValidationError(form, 'consent_third_party', '개인정보 제3자 제공 동의가 필요합니다.');
      }
    }, true);
  });
}

function detectPhoneClickContext(element) {
  const parent = element.closest('header, footer, .hero, .floating-cta, .fixed-bottom-bar, .mobile-fixed-form, .final-cta-v2');

  if (!parent) return 'unknown';
  if (parent.id) return parent.id;
  if (typeof parent.className === 'string' && parent.className.trim()) {
    return parent.className.trim().split(/\s+/)[0];
  }

  return 'unknown';
}

/**
 * 폼의 variant(식별자)를 자동 감지합니다.
 * - form에 id가 있으면 그대로 사용
 * - 없으면 부모 섹션의 class명 기반으로 추론
 * @param {HTMLFormElement} form
 * @returns {string}
 */
function detectFormVariant(form) {
  // 1) form id 사용
  if (form.id) return form.id;

  // 2) 부모 섹션 class 기반 추론
  const parent = form.closest('section, .hero, .final-cta-v2, .mobile-fixed-form, .fixed-bottom-bar, .floating-cta');
  if (parent) {
    if (parent.classList.contains('hero')) return 'hero_form';
    if (parent.classList.contains('final-cta-v2')) return 'final_cta_form';
    if (parent.classList.contains('mobile-fixed-form')) return 'mobile_bottom_form';
    if (parent.classList.contains('fixed-bottom-bar')) return 'desktop_bar_form';
    if (parent.classList.contains('floating-cta')) return 'floating_form';
    if (parent.id) return parent.id + '_form';
  }

  return 'unknown_form';
}

/**
 * 동일 세션 내 동일 전화번호 제출 여부를 확인합니다.
 * @param {string} phone - 전화번호 (숫자만)
 * @returns {boolean} 중복이면 true
 */
function hasSubmittedPhone(phone) {
  if (!phone) return false;

  /** @type {string[]} */
  let submitted = [];
  try {
    const raw = sessionStorage.getItem('_submitted_phones');
    if (raw) submitted = JSON.parse(raw);
  } catch { /* ignore */ }

  return submitted.includes(LeadUtils.toDigits(phone));
}

/**
 * 현재 세션에서 성공적으로 제출한 전화번호를 기록합니다.
 * @param {string} phone
 * @returns {void}
 */
function rememberSubmittedPhone(phone) {
  if (!phone) return;

  /** @type {string[]} */
  let submitted = [];
  try {
    const raw = sessionStorage.getItem('_submitted_phones');
    if (raw) submitted = JSON.parse(raw);
  } catch { /* ignore */ }

  const normalized = LeadUtils.toDigits(phone);
  if (submitted.includes(normalized)) return;

  submitted.push(normalized);
  sessionStorage.setItem('_submitted_phones', JSON.stringify(submitted));
}

/**
 * Swiper 리뷰 캐러셀을 초기화합니다.
 * @returns {void}
 */
function initSwiper() {
  if (typeof Swiper === 'undefined') return;

  new Swiper('.reviewSwiper', {
    slidesPerView: 'auto',
    spaceBetween: 16,
    speed: 5000,
    loop: true,
    freeMode: true,
    autoplay: { delay: 0, disableOnInteraction: false },
    breakpoints: {
      0: { slidesPerView: 1.15 },
      640: { slidesPerView: 2.3 },
      1024: { slidesPerView: 3.2 }
    }
  });
}

/**
 * 대출 시뮬레이터(금액·금리 슬라이더 → 월 납입금 계산)를 초기화합니다.
 * @returns {void}
 */
function initLoanSimulator() {
  /** @type {HTMLInputElement | null} */
  const amountSlider = document.getElementById('simAmount');
  /** @type {HTMLInputElement | null} */
  const rateSlider = document.getElementById('simRate');
  /** @type {HTMLElement | null} */
  const amountVal = document.getElementById('simAmountVal');
  /** @type {HTMLElement | null} */
  const rateVal = document.getElementById('simRateVal');
  /** @type {HTMLElement | null} */
  const monthlyResult = document.getElementById('monthlyPayment');

  if (!amountSlider || !rateSlider || !amountVal || !rateVal || !monthlyResult) return;

  /**
   * 슬라이더 트랙 배경을 현재 값 비율에 맞춰 업데이트합니다.
   * @param {HTMLInputElement} slider - 대상 range input 요소
   * @returns {void}
   */
  const updateSliderBg = (slider) => {
    /** @type {number} */
    const pct = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.background = `linear-gradient(90deg, var(--toss-blue) ${pct}%, #E5E8EB ${pct}%)`;
  };

  /**
   * 원리금 균등 상환 방식으로 월 납입금을 계산하고 DOM에 반영합니다.
   * @returns {void}
   */
  const calcMonthly = () => {
    /** @type {number} */
    const principal = parseInt(amountSlider.value, 10) * 10000;
    /** @type {number} */
    const rate = parseFloat(rateSlider.value) / 100 / 12;
    /** @type {number} */
    const months = 360;
    /** @type {number} */
    const monthly =
      rate === 0
        ? principal / months
        : principal * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);

    monthlyResult.textContent = `${Math.round(monthly).toLocaleString()}원`;
  };

  amountSlider.addEventListener('input', () => {
    amountVal.textContent = `${parseInt(amountSlider.value, 10).toLocaleString()}만원`;
    updateSliderBg(amountSlider);
    calcMonthly();
  });

  rateSlider.addEventListener('input', () => {
    rateVal.textContent = `${parseFloat(rateSlider.value).toFixed(1)}%`;
    updateSliderBg(rateSlider);
    calcMonthly();
  });

  updateSliderBg(amountSlider);
  updateSliderBg(rateSlider);
  calcMonthly();
}

/**
 * FAQ 아코디언 동작을 초기화합니다.
 * 하나의 항목이 열리면 다른 항목은 자동으로 닫히며, aria-expanded 상태를 동적으로 관리합니다.
 * @returns {void}
 */
function initFaq() {
  document.querySelectorAll('.faq-question').forEach((/** @type {HTMLButtonElement} */ button) => {
    button.addEventListener('click', () => {
      /** @type {HTMLElement | null} */
      const item = button.parentElement;
      /** @type {HTMLElement | null} */
      const answer = item?.querySelector('.faq-answer');
      /** @type {boolean} */
      const isOpen = item?.classList.contains('open');

      document.querySelectorAll('.faq-item').forEach((/** @type {HTMLElement} */ faqItem) => {
        faqItem.classList.remove('open');
        /** @type {HTMLElement | null} */
        const faqAnswer = faqItem.querySelector('.faq-answer');
        /** @type {HTMLButtonElement | null} */
        const faqBtn = faqItem.querySelector('.faq-question');
        if (faqAnswer) faqAnswer.style.maxHeight = '0';
        if (faqBtn) faqBtn.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen && item && answer) {
        item.classList.add('open');
        answer.style.maxHeight = `${answer.scrollHeight}px`;
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * IntersectionObserver를 사용하여 .fade-in 요소가 뷰포트에 진입하면
 * .visible 클래스를 추가하는 스크롤 기반 등장 애니메이션을 초기화합니다.
 * @returns {void}
 */
function initFadeIn() {
  /** @type {IntersectionObserver} */
  const fadeObserver = new IntersectionObserver((/** @type {IntersectionObserverEntry[]} */ entries) => {
    entries.forEach((/** @type {IntersectionObserverEntry} */ entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach((/** @type {HTMLElement} */ element) => fadeObserver.observe(element));
  document.querySelectorAll('.hero-content, .hero-stage').forEach((/** @type {HTMLElement} */ element) => element.classList.add('visible'));
}

/**
 * 전화번호 자동 포맷팅 및 각 폼의 제출 로직을 바인딩합니다.
 * @returns {void}
 */
function initForms() {
  document.querySelectorAll('input[name*="name"]').forEach((/** @type {HTMLInputElement} */ input) => {
    input.maxLength = 5;
    input.minLength = 3;
    input.pattern = '[가-힣]{3,5}';
    input.inputMode = 'text';
  });

  document.querySelectorAll('input[type="tel"]').forEach((/** @type {HTMLInputElement} */ input) => {
    input.inputMode = 'numeric';
    input.maxLength = 13;
    if (!input.value) {
      input.value = '010-';
    } else {
      formatPhone(input);
    }

    input.addEventListener('focus', () => {
      if (!input.value) input.value = '010-';
      formatPhone(input);
    });

    input.addEventListener('keydown', (event) => {
      const selectionStart = input.selectionStart ?? 0;
      const selectionEnd = input.selectionEnd ?? 0;
      const isPrefixSelection = selectionStart < 4 || selectionEnd < 4;

      if ((event.key === 'Backspace' && selectionStart <= 4) || (event.key === 'Delete' && isPrefixSelection)) {
        event.preventDefault();
        input.setSelectionRange(4, 4);
      }
    });

    input.addEventListener('input', () => formatPhone(input));
  });

  document.querySelectorAll('form').forEach((/** @type {HTMLFormElement} */ form) => {


    bindStandardFormSecure(form);
  });
}

/**
 * 클라이언트의 IP 주소를 비동기로 가져옵니다.
 * @returns {Promise<string>}
 */
function ensureHoneypotField(form) {
  if (form.querySelector('input[name="website"]')) return;

  /** @type {HTMLInputElement} */
  const honeypot = document.createElement('input');
  honeypot.type = 'text';
  honeypot.name = 'website';
  honeypot.autocomplete = 'off';
  honeypot.tabIndex = -1;
  honeypot.hidden = true;
  honeypot.setAttribute('aria-hidden', 'true');
  form.appendChild(honeypot);
}

function sendLeadConversion(phone, onComplete) {
  const finish = typeof onComplete === 'function' ? onComplete : () => {};

  if (typeof gtag !== 'function') {
    finish();
    return;
  }

  let settled = false;
  const safeFinish = () => {
    if (settled) return;
    settled = true;
    finish();
  };

  /** @type {{ send_to: string, value: number, currency: string, event_callback: () => void, user_data?: { phone_number: string } }} */
  const payload = {
    send_to: GOOGLE_ADS_CONVERSION_ID,
    value: 1.0,
    currency: 'KRW',
    event_callback: safeFinish
  };

  const phoneNumber = LeadUtils.normalizePhoneToE164(phone);
  if (phoneNumber) {
    payload.user_data = { phone_number: phoneNumber };
  }

  gtag('event', 'conversion', payload);
  window.setTimeout(safeFinish, 1000);
}

/**
 * 폼에 유효성 검증 및 보안 제출 처리 로직을 바인딩합니다.
 * 성공 시 서버 API를 통해 리드를 저장하고 전환 완료 페이지로 이동합니다.
 * @param {HTMLFormElement} form - 바인딩할 폼 요소
 * @returns {void}
 */
function bindStandardFormSecure(form) {
  ensureHoneypotField(form);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    /** @type {HTMLInputElement | null} */
    const nameInput = form.querySelector('input[name*="name"]');
    if (nameInput && !nameInput.value.trim()) {
      reportFieldError(nameInput, '이름을 입력해 주세요.');
      return;
    }

    /** @type {HTMLInputElement | null} */
    const phoneInput = form.querySelector('input[type="tel"]');
    if (phoneInput && !validatePhone(phoneInput.value)) {
      reportFieldError(phoneInput, '전화번호를 확인해 주세요.');
      return;
    }

    /** @type {HTMLSelectElement | HTMLInputElement | null} */
    const typeSelect = form.querySelector('select[name*="propertyType"], select[name="loanType"], input[name="loanType"]');
    if (typeSelect && !typeSelect.value) {
      reportFieldError(typeSelect, '대출 상품을 선택해 주세요.');
      return;
    }

    /** @type {HTMLInputElement | null} */
    const businessNameInput = form.querySelector('input[name="businessName"]');
    if (businessNameInput && !businessNameInput.value.trim()) {
      reportFieldError(businessNameInput, '사업자명을 입력해 주세요.');
      return;
    }

    /** @type {HTMLInputElement | null} */
    const privacyConsentInput = form.querySelector('input[name="consentPrivacy"], input[name="consent"]');
    if (privacyConsentInput && !privacyConsentInput.checked) {
      reportFieldError(privacyConsentInput, '개인정보 수집 및 이용에 동의해 주세요.');
      return;
    }

    /** @type {HTMLInputElement | null} */
    const thirdPartyConsentInput = form.querySelector('input[name="consentThirdParty"]');
    if (thirdPartyConsentInput && !thirdPartyConsentInput.checked) {
      reportFieldError(thirdPartyConsentInput, '개인정보 제3자 제공 동의가 필요합니다.');
      return;
    }

    /** @type {HTMLButtonElement | null} */
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerText : '무료 상담 요청';
    if (submitBtn) {
      submitBtn.innerText = '신청 중...';
      submitBtn.disabled = true;
    }

    showResultToast('loading', '신청 접수 중', '서버로 데이터를 안전하게 전송하고 있습니다.<br>잠시만 기다려주세요.');

    // 모바일 바텀시트에서 제출한 경우, 즉시 시트를 닫아 로딩 토스트가 잘 보이도록 처리
    if (typeof window.closeMobileLeadSheet === 'function') {
      window.closeMobileLeadSheet();
    }

    try {
      let typeText = '';
      if (typeSelect) {
        if (typeSelect.tagName === 'SELECT') {
          typeText = typeSelect.selectedIndex >= 0 ? typeSelect.options[typeSelect.selectedIndex].text : '';
        } else {
          typeText = typeSelect.value;
        }
      }

      /** @type {HTMLInputElement | null} */
      const sourcePageInput = form.querySelector('input[name="source_page"]');
      const sourcePage = sourcePageInput ? sourcePageInput.value : 'event_page';

      /** @type {HTMLInputElement | null} */
      const marketingConsentInput = form.querySelector('input[name="consentMarketing"]');

      /** @type {HTMLInputElement | null} */
      const honeypotInput = form.querySelector('input[name="website"]');

      const phoneValue = phoneInput ? phoneInput.value.trim() : '';
      const metaEventId = createMetaEventId();
      
      /** @type {HTMLInputElement | null} */
      const amountInput = form.querySelector('input[name="amount"]');
      /** @type {HTMLTextAreaElement | null} */
      const inquiryInput = form.querySelector('textarea[name="inquiry"]');
      
      /** @type {HTMLInputElement | null} */
      const unknownBizNumCheck = form.querySelector('input[name="unknownBizNum"]');
      /** @type {HTMLInputElement | null} */
      const businessNumberInput = form.querySelector('input[name="businessNumber"]');
      
      const payload = {
        name: nameInput ? nameInput.value.trim() : '',
        phone: phoneValue,
        businessName: businessNameInput ? businessNameInput.value.trim() : '',
        businessNumber: (unknownBizNumCheck && unknownBizNumCheck.checked) 
                          ? '기억안남' 
                          : (businessNumberInput ? businessNumberInput.value.trim() : ''),
        amount: amountInput ? amountInput.value.trim() : '',
        inquiry: inquiryInput ? inquiryInput.value.trim() : '',
        source: sourcePage,
        inquiryForm: typeText,
        formVariant: detectFormVariant(form),
        metaEventId,
        isDuplicate: hasSubmittedPhone(phoneValue),
        consents: {
          privacy: Boolean(privacyConsentInput && privacyConsentInput.checked),
          thirdParty: Boolean(thirdPartyConsentInput && thirdPartyConsentInput.checked),
          marketing: Boolean(marketingConsentInput && marketingConsentInput.checked)
        },
        adData: getAdTrackingData(),
        website: honeypotInput ? honeypotInput.value : '',
        sessionDurationMs: getSessionDurationMs()
      };

      const apiUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? 'http://localhost:8000/api/lead'
        : '/api/lead';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      /** @type {{ ok?: boolean, displayData?: { name?: string, phone?: string, type?: string }, webhookDelivered?: boolean }} */
      let result = {};
      try {
        result = await response.json();
      } catch {
        result = {};
      }

      if (!response.ok || !result.ok) {
        let errorMsg = '요청 처리 중 문제가 발생했습니다.<br>잠시 후 다시 시도해 주세요.';
        let toastTitle = '접수 실패';
        if (result.errors && Array.isArray(result.errors) && result.errors.length > 0) {
          errorMsg = result.errors.join('<br>');
          toastTitle = '입력 확인';
        } else if (result.error && typeof result.error === 'string') {
          errorMsg = result.error;
        } else if (result.message) {
          errorMsg = result.message;
        }
        showResultToast('error', toastTitle, errorMsg);
        return;
      }

      if (window.incrementCtaCounter) window.incrementCtaCounter();
      rememberSubmittedPhone(phoneValue);

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'form_submission_success',
        form_name: form.id || 'inquiry',
        lead_type: typeText,
        lead_name: payload.name,
        lead_phone_masked: phoneValue.replace(/\d{4}$/, '****')
      });

      if (result.webhookDelivered === false) {
        console.warn('Lead saved, but webhook delivery failed.');
      }

      const returnUrl = window.location.pathname.split('/').pop() || 'index.html';
      const storageData2 = result.displayData || LeadUtils.createSafeCompleteData({
          name: payload.name,
          phone: phoneValue,
          type: typeText
      });
      storageData2.returnUrl = returnUrl;
      sessionStorage.setItem('completeData', JSON.stringify(storageData2));
      const pendingMetaLeadEvent = {
        eventId: metaEventId,
        leadType: typeText,
        formVariant: payload.formVariant,
        sourcePage: window.location.pathname,
        landingUrl: payload.adData?.landing_url || window.location.href,
        browserTracked: false
      };

      rememberPendingMetaLeadEvent(pendingMetaLeadEvent);

      if (trackMetaLead(pendingMetaLeadEvent)) {
        rememberPendingMetaLeadEvent({
          ...pendingMetaLeadEvent,
          browserTracked: true,
          browserTrackedAt: Date.now()
        });
      }

      sendLeadConversion(phoneValue, () => {
        window.location.href = COMPLETE_PAGE_PATH;
      });
    } catch (err) {
      console.error('Unexpected Form Submit Error:', err);
      showResultToast('error', '예기치 않은 오류', '일시적인 서버 문제가 발생했습니다.<br>1866-1019로 연락주시면 바로 안내해 드리겠습니다.');
    } finally {
      if (submitBtn) {
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
      }
    }
  });
}

function validatePhone(value) {
  return LeadUtils.isValidPhone(value);
}

/**
 * 전화번호 입력 필드에 자동 하이픈 포맷팅(000-0000-0000)을 적용합니다.
 * @param {HTMLInputElement} input - 포맷을 적용할 input 요소
 * @returns {void}
 */
function formatPhone(input) {
  input.value = LeadUtils.formatPhoneInputValue(input.value);

  if ((input.selectionStart ?? 0) < 4) {
    input.setSelectionRange(4, 4);
  }
}

/**
 * 특정 폼 필드의 유효성 오류를 사용자에게 보고합니다.
 * 체크박스는 alert, 그 외는 HTML5 Constraint Validation API를 사용합니다.
 * @param {HTMLInputElement | HTMLSelectElement} field - 오류가 발생한 폼 필드
 * @param {string} message - 표시할 오류 메시지
 * @returns {void}
 */
function reportFieldError(field, message) {
  if (field.type === 'checkbox') {
    alert(message);
    field.focus();
    return;
  }

  field.setCustomValidity(message);
  field.reportValidity();
  field.focus();
  field.setCustomValidity('');
}

/**
 * 스크롤 위치에 따라 플로팅 상담 폼의 표시/숨김을 제어합니다.
 * 히어로 섹션 하단이 뷰포트 위로 올라가면 표시됩니다.
 * @returns {void}
 */
function initFloatingFormVisibility() {
  /** @type {HTMLElement | null} */
  const floatingFormContainer = document.querySelector('.floating-form-container');
  /** @type {HTMLElement | null} */
  const heroSection = document.getElementById('hero');

  if (!floatingFormContainer || !heroSection) return;

  window.addEventListener('scroll', () => {
    /** @type {number} */
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    floatingFormContainer.classList.toggle('visible', heroBottom < 200);
  }, { passive: true });
}

/**
 * 스크롤 위치에 따라 화면 하단 고정 CTA 바의 표시/숨김을 제어합니다.
 * 히어로 아래~최종 CTA 위 구간에서만 표시됩니다.
 * @returns {void}
 */
function initFixedBottomBar() {
  /** @type {HTMLElement | null} */
  const fixedBottomBar = document.getElementById('fixedBottomBar');
  /** @type {HTMLElement | null} */
  const heroSection = document.getElementById('hero');
  /** @type {HTMLElement | null} */
  const finalCTA = document.getElementById('finalCTA');

  if (!fixedBottomBar || !heroSection) return;

  window.addEventListener('scroll', () => {
    /** @type {number} */
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    /** @type {number} */
    const ctaTop = finalCTA ? finalCTA.getBoundingClientRect().top : Number.POSITIVE_INFINITY;
    /** @type {boolean} */
    const shouldShow = heroBottom < 0 && ctaTop > window.innerHeight;

    fixedBottomBar.classList.toggle('visible', shouldShow);
  }, { passive: true });
}

function initMobileMinimalCtaVisibility() {
  /** @type {HTMLElement | null} */
  const minimalCta = document.querySelector('.mobile-minimal-cta');
  if (!minimalCta) return;

  /** @type {HTMLElement | null} */
  const heroSection = document.querySelector('#hero, .lp-hero, .hero');
  if (!heroSection) {
    minimalCta.classList.add('visible');
    return;
  }

  const checkVisibility = () => {
    const rect = heroSection.getBoundingClientRect();
    // 히어로 섹션이 화면의 절반 이상 위로 올라가면 하단 바 표시
    if (rect.bottom < window.innerHeight * 0.5) {
      minimalCta.classList.add('visible');
    } else {
      minimalCta.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', checkVisibility, { passive: true });
  // 초기 로드 시 한 번 실행
  checkVisibility();
}

/**
 * 스크롤 시 현재 보이는 섹션에 맞춰 네비게이션 링크를 활성화합니다.
 * IntersectionObserver를 사용하며, 헤더 높이를 rootMargin으로 보정합니다.
 * @returns {void}
 */
function initNavTracking() {
  /** @type {NodeListOf<HTMLAnchorElement>} */
  const navLinks = document.querySelectorAll('.nav-link');
  /** @type {NodeListOf<HTMLElement>} */
  const sections = document.querySelectorAll('section[id]');
  /** @type {HTMLElement | null} */
  const header = document.querySelector('.header');
  /** @type {number} */
  const headerOffset = header ? header.offsetHeight : 72;

  if (!navLinks.length || !sections.length) return;

  /** @type {IntersectionObserver} */
  const scrollObserver = new IntersectionObserver((/** @type {IntersectionObserverEntry[]} */ entries) => {
    entries.forEach((/** @type {IntersectionObserverEntry} */ entry) => {
      if (!entry.isIntersecting) return;

      /** @type {string | null} */
      const currentId = entry.target.getAttribute('id');
      navLinks.forEach((/** @type {HTMLAnchorElement} */ link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
      });
    });
  }, {
    threshold: 0.3,
    rootMargin: `${-headerOffset}px 0px 0px 0px`
  });

  sections.forEach((/** @type {HTMLElement} */ section) => scrollObserver.observe(section));
}

/**
 * 앵커 링크(#)를 클릭하면 헤더 높이를 보정한 부드러운 스크롤을 적용합니다.
 * @returns {void}
 */
function initSmoothScroll() {
  /** @type {HTMLElement | null} */
  const header = document.querySelector('.header');
  /** @type {number} */
  const headerOffset = header ? header.offsetHeight : 72;

  document.querySelectorAll('a[href^="#"]').forEach((/** @type {HTMLAnchorElement} */ anchor) => {
    anchor.addEventListener('click', (/** @type {MouseEvent} */ event) => {
      /** @type {string | null} */
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      /** @type {HTMLElement | null} */
      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      /** @type {number} */
      const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
      /** @type {number} */
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });
}

/**
 * CTA 섹션의 날짜, 카운터, 수직 롤러 애니메이션을 초기화합니다.
 * 카운터는 3~8초 간격으로 자동 증가하며, 폼 제출 시에도 1 증가합니다.
 * @returns {void}
 */
function initCtaRollers() {
  /** @type {HTMLElement | null} */
  const dateEl = document.getElementById('ctaDate');
  if (dateEl) {
    /** @type {Date} */
    const now = new Date();
    /**
     * 숫자를 2자리 문자열로 패딩합니다.
     * @param {number} value - 패딩할 숫자
     * @returns {string} 2자리 문자열
     */
    const pad = (value) => `0${value}`.slice(-2);
    dateEl.textContent = `${now.getFullYear()}년 ${pad(now.getMonth() + 1)}월 ${pad(now.getDate())}일 기준`;
  }

  /** @type {HTMLElement | null} */
  const countEl = document.getElementById('ctaCount');
  /** @type {HTMLElement | null} */
  const trustApprovalEl = document.getElementById('trustApprovalCount');

  if (countEl || trustApprovalEl) {
    /** @type {number} */
    const base = 14600;
    /** @type {number} */
    const variation = Math.floor(Math.random() * 50);
    /** @type {number} */
    let currentCount = base + variation;
    
    const countText = currentCount.toLocaleString();
    if (countEl) countEl.textContent = countText;
    if (trustApprovalEl) trustApprovalEl.textContent = countText;

    /**
     * 카운터 값이 변경될 때 스케일 애니메이션을 재생합니다.
     * @returns {void}
     */
    const animateCount = () => {
      const scaleUp = 'scale(1.05)';
      const scaleNormal = 'scale(1)';

      if (countEl) {
        countEl.style.transition = 'transform 0.3s ease';
        countEl.style.transform = scaleUp;
      }
      if (trustApprovalEl) {
        trustApprovalEl.style.transition = 'transform 0.3s ease';
        trustApprovalEl.style.transform = scaleUp;
      }
      
      setTimeout(() => {
        if (countEl) countEl.style.transform = scaleNormal;
        if (trustApprovalEl) trustApprovalEl.style.transform = scaleNormal;
      }, 300);
    };

    /**
     * CTA 카운터를 1 증가시키고 애니메이션을 재생합니다.
     * window 전역에 할당되어 폼 제출 시에도 호출됩니다.
     * @returns {void}
     */
    window.incrementCtaCounter = () => {
      currentCount += 1;
      const newText = currentCount.toLocaleString();
      if (countEl) countEl.textContent = newText;
      if (trustApprovalEl) trustApprovalEl.textContent = newText;
      animateCount();
    };

    /**
     * 3~8초 랜덤 간격으로 카운터를 자동 증가시킵니다.
     * @returns {void}
     */
    const autoIncrement = () => {
      /** @type {number} */
      const delay = 3000 + Math.floor(Math.random() * 5000);
      setTimeout(() => {
        window.incrementCtaCounter();
        autoIncrement();
      }, delay);
    };

    autoIncrement();
  }

  /** @type {Array<{selector: string, delay: number}>} */
  const rollers = [
    { selector: '.cta-swiper-1', delay: 1800 },
    { selector: '.cta-swiper-2', delay: 2200 },
    { selector: '.cta-swiper-3', delay: 2500 }
  ];

  rollers.forEach((/** @type {{selector: string, delay: number}} */ { selector, delay }) => {
    /** @type {HTMLElement | null} */
    const container = document.querySelector(selector);
    if (!container) return;

    /** @type {HTMLElement | null} */
    const track = container.querySelector('.cta-roller-track');
    /** @type {NodeListOf<HTMLElement>} */
    const items = container.querySelectorAll('.cta-roller-item');
    if (!track || !items.length) return;

    container.style.height = '36px';
    container.style.overflow = 'hidden';
    track.style.transition = 'transform 0.5s ease';

    items.forEach((/** @type {HTMLElement} */ item) => {
      item.style.height = '36px';
      item.style.lineHeight = '36px';
    });

    /** @type {number} */
    let currentIndex = 0;
    setInterval(() => {
      currentIndex = (currentIndex + 1) % items.length;
      track.style.transform = `translateY(-${currentIndex * 36}px)`;
    }, delay);
  });
}

/**
 * 신뢰 지표 숫자 카운트업 애니메이션을 초기화합니다.
 * IntersectionObserver로 뷰포트 진입 시 1회 재생됩니다.
 * @returns {void}
 */
function initTrustNumbers() {
  /** @type {NodeListOf<HTMLElement>} */
  const counters = document.querySelectorAll('.trust-number-value');
  if (!counters.length) return;

  /**
   * 개별 카운터 요소에 easeOutQuart 이징 카운트업 애니메이션을 적용합니다.
   * @param {HTMLElement} element - data-target, data-decimal 속성을 가진 카운터 요소
   * @returns {void}
   */
  const animateCounter = (element) => {
    const targetVal = element.dataset.target;
    if (!targetVal) return; // data-target이 없으면(예: 동기화 요소) 조기 종료

    /** @type {number} */
    const target = parseFloat(targetVal);
    /** @type {number} */
    const decimal = parseInt(element.dataset.decimal || '0', 10);
    /** @type {number} */
    const duration = 2000;
    /** @type {number} */
    const startTime = performance.now();

    /**
     * easeOutQuart 이징 함수
     * @param {number} progress - 0~1 사이 진행률
     * @returns {number} 이징이 적용된 진행률
     */
    const easeOutQuart = (progress) => 1 - Math.pow(1 - progress, 4);

    /**
     * requestAnimationFrame 콜백으로 매 프레임마다 카운터 값을 갱신합니다.
     * @param {DOMHighResTimeStamp} currentTime - 현재 프레임 타임스탬프
     * @returns {void}
     */
    const step = (currentTime) => {
      /** @type {number} */
      const elapsed = currentTime - startTime;
      /** @type {number} */
      const progress = Math.min(elapsed / duration, 1);
      /** @type {number} */
      const easedProgress = easeOutQuart(progress);
      /** @type {number} */
      const current = easedProgress * target;

      element.textContent = decimal > 0
        ? current.toFixed(decimal)
        : Math.floor(current).toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(step);
        return;
      }

      element.textContent = decimal > 0
        ? target.toFixed(decimal)
        : target.toLocaleString();
    };

    requestAnimationFrame(step);
  };

  /** @type {IntersectionObserver} */
  const observer = new IntersectionObserver((/** @type {IntersectionObserverEntry[]} */ entries) => {
    entries.forEach((/** @type {IntersectionObserverEntry} */ entry) => {
      if (!entry.isIntersecting) return;

      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.3 });

  counters.forEach((/** @type {HTMLElement} */ counter) => observer.observe(counter));
}

/**
 * 폼 제출 결과를 표시할 범용 토스트/안내창 UI를 DOM에 주입합니다.
 * @returns {void}
 */
function injectResultToast() {
  if (document.querySelector('.form-result-overlay')) return;

  /** @type {HTMLDivElement} */
  const overlay = document.createElement('div');
  overlay.className = 'form-result-overlay';
  overlay.addEventListener('click', (e) => {
    // 팝업 회색 배경 클릭 시 팝업 닫기 (단, 로딩 중에는 닫히지 않음)
    if (e.target === overlay && !overlay.classList.contains('is-loading')) {
      hideResultToast();
    }
  });

  /** @type {HTMLDivElement} */
  const toast = document.createElement('div');
  toast.className = 'form-result-toast';
  toast.innerHTML = `
    <div class="toast-icon" data-type="loading"></div>
    <div class="toast-title">처리 중</div>
    <div class="toast-desc">잠시만 기다려주세요.</div>
    <button type="button" class="toast-close-btn" style="display: none;" onclick="hideResultToast()">확인</button>
  `;

  overlay.appendChild(toast);
  document.body.appendChild(overlay);
}

/**
 * 전역 타이머 관리용 변수 (자동 팝업 닫기 타임아웃)
 * @type {number | null}
 */
let resultToastTimer = null;

/**
 * 폼 제출 결과 안내창(토스트)을 화면에 띄웁니다.
 *
 * @param {'success'|'error'|'loading'} type - 아이콘 및 상태 타입
 * @param {string} title - 큰 제목 텍스트
 * @param {string} desc - 메인 안내 문구
 * @returns {void}
 */
function showResultToast(type, title, desc) {
  /** @type {HTMLElement | null} */
  const overlay = document.querySelector('.form-result-overlay');
  if (!overlay) return;

  if (resultToastTimer) {
    clearTimeout(resultToastTimer);
    resultToastTimer = null;
  }

  // 로딩 상태 제어 (로딩중에는 바깥 클릭을 막기 위함)
  if (type === 'loading') {
    overlay.classList.add('is-loading');
  } else {
    overlay.classList.remove('is-loading');
  }

  /** @type {HTMLElement | null} */
  const iconEl = overlay.querySelector('.toast-icon');
  /** @type {HTMLElement | null} */
  const titleEl = overlay.querySelector('.toast-title');
  /** @type {HTMLElement | null} */
  const descEl = overlay.querySelector('.toast-desc');
  /** @type {HTMLElement | null} */
  const btnEl = overlay.querySelector('.toast-close-btn');

  if (iconEl) {
    iconEl.setAttribute('data-type', type);
    if (type === 'success') iconEl.innerHTML = '✓';
    else if (type === 'error') iconEl.innerHTML = '!';
    else iconEl.innerHTML = '↻'; // loading fallback
  }

  if (titleEl) titleEl.innerHTML = title;
  if (descEl) descEl.innerHTML = desc;

  if (btnEl) {
    // 성공 혹은 에러 시 확인 버튼을 표시
    if (type === 'success' || type === 'error') {
      btnEl.style.display = 'block';
    } else {
      btnEl.style.display = 'none';
    }
  }

  overlay.classList.add('show');

  // 성공 상태일 때는 5초 후 자동으로 닫히도록 설정
  if (type === 'success') {
    resultToastTimer = setTimeout(() => {
      hideResultToast();
    }, 5000);
  }
}

/**
 * 폼 안내창 UI를 숨깁니다.
 * @returns {void}
 */
function hideResultToast() {
  /** @type {HTMLElement | null} */
  const overlay = document.querySelector('.form-result-overlay');
  if (overlay) {
    overlay.classList.remove('show');
  }
  if (resultToastTimer) {
    clearTimeout(resultToastTimer);
    resultToastTimer = null;
  }
}

/**
 * 모바일 햄버거 메뉴 토글 기능을 초기화합니다.
 * 햄버거 버튼 클릭 시 사이드 메뉴 슬라이드인/아웃, 오버레이, body 스크롤 잠금을 제어합니다.
 * @returns {void}
 */
function initHamburger() {
  /** @type {HTMLButtonElement | null} */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  /** @type {HTMLElement | null} */
  const nav = document.getElementById('mainNav');
  /** @type {HTMLElement | null} */
  const overlay = document.getElementById('navOverlay');

  if (!hamburgerBtn || !nav) return;

  /**
   * 모바일 메뉴를 토글합니다 (열기/닫기).
   * @returns {void}
   */
  const toggleMenu = () => {
    /** @type {boolean} */
    const isOpen = nav.classList.toggle('open');
    hamburgerBtn.classList.toggle('active', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
    hamburgerBtn.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');

    if (overlay) {
      overlay.classList.toggle('active', isOpen);
    }

    // body 스크롤 잠금/해제
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  /**
   * 모바일 메뉴를 닫습니다.
   * @returns {void}
   */
  const closeMenu = () => {
    nav.classList.remove('open');
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    hamburgerBtn.setAttribute('aria-label', '메뉴 열기');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  // 햄버거 버튼 클릭
  hamburgerBtn.addEventListener('click', toggleMenu);

  // 오버레이 클릭 시 닫기
  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // 네비게이션 링크 클릭 시 자동으로 메뉴 닫기
  nav.querySelectorAll('.nav-link').forEach((/** @type {HTMLAnchorElement} */ link) => {
    link.addEventListener('click', closeMenu);
  });

  // 창 크기 변경 시 데스크톱으로 돌아오면 메뉴 상태 초기화
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
}

/**
 * @description 전체 동의 체크박스 토글 로직
 */
function initConsentAll() {
  const allCheck = document.getElementById('consentAllCheck');
  if (!allCheck) return;

  const consentArea = allCheck.closest('.cta-inline-consent');
  if (!consentArea) return;

  const childBoxes = consentArea.querySelectorAll('.consent-detail-list input[type="checkbox"]');

  allCheck.addEventListener('change', () => {
    childBoxes.forEach(cb => { cb.checked = allCheck.checked; });
  });

  childBoxes.forEach(cb => {
    cb.addEventListener('change', () => {
      allCheck.checked = [...childBoxes].every(c => c.checked);
    });
  });
}

/**
 * 모바일 특화 바텀 시트를 엽니다.
 */
window.openMobileLeadSheet = function() {
  const overlay = document.getElementById('mobileSheetOverlay');
  const sheet = document.getElementById('mobileLeadSheet');
  
  if (overlay && sheet) {
    overlay.classList.add('active');
    sheet.classList.add('active');
    document.body.style.overflow = 'hidden'; // 뒷배경 스크롤 방지
  }
};

/**
 * 모바일 특화 바텀 시트를 닫습니다.
 */
window.closeMobileLeadSheet = function() {
  const overlay = document.getElementById('mobileSheetOverlay');
  const sheet = document.getElementById('mobileLeadSheet');
  
  if (overlay && sheet) {
    overlay.classList.remove('active');
    sheet.classList.remove('active');
    document.body.style.overflow = '';
  }
};


