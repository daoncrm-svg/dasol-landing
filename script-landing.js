document.addEventListener('DOMContentLoaded', () => {
  hydrateHeader();
  hydrateHero();
  hydrateTrustStatsSection();

  initSwiper();
  initCtaV2();
  initLoanSimulator();
  initFaq();
  initFadeIn();
  initForms();
  initFloatingFormVisibility();
  initFixedBottomBar();
  initNavTracking();
  initSmoothScroll();
  initTrustNumbers();
});

function hydrateHeader() {
  const headerInner = document.querySelector('.header .header-inner');
  if (!headerInner) return;

  headerInner.innerHTML = `
    <a href="#hero" class="logo logo-wordmark" aria-label="다솔대부중개 홈">
      <strong class="logo-mark">다솔</strong>
      <span class="logo-sub">부동산 담보대출 비교상담</span>
    </a>
    <nav class="nav" aria-label="주요 메뉴">
      <ul class="nav-list">
        <li><a href="#hero" class="nav-link active">홈</a></li>
        <li><a href="#products" class="nav-link">주택담보대출</a></li>
        <li><a href="#info" class="nav-link">조건안내</a></li>
        <li><a href="#step" class="nav-link">진행절차</a></li>
        <li><a href="#simulator" class="nav-link">한도계산</a></li>
        <li><a href="#finalCTA" class="nav-link">상담신청</a></li>
      </ul>
    </nav>
    <div class="header-cta">
      <a href="tel:1533-9817" class="header-phone-pill">1533-9817</a>
    </div>
  `;
}

function hydrateHero() {
  const heroSection = document.getElementById('hero');
  if (!heroSection) return;

  heroSection.innerHTML = `
    <div class="container hero-inner hero-shell">
      <div class="hero-content fade-in visible">
        <p class="hero-kicker"><span style="color:#3182F6">다 솔</span>루션이 있다</p>
        <h1 class="hero-title">
          1금융 거절이요?<br>
          <span class="highlight">다시 한번 알아보세요.</span>
        </h1>
        <p class="hero-sub">
          한도 부족, 기존 대출 과다, 신용점수 부족 —<br>
          2금융 전문 상담으로 방법을 찾아드립니다.
        </p>
        <div class="hero-rail" aria-label="주요 강점">
          <span class="hero-rail-item">무료 한도 진단</span>
          <span class="hero-rail-item">대환 여부 확인</span>
          <span class="hero-rail-item">추가자금 상담</span>
        </div>
      </div>

      <div class="hero-stage fade-in visible" aria-hidden="true">
        <div class="hero-stage-word">다솔</div>
        <div class="hero-stage-card hero-stage-card-top">
          <strong>최저 연 4.3%부터</strong>
          <span>현재 조건 기준으로 비교 상담</span>
        </div>
        <div class="hero-stage-card hero-stage-card-bottom">
          <strong>대환 가능 여부 먼저 진단</strong>
          <span>기존 대출 구조와 추가 한도까지 확인</span>
        </div>
        <img src="./img/hero_man_nobg.png" alt="다솔 상담 전문가" class="hero-figure">
      </div>
    </div>
  `;
}

