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
  injectResultToast();
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

  document.querySelectorAll('form').forEach((/** @type {HTMLFormElement} */ form) => {
    bindStandardForm(form);
  });
}

/**
 * 클라이언트의 IP 주소를 비동기로 가져옵니다.
 * @returns {Promise<string>}
 */
async function getClientIp() {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    return data.ip;
  } catch (e) {
    return 'IP fetch failed';
  }
}

/**
 * 폼에 유효성 검증 및 제출 처리 로직을 바인딩합니다.
 * 성공 시 Supabase 리드 테이블에 입력 값을 Insert 하고 토스트 UI를 표시합니다.
 * @param {HTMLFormElement} form - 바인딩할 폼 요소
 * @returns {void}
 */
function bindStandardForm(form) {
  form.addEventListener('submit', async (/** @type {SubmitEvent} */ event) => {
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

    /** @type {HTMLButtonElement | null} */
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerText : '무료 상담 신청 ❯';
    if (submitBtn) {
      submitBtn.innerText = '신청 중...';
      submitBtn.disabled = true;
    }

    showResultToast('loading', '신청 접수 중', '서버로 데이터를 안전하게 전송하고 있습니다.<br>잠시만 기다려주세요.');

    try {
      const ip = await getClientIp();
      const typeText = typeSelect && typeSelect.selectedIndex >= 0 ? typeSelect.options[typeSelect.selectedIndex].text : '';
      
      const payload = {
        name: nameInput ? nameInput.value.trim() : '',
        phone: phoneInput ? phoneInput.value.trim() : '',
        source: '이벤트페이지',
        status: 'New',
        inquiry_form: typeText,
        created_at: new Date(new Date().getTime() + 9 * 60 * 60 * 1000).toISOString().replace('Z', '+09:00')
      };

      const { error } = await window.supabaseClient.from('lead').insert([payload]);

      // 웹훅 전송용 페이로드: n8n/Zapier 요구사항에 맞춰 Form 데이터로 변환 (각각의 변수로 폼 구성)
      const formData = new FormData();
      formData.append('name', payload.name);
      formData.append('phone', payload.phone);
      formData.append('source', payload.source);
      formData.append('status', payload.status);
      formData.append('inquiry_form', payload.inquiry_form);
      formData.append('created_at', payload.created_at);
      formData.append('sort', typeText);
      formData.append('ip', ip);

      // n8n / Zapier 등 외부 웹훅 전송 (에러가 나도 메인 로직에는 영향 없도록 catch 처리)
      try {
        const webhookUrl = 'https://daon1019.com/webhook/addscapcokr';
        
        // FormData를 사용하면 브라우저가 자동으로 multipart/form-data 헤더를 세팅하며 CORS Preflight도 발생하지 않음
        await fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          body: formData
        });
      } catch (webhookErr) {
        console.error('Webhook Error:', webhookErr);
      }

      if (error) {
        console.error('Supabase Insert Error:', error);
        showResultToast('error', '접수 실패', '앗, 데이터베이스 연결 중 지연이 발생했습니다.<br>다시 한번 시도해 주시거나 전화 상담을 이용해주세요.');
      } else {
        showResultToast('success', '상담 신청 완료', '성공적으로 접수되었습니다.<br>담당 상담사가 확인 후 순차적으로 연락을 도와드리겠습니다.');
        if (window.incrementCtaCounter) window.incrementCtaCounter();
        form.reset();
      }
    } catch (err) {
      console.error('Unexpected Form Submit Error:', err);
      showResultToast('error', '예기치 않은 오류', '일시적인 서버 문제가 발생했습니다.<br>1866-1019로 연락주시면 바로 안내 도와드리겠습니다.');
    } finally {
      if (submitBtn) {
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
      }
    }
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
  // 1) 사용자가 입력한 전체 문자열에서 숫자만 추출
  let rawValue = input.value.replace(/\D/g, '');

  // 2) 010 패턴 강제화 (첫 3자리가 '010'이 아니면 무조건 '010' 먼저 씌움)
  if (!rawValue.startsWith('010')) {
    rawValue = '010' + rawValue;
  }

  // 3) 앞의 '010' 3자리를 제외한 실질적인 입력 '나머지 숫자' 추출
  let restValue = rawValue.substring(3);

  /** @type {string} */
  let value = '010';

  // 4) 길이에 따른 하이픈(-) 포맷팅 완성 (0~4자리, 5~8자리) - 010 제외하고 최대 8자리
  if (restValue.length > 0 && restValue.length <= 4) {
    value += `-${restValue}`;
  } else if (restValue.length > 4) {
    // 최대 8자리까지만 자름
    value += `-${restValue.slice(0, 4)}-${restValue.slice(4, 8)}`;
  } else {
    value += `-`; // 숫자가 없으면 기본 010- 유지
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
