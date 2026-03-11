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

  ['floatingForm', 'fullForm', 'fixedBarForm'].forEach(formId => {
    const form = document.getElementById(formId);
    if (form) bindStandardForm(form);
  });
}

function bindStandardForm(form) {
  form.addEventListener('submit', event => {
    event.preventDefault();

    const nameInput = form.querySelector('input[name*="name"]');
    if (nameInput && !nameInput.value.trim()) {
      reportFieldError(nameInput, '이름을 입력해 주세요.');
      return;
    }

    const phoneInput = form.querySelector('input[type="tel"]');
    if (phoneInput && !validatePhone(phoneInput.value)) {
      reportFieldError(phoneInput, '휴대폰 번호를 정확히 입력해 주세요.');
      return;
    }

    const typeSelect = form.querySelector('select[name*="propertyType"], select[name="loanType"]');
    if (typeSelect && !typeSelect.value) {
      reportFieldError(typeSelect, '대출 상품을 선택해 주세요.');
      return;
    }

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

function initFloatingFormVisibility() {
  const floatingFormContainer = document.querySelector('.floating-form-container');
  const heroSection = document.getElementById('hero');

  if (!floatingFormContainer || !heroSection) return;

  window.addEventListener('scroll', () => {
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    floatingFormContainer.classList.toggle('visible', heroBottom < 200);
  }, { passive: true });
}

function initFixedBottomBar() {
  const fixedBottomBar = document.getElementById('fixedBottomBar');
  const heroSection = document.getElementById('hero');
  const finalCTA = document.getElementById('finalCTA');

  if (!fixedBottomBar || !heroSection) return;

  window.addEventListener('scroll', () => {
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    const ctaTop = finalCTA ? finalCTA.getBoundingClientRect().top : Number.POSITIVE_INFINITY;
    const shouldShow = heroBottom < 0 && ctaTop > window.innerHeight;

    fixedBottomBar.classList.toggle('visible', shouldShow);
  }, { passive: true });
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

function initCtaRollers() {
  const dateEl = document.getElementById('ctaDate');
  if (dateEl) {
    const now = new Date();
    const pad = value => `0${value}`.slice(-2);
    dateEl.textContent = `${now.getFullYear()}년 ${pad(now.getMonth() + 1)}월 ${pad(now.getDate())}일 기준`;
  }

  const countEl = document.getElementById('ctaCount');
  if (countEl) {
    const base = 14600;
    const variation = Math.floor(Math.random() * 50);
    let currentCount = base + variation;
    countEl.textContent = currentCount.toLocaleString();

    const animateCount = () => {
      countEl.style.transition = 'transform 0.3s ease';
      countEl.style.transform = 'scale(1.05)';
      setTimeout(() => {
        countEl.style.transform = 'scale(1)';
      }, 300);
    };

    window.incrementCtaCounter = () => {
      currentCount += 1;
      countEl.textContent = currentCount.toLocaleString();
      animateCount();
    };

    const autoIncrement = () => {
      const delay = 3000 + Math.floor(Math.random() * 5000);
      setTimeout(() => {
        window.incrementCtaCounter();
        autoIncrement();
      }, delay);
    };

    autoIncrement();
  }

  const rollers = [
    { selector: '.cta-swiper-1', delay: 1800 },
    { selector: '.cta-swiper-2', delay: 2200 },
    { selector: '.cta-swiper-3', delay: 2500 }
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

    items.forEach(item => {
      item.style.height = '36px';
      item.style.lineHeight = '36px';
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

  const animateCounter = element => {
    const target = parseFloat(element.dataset.target);
    const decimal = parseInt(element.dataset.decimal || '0', 10);
    const duration = 2000;
    const startTime = performance.now();

    const easeOutQuart = progress => 1 - Math.pow(1 - progress, 4);

    const step = currentTime => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
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

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.3 });

  counters.forEach(counter => observer.observe(counter));
}

function injectSuccessToast() {
  if (document.querySelector('.form-success-overlay')) return;

  const overlay = document.createElement('div');
  overlay.className = 'form-success-overlay';
  overlay.addEventListener('click', hideSuccessToast);

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

function showSuccessToast() {
  const overlay = document.querySelector('.form-success-overlay');
  const toast = document.querySelector('.form-success-toast');
  if (!overlay || !toast) return;

  overlay.classList.add('show');
  toast.classList.add('show');

  setTimeout(() => hideSuccessToast(), 3000);
}

function hideSuccessToast() {
  const overlay = document.querySelector('.form-success-overlay');
  const toast = document.querySelector('.form-success-toast');
  if (overlay) overlay.classList.remove('show');
  if (toast) toast.classList.remove('show');
}