function hydrateTrustStatsSection() {
  const trustContainer = document.querySelector('.trust-stats .container');
  if (!trustContainer) return;

  trustContainer.innerHTML = `
    <div class="trust-intro">
      <p class="trust-kicker">지금 많이 찾는 담보대출</p>
      <h2 class="trust-section-title">
        목적에 맞는 상품부터<br>
        <span>빠르게 고르세요</span>
      </h2>
    </div>
    <div class="trust-grid">
      <a href="#products" class="trust-card product-link">
        <img src="./img/house.png" alt="주택 담보대출" class="trust-visual" width="112" height="112">
        <div class="trust-label">실거주 · 생활안정자금</div>
        <div class="trust-title">주택 담보대출</div>
        <div class="trust-emphasis">최저 연 4.3%부터</div>
        <p class="trust-card-copy">주택 구입, 갈아타기, 추가 자금까지 기본 조건부터 먼저 비교합니다.</p>
      </a>
      <a href="#products" class="trust-card product-link">
        <img src="./img/apartment.png" alt="아파트 담보대출" class="trust-visual" width="112" height="112">
        <div class="trust-label">시세 반영 · 대환 검토</div>
        <div class="trust-title">아파트 담보대출</div>
        <div class="trust-emphasis">LTV 최대 80%</div>
        <p class="trust-card-copy">시세 기준 한도 여력과 갈아타기 가능성을 빠르게 정리해드립니다.</p>
      </a>
      <a href="#products" class="trust-card product-link">
        <img src="./img/extra.png" alt="사업자 담보대출" class="trust-visual" width="112" height="112">
        <div class="trust-label">추가자금 · 운영자금</div>
        <div class="trust-title">사업자 담보대출</div>
        <div class="trust-emphasis">맞춤 구조 상담</div>
        <p class="trust-card-copy">사업 흐름과 자금 목적에 맞춰 추가 한도와 대환 구조를 함께 봅니다.</p>
      </a>
    </div>
  `;
}

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

function initLoanSimulator() {
  const amountSlider = document.getElementById('simAmount');
  const rateSlider = document.getElementById('simRate');
  const amountVal = document.getElementById('simAmountVal');
  const rateVal = document.getElementById('simRateVal');
  const monthlyResult = document.getElementById('monthlyPayment');

  if (!amountSlider || !rateSlider || !amountVal || !rateVal || !monthlyResult) return;

  const updateSliderBg = slider => {
    const pct = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.background = `linear-gradient(90deg, var(--toss-blue) ${pct}%, #E5E8EB ${pct}%)`;
  };

  const calcMonthly = () => {
    const principal = parseInt(amountSlider.value, 10) * 10000;
    const rate = parseFloat(rateSlider.value) / 100 / 12;
    const months = 360;
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

function initFaq() {
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.parentElement;
      const answer = item?.querySelector('.faq-answer');
      const isOpen = item?.classList.contains('open');

      document.querySelectorAll('.faq-item').forEach(faqItem => {
        faqItem.classList.remove('open');
        const faqAnswer = faqItem.querySelector('.faq-answer');
        if (faqAnswer) faqAnswer.style.maxHeight = '0';
      });

      if (!isOpen && item && answer) {
        item.classList.add('open');
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });
}

function initFadeIn() {
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(element => fadeObserver.observe(element));
  document.querySelectorAll('.hero-content, .hero-stage').forEach(element => element.classList.add('visible'));
}

function initForms() {
  document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', () => formatPhone(input));
  });

  const quickForm = document.getElementById('quickForm');
  if (quickForm) {
    quickForm.addEventListener('submit', event => {
      event.preventDefault();

      const nameInput = quickForm.querySelector('input[name="name"]');
      const phoneInput = quickForm.querySelector('input[name="phone"]');
      const typeSelect = quickForm.querySelector('select[name="propertyType"]');
      const consentInput = quickForm.querySelector('input[name="consent"]');

      if (nameInput && !nameInput.value.trim()) {
        nameInput.focus();
        return;
      }

      if (phoneInput && !validatePhone(phoneInput.value)) {
        phoneInput.focus();
        return;
      }

      if (typeSelect && !typeSelect.value) {
        typeSelect.focus();
        return;
      }

      if (consentInput && !consentInput.checked) {
        alert('개인정보 수집 및 이용에 동의해 주세요.');
        return;
      }

      alert('상담 신청이 접수되었습니다.\n담당 상담사가 순차적으로 연락드립니다.');
      quickForm.reset();
      if (consentInput) consentInput.checked = true;
    });
  }

  const floatingForm = document.getElementById('floatingForm');
  if (floatingForm) bindStandardForm(floatingForm);

  const fullForm = document.getElementById('fullForm');
  if (fullForm) bindStandardForm(fullForm);

  const fixedBarForm = document.getElementById('fixedBarForm');
  if (fixedBarForm) {
    fixedBarForm.addEventListener('submit', event => {
      event.preventDefault();

      const nameInput = fixedBarForm.querySelector('input[name="name"]');
      const phoneInput = fixedBarForm.querySelector('input[name="phone"]');
      const typeSelect = fixedBarForm.querySelector('select[name="loanType"]');
      const consentInput = fixedBarForm.querySelector('input[name="consent"]');

      if (nameInput && !nameInput.value.trim()) {
        nameInput.focus();
        return;
      }

      if (phoneInput && !validatePhone(phoneInput.value)) {
        phoneInput.focus();
        return;
      }

      if (typeSelect && !typeSelect.value) {
        typeSelect.focus();
        return;
      }

      if (consentInput && !consentInput.checked) {
        alert('개인정보 수집 및 이용에 동의해 주세요.');
        return;
      }

      alert('상담 신청이 접수되었습니다.\n담당 상담사가 순차적으로 연락드립니다.');
      fixedBarForm.reset();
    });
  }
}

