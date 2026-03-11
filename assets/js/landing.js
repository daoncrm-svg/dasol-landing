/**
 * @fileoverview 다솔대부중개 랜딩페이지 인터랙션 및 UI 로직
 * @description Swiper 슬라이더, 대출 시뮬레이터, FAQ 아코디언, 폼 유효성 검증,
 *              스크롤 기반 노출 제어, 네비게이션 추적 등 랜딩페이지 전체 기능을 관리합니다.
 */

document.addEventListener('DOMContentLoaded', () => {
  initSwiper();
  initCtaRollers();
  initLoanSimulator();
  initFaq();
  initFadeIn();
  initForms();
  initFloatingFormVisibility();
  initFixedBottomBar();
  initNavTracking();
  initSmoothScroll();
  initTrustNumbers();
  injectSuccessToast();
});

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
  document.querySelectorAll('input[type="tel"]').forEach((/** @type {HTMLInputElement} */ input) => {
    input.addEventListener('input', () => formatPhone(input));
  });

  /** @type {string[]} */
  const formIds = ['floatingForm', 'fullForm', 'fixedBarForm'];
  formIds.forEach((/** @type {string} */ formId) => {
    /** @type {HTMLFormElement | null} */
    const form = document.getElementById(formId);
    if (form) bindStandardForm(form);
  });
}

/**
 * 폼에 유효성 검증 및 제출 처리 로직을 바인딩합니다.
 * 성공 시 인라인 토스트 UI를 표시하고 CTA 카운터를 증가시킵니다.
 * @param {HTMLFormElement} form - 바인딩할 폼 요소
 * @returns {void}
 */
function bindStandardForm(form) {
  form.addEventListener('submit', (/** @type {SubmitEvent} */ event) => {
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
      reportFieldError(phoneInput, '휴대폰 번호를 정확히 입력해 주세요.');
      return;
    }

    /** @type {HTMLSelectElement | null} */
    const typeSelect = form.querySelector('select[name*="propertyType"], select[name="loanType"]');
    if (typeSelect && !typeSelect.value) {
      reportFieldError(typeSelect, '대출 상품을 선택해 주세요.');
      return;
    }

    /** @type {HTMLInputElement | null} */
    const consentInput = form.querySelector('input[name="consent"], input[name="consentAll"]');
    if (consentInput && !consentInput.checked) {
      reportFieldError(consentInput, '개인정보 수집 및 이용에 동의해 주세요.');
      return;
    }

    showSuccessToast();
    if (window.incrementCtaCounter) window.incrementCtaCounter();
    form.reset();
  });
}

/**
 * 전화번호 문자열의 유효성(010/011/016/017/018/019 + 7~8자리)을 검증합니다.
 * @param {string} value - 검증할 전화번호 문자열
 * @returns {boolean} 유효하면 true, 그렇지 않으면 false
 */
function validatePhone(value) {
  return /^01[016789]\d{7,8}$/.test(value.replace(/-/g, ''));
}

/**
 * 전화번호 입력 필드에 자동 하이픈 포맷팅(000-0000-0000)을 적용합니다.
 * @param {HTMLInputElement} input - 포맷을 적용할 input 요소
 * @returns {void}
 */
function formatPhone(input) {
  /** @type {string} */
  let value = input.value.replace(/\D/g, '');

  if (value.length > 3 && value.length <= 7) {
    value = `${value.slice(0, 3)}-${value.slice(3)}`;
  } else if (value.length > 7) {
    value = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
  }

  input.value = value;
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
  if (countEl) {
    /** @type {number} */
    const base = 14600;
    /** @type {number} */
    const variation = Math.floor(Math.random() * 50);
    /** @type {number} */
    let currentCount = base + variation;
    countEl.textContent = currentCount.toLocaleString();

    /**
     * 카운터 값이 변경될 때 스케일 애니메이션을 재생합니다.
     * @returns {void}
     */
    const animateCount = () => {
      countEl.style.transition = 'transform 0.3s ease';
      countEl.style.transform = 'scale(1.05)';
      setTimeout(() => {
        countEl.style.transform = 'scale(1)';
      }, 300);
    };

    /**
     * CTA 카운터를 1 증가시키고 애니메이션을 재생합니다.
     * window 전역에 할당되어 폼 제출 시에도 호출됩니다.
     * @returns {void}
     */
    window.incrementCtaCounter = () => {
      currentCount += 1;
      countEl.textContent = currentCount.toLocaleString();
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
    /** @type {number} */
    const target = parseFloat(element.dataset.target);
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
 * 폼 제출 성공 시 표시할 토스트 UI(오버레이 + 카드)를 DOM에 주입합니다.
 * 페이지 로드 시 1회만 실행되며, 이미 존재하면 중복 생성하지 않습니다.
 * @returns {void}
 */
function injectSuccessToast() {
  if (document.querySelector('.form-success-overlay')) return;

  /** @type {HTMLDivElement} */
  const overlay = document.createElement('div');
  overlay.className = 'form-success-overlay';
  overlay.addEventListener('click', hideSuccessToast);

  /** @type {HTMLDivElement} */
  const toast = document.createElement('div');
  toast.className = 'form-success-toast';
  toast.innerHTML = `
    <div class="toast-icon">✓</div>
    <div class="toast-title">상담 신청이 접수되었습니다</div>
    <div class="toast-desc">담당 상담사가 순차적으로 연락드리겠습니다.<br>잠시만 기다려주세요.</div>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(toast);
}

/**
 * 성공 토스트 UI를 화면에 표시합니다.
 * 3초 후 자동으로 닫힙니다.
 * @returns {void}
 */
function showSuccessToast() {
  /** @type {HTMLElement | null} */
  const overlay = document.querySelector('.form-success-overlay');
  /** @type {HTMLElement | null} */
  const toast = document.querySelector('.form-success-toast');
  if (!overlay || !toast) return;

  overlay.classList.add('show');
  toast.classList.add('show');

  setTimeout(() => hideSuccessToast(), 3000);
}

/**
 * 성공 토스트 UI를 숨깁니다.
 * 오버레이 클릭이나 자동 타이머에 의해 호출됩니다.
 * @returns {void}
 */
function hideSuccessToast() {
  /** @type {HTMLElement | null} */
  const overlay = document.querySelector('.form-success-overlay');
  /** @type {HTMLElement | null} */
  const toast = document.querySelector('.form-success-toast');
  if (overlay) overlay.classList.remove('show');
  if (toast) toast.classList.remove('show');
}