function bindStandardForm(form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    clearErr(form);

    let isValid = true;

    const nameInput = form.querySelector('input[name*="name"]');
    if (nameInput && !nameInput.value.trim()) {
      const group = nameInput.closest('.form-group');
      if (group) showErr(group, '이름을 입력해 주세요.');
      isValid = false;
    }

    const phoneInput = form.querySelector('input[type="tel"]');
    if (phoneInput && !validatePhone(phoneInput.value)) {
      const group = phoneInput.closest('.form-group');
      if (group) showErr(group, '휴대폰 번호를 정확히 입력해 주세요.');
      isValid = false;
    }

    const typeSelect = form.querySelector('select[name*="propertyType"]');
    if (typeSelect && !typeSelect.value) {
      const group = typeSelect.closest('.form-group');
      if (group) showErr(group, '대출 상품을 선택해 주세요.');
      isValid = false;
    }

    const consentInput = form.querySelector('input[name="consent"]');
    if (consentInput && !consentInput.checked) {
      alert('개인정보 수집 및 이용에 동의해 주세요.');
      isValid = false;
    }

    if (!isValid) return;

    alert('상담 신청이 접수되었습니다.\n담당 상담사가 순차적으로 연락드립니다.');
    if (window.incrementCtaCounter) window.incrementCtaCounter();
    form.reset();
  });
}

function validatePhone(value) {
  return /^01[016789]\d{7,8}$/.test(value.replace(/-/g, ''));
}

function formatPhone(input) {
  let value = input.value.replace(/\D/g, '');

  if (value.length > 3 && value.length <= 7) {
    value = `${value.slice(0, 3)}-${value.slice(3)}`;
  } else if (value.length > 7) {
    value = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
  }

  input.value = value;
}

function showErr(group, message) {
  group.classList.add('has-error');
  const errorMessage = group.querySelector('.error-msg');
  if (errorMessage) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
  }
}

function clearErr(form) {
  form.querySelectorAll('.form-group').forEach(group => {
    group.classList.remove('has-error');
    const errorMessage = group.querySelector('.error-msg');
    if (errorMessage) errorMessage.style.display = 'none';
  });
}

function initFloatingFormVisibility() {
  const floatingFormContainer = document.querySelector('.floating-form-container');
  const heroSection = document.getElementById('hero');

  if (!floatingFormContainer || !heroSection) return;

  window.addEventListener('scroll', () => {
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    if (heroBottom < 200) {
      floatingFormContainer.classList.add('visible');
    } else {
      floatingFormContainer.classList.remove('visible');
    }
  });
}

function initFixedBottomBar() {
  const fixedBottomBar = document.getElementById('fixedBottomBar');
  const heroSection = document.getElementById('hero');
  const finalCTA = document.getElementById('finalCTA');

  if (!fixedBottomBar || !heroSection) return;

  window.addEventListener('scroll', () => {
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    const ctaTop = finalCTA ? finalCTA.getBoundingClientRect().top : Number.POSITIVE_INFINITY;

    if (heroBottom < 0 && ctaTop > window.innerHeight) {
      fixedBottomBar.classList.add('visible');
    } else {
      fixedBottomBar.classList.remove('visible');
    }
  });
}

function initNavTracking() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const header = document.querySelector('.header');
  const headerOffset = header ? header.offsetHeight : 72;

  if (!navLinks.length || !sections.length) return;

  const scrollObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const currentId = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
      });
    });
  }, {
    threshold: 0.3,
    rootMargin: `${-headerOffset}px 0px 0px 0px`
  });

  sections.forEach(section => scrollObserver.observe(section));
}

function initSmoothScroll() {
  const header = document.querySelector('.header');
  const headerOffset = header ? header.offsetHeight : 72;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });
}

function initCtaV2() {
  // 동적 날짜
  const dateEl = document.getElementById('ctaDate');
  if (dateEl) {
    const now = new Date();
    const pad = n => ('0' + n).slice(-2);
    dateEl.textContent = `${now.getFullYear()}년 ${pad(now.getMonth() + 1)}월 ${pad(now.getDate())}일 기준`;
  }

  // 카운터 (기본값 + 랜덤 변동 + 자동 누적)
  const countEl = document.getElementById('ctaCount');
  if (countEl) {
    const base = 14600;
    const variation = Math.floor(Math.random() * 50);
    let currentCount = base + variation;
    countEl.textContent = currentCount.toLocaleString();

    // 숫자 변경 시 펄스 애니메이션
    function animateCount() {
      countEl.style.transition = 'transform 0.3s ease';
      countEl.style.transform = 'scale(1.05)';
      setTimeout(() => {
        countEl.style.transform = 'scale(1)';
      }, 300);
    }

    // 카운터 +1 증가 함수 (외부에서 호출 가능)
    window.incrementCtaCounter = function() {
      currentCount += 1;
      countEl.textContent = currentCount.toLocaleString();
      animateCount();
    };

    // 3~8초 랜덤 간격으로 자동 +1 누적
    function autoIncrement() {
      const delay = 3000 + Math.floor(Math.random() * 5000);
      setTimeout(() => {
        window.incrementCtaCounter();
        autoIncrement();
      }, delay);
    }
    autoIncrement();
  }

  // 순수 JS 세로 롤링 (Swiper vertical 높이 버그 우회)
  const rollers = [
    { selector: '.cta-swiper-1', delay: 1800 },
    { selector: '.cta-swiper-2', delay: 2200 },
    { selector: '.cta-swiper-3', delay: 2500 },
  ];

  rollers.forEach(({ selector, delay }) => {
    const container = document.querySelector(selector);
    if (!container) return;

    const track = container.querySelector('.cta-roller-track');
    const items = container.querySelectorAll('.cta-roller-item');
    if (!track || !items.length) return;

    container.style.height = '36px';
    container.style.overflow = 'hidden';
    track.style.transition = 'transform 0.5s ease';

    items.forEach(s => {
      s.style.height = '36px';
      s.style.lineHeight = '36px';
    });

    let currentIndex = 0;
    setInterval(() => {
      currentIndex = (currentIndex + 1) % items.length;
      track.style.transform = `translateY(-${currentIndex * 36}px)`;
    }, delay);
  });
}

function initTrustNumbers() {
  const counters = document.querySelectorAll('.trust-number-value');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.target);
    const decimal = parseInt(el.dataset.decimal) || 0;
    const duration = 2000;
    const startTime = performance.now();

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const current = easedProgress * target;

      if (decimal > 0) {
        el.textContent = current.toFixed(decimal);
      } else {
        el.textContent = Math.floor(current).toLocaleString();
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        if (decimal > 0) {
          el.textContent = target.toFixed(decimal);
        } else {
          el.textContent = target.toLocaleString();
        }
      }
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach((counter) => observer.observe(counter));
}
