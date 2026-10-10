/**
 * Ruan's Traditional Chinese Herbalist theme
 * Mobile menu, scroll-reveal, testimonial carousel(s), language toggle,
 * and accessibility widget.
 *
 * Content sections are now built from custom blocks, so the language
 * toggle reads each element's own data-en attribute (rendered by the
 * block's render.php) instead of a fixed dictionary keyed by hardcoded
 * ids. Only the persistent chrome (nav, footer, skip link, disclaimer,
 * accessibility widget) still uses a small fixed dictionary below, since
 * that markup lives in header.php/footer.php rather than in a block.
 */
document.addEventListener('DOMContentLoaded', function () {

  // mobile menu
  const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  toggle.addEventListener('click', () => links.classList.toggle('open'));

  // in-page nav links: close mobile menu + scroll target section into vertical center
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      links.classList.remove('open');
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  // reveal-on-scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in');
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.add('reveal-pending');
    observer.observe(el);
  });

  // testimonial carousel(s) - supports any number of Testimonials blocks on a page
  const carousels = [];
  document.querySelectorAll('.testi-carousel').forEach(carousel => {
    const track = carousel.querySelector('.testi-track');
    const prevBtn = carousel.querySelector('.testi-prev');
    const nextBtn = carousel.querySelector('.testi-next');
    const viewport = carousel.querySelector('.testi-viewport');
    if (!track || !prevBtn || !nextBtn || !viewport) return;

    const state = { track, prevBtn, nextBtn, viewport, index: 0 };
    carousels.push(state);

    function getVisibleCount() {
      const w = viewport.offsetWidth;
      if (w < 640) return 1;
      if (w < 900) return 2;
      return 3;
    }

    function update() {
      const cards = track.children;
      if (!cards.length) return;
      const visible = getVisibleCount();
      const maxIndex = Math.max(0, cards.length - visible);
      if (state.index > maxIndex) state.index = maxIndex;
      const cardWidth = cards[0].getBoundingClientRect().width;
      const gap = 22;
      track.style.transform = `translateX(-${state.index * (cardWidth + gap)}px)`;
    }
    state.update = update;

    nextBtn.addEventListener('click', () => {
      const visible = getVisibleCount();
      const maxIndex = Math.max(0, track.children.length - visible);
      state.index = state.index >= maxIndex ? 0 : state.index + 1;
      update();
    });
    prevBtn.addEventListener('click', () => {
      const visible = getVisibleCount();
      const maxIndex = Math.max(0, track.children.length - visible);
      state.index = state.index <= 0 ? maxIndex : state.index - 1;
      update();
    });

    update();
  });
  window.addEventListener('resize', () => carousels.forEach(c => c.update()));
  window.addEventListener('load', () => carousels.forEach(c => c.update()));

  // content protection for blog articles (deters casual copy/paste and
  // right-click save; not a real security measure - view-source, dev
  // tools, and screenshots always bypass client-side protections like this)
  document.querySelectorAll('#blog, .single-post').forEach(section => {
    section.addEventListener('copy', (e) => e.preventDefault());
    section.addEventListener('cut', (e) => e.preventDefault());
    section.addEventListener('contextmenu', (e) => e.preventDefault());
    section.querySelectorAll('img').forEach(img => {
      img.setAttribute('draggable', 'false');
      img.addEventListener('dragstart', (e) => e.preventDefault());
    });
  });

  // accessibility widget
  (function () {
    const toggleBtn = document.getElementById('a11yToggle');
    const panel = document.getElementById('a11yPanel');
    const closeBtn = document.getElementById('a11yClose');
    const htmlEl2 = document.documentElement;
    const fsLevels = ['', 'a11y-fs2', 'a11y-fs3', 'a11y-fs4'];
    let fsIndex = 0;

    function openPanel() {
      panel.hidden = false;
      toggleBtn.setAttribute('aria-expanded', 'true');
      closeBtn.focus();
    }
    function closePanel() {
      panel.hidden = true;
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
    toggleBtn.addEventListener('click', () => {
      panel.hidden ? openPanel() : closePanel();
    });
    closeBtn.addEventListener('click', () => { closePanel(); toggleBtn.focus(); });
    document.addEventListener('click', (e) => {
      if (!panel.hidden && !panel.contains(e.target) && e.target !== toggleBtn && !toggleBtn.contains(e.target)) {
        closePanel();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !panel.hidden) { closePanel(); toggleBtn.focus(); }
    });

    function applyFontSize() {
      fsLevels.forEach(c => { if (c) htmlEl2.classList.remove(c); });
      if (fsLevels[fsIndex]) htmlEl2.classList.add(fsLevels[fsIndex]);
    }
    document.getElementById('a11yFontUp').addEventListener('click', () => {
      fsIndex = Math.min(fsIndex + 1, fsLevels.length - 1);
      applyFontSize();
    });
    document.getElementById('a11yFontDown').addEventListener('click', () => {
      fsIndex = Math.max(fsIndex - 1, 0);
      applyFontSize();
    });
    document.getElementById('a11yFontReset').addEventListener('click', () => {
      fsIndex = 0;
      applyFontSize();
    });

    function bindSwitch(id, cls) {
      const btn = document.getElementById(id);
      btn.addEventListener('click', () => {
        const checked = btn.getAttribute('aria-checked') === 'true';
        btn.setAttribute('aria-checked', String(!checked));
        htmlEl2.classList.toggle(cls, !checked);
      });
    }
    bindSwitch('a11yContrast', 'a11y-contrast');
    bindSwitch('a11yUnderline', 'a11y-underline');
    bindSwitch('a11yMotion', 'a11y-reduce-motion');

    document.getElementById('a11yReset').addEventListener('click', () => {
      fsIndex = 0; applyFontSize();
      ['a11yContrast', 'a11yUnderline', 'a11yMotion'].forEach(id => {
        document.getElementById(id).setAttribute('aria-checked', 'false');
      });
      htmlEl2.classList.remove('a11y-contrast', 'a11y-underline', 'a11y-reduce-motion');
    });
  })();

  // language toggle
  //
  // Two sources of English text:
  // 1. Fixed chrome (nav, footer, skip link, disclaimer, a11y widget) -
  //    a small dictionary below, keyed by element id, since that markup
  //    lives in header.php/footer.php and never changes per-page.
  // 2. Block content (Hero, About, Testimonials, etc.) - each element
  //    carries its own data-en="..." attribute rendered by the block's
  //    render.php from that block's English field, so this works no
  //    matter how the admin edits, reorders, or duplicates blocks.
  const translations = {
    'brand-sub': 'Dr. Ruan Bin',
    'nav-about': 'About',
    'nav-services': 'Services',
    'nav-approach': 'Approach',
    'nav-contact': 'Contact',
    'nav-blog': { en: 'Blog', es: 'Blog', vi: 'Blog' },
    'nav-shop': { en: 'Shop for Herbs', es: 'Comprar Hierbas', vi: 'Mua thảo dược' },
    'nav-book-btn': { en: 'Book Now', es: 'Reservar Ahora', vi: 'Đặt lịch ngay' },
    'foot-sub': { en: 'Traditional Herbal Medicine', es: 'Medicina Herbal Tradicional', vi: 'Y học cổ truyền bằng thảo dược' },
    'foot-about': { en: 'About', es: 'Acerca de', vi: 'Giới thiệu' },
    'foot-services': { en: 'Services', es: 'Servicios', vi: 'Dịch vụ' },
    'foot-contact': { en: 'Contact', es: 'Contacto', vi: 'Liên hệ' },
    'disclaimer-text': {
      en: 'The content on this website is provided for general informational purposes only and is not a substitute for professional medical diagnosis, treatment, or advice, nor does it establish a doctor-patient relationship. Results from Chinese herbal medicine vary by individual constitution and are not guaranteed. Please consult a licensed physician or qualified healthcare provider for any health condition or concern, and do not rely solely on this website to make medical decisions or delay seeking care. In case of a medical emergency, call your local emergency services immediately.',
      es: 'El contenido de este sitio web se proporciona únicamente con fines informativos generales y no sustituye el diagnóstico, tratamiento o asesoramiento médico profesional, ni establece una relación médico-paciente. Los resultados de la medicina herbal china varían según la constitución individual y no están garantizados. Consulte a un médico con licencia o a un proveedor de atención médica calificado ante cualquier condición o inquietud de salud, y no se base únicamente en este sitio web para tomar decisiones médicas o retrasar la atención. En caso de emergencia médica, llame de inmediato a los servicios de emergencia locales.',
      vi: 'Nội dung trên trang web này chỉ nhằm mục đích cung cấp thông tin chung và không thay thế cho chẩn đoán, điều trị hay tư vấn y tế chuyên nghiệp, cũng không thiết lập mối quan hệ bác sĩ - bệnh nhân. Hiệu quả của thuốc Đông y tùy thuộc vào thể trạng từng người và không được đảm bảo. Vui lòng tham khảo ý kiến bác sĩ có giấy phép hoặc chuyên gia y tế đủ trình độ đối với bất kỳ tình trạng hay thắc mắc sức khỏe nào, và không chỉ dựa vào trang web này để đưa ra quyết định y tế hoặc trì hoãn việc khám chữa bệnh. Trong trường hợp khẩn cấp y tế, hãy gọi ngay dịch vụ cấp cứu tại địa phương.'
    },
    'a11y-title': { en: 'Accessibility Tools', es: 'Herramientas de Accesibilidad', vi: 'Công cụ trợ năng' },
    'a11y-fontsize-label': { en: 'Text Size', es: 'Tamaño del Texto', vi: 'Cỡ chữ' },
    'a11y-contrast-label': { en: 'High Contrast', es: 'Alto Contraste', vi: 'Độ tương phản cao' },
    'a11y-underline-label': { en: 'Underline Links', es: 'Subrayar Enlaces', vi: 'Gạch chân liên kết' },
    'a11y-motion-label': { en: 'Reduce Motion', es: 'Reducir Movimiento', vi: 'Giảm chuyển động' },
    'a11yReset': { en: 'Reset All Settings', es: 'Restablecer Todo', vi: 'Đặt lại tất cả' }
  };

  const ariaLabels = {
    'a11yToggle': { zh: '无障碍选项', en: 'Accessibility options', es: 'Opciones de accesibilidad', vi: 'Tùy chọn trợ năng' },
    'a11yClose': { zh: '关闭', en: 'Close', es: 'Cerrar', vi: 'Đóng' },
    'a11yFontDown': { zh: '缩小文字', en: 'Decrease text size', es: 'Reducir tamaño de texto', vi: 'Giảm cỡ chữ' },
    'a11yFontReset': { zh: '重设文字大小', en: 'Reset text size', es: 'Restablecer tamaño de texto', vi: 'Đặt lại cỡ chữ' },
    'a11yFontUp': { zh: '放大文字', en: 'Increase text size', es: 'Aumentar tamaño de texto', vi: 'Tăng cỡ chữ' }
  };
  const skipLink = document.getElementById('skip-link');
  const skipLinkText = {
    en: 'Skip to main content',
    es: 'Saltar al contenido principal',
    vi: 'Bỏ qua đến nội dung chính'
  };
  const htmlLangCode = { zh: 'zh-Hans', en: 'en', es: 'es', vi: 'vi' };

  let currentLang = 'zh';
  const langSelect = document.getElementById('langSelect');
  const htmlEl = document.documentElement;

  function setLanguage(lang) {
    // 1. fixed chrome, by id
    Object.keys(translations).forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      if (!el.dataset.zhOrig) el.dataset.zhOrig = el.textContent;
      if (lang === 'zh') {
        el.textContent = el.dataset.zhOrig;
      } else if (translations[id][lang]) {
        el.textContent = translations[id][lang];
      }
    });
    Object.keys(ariaLabels).forEach(id => {
      const el = document.getElementById(id);
      if (el) el.setAttribute('aria-label', ariaLabels[id][lang] || ariaLabels[id].zh);
    });

    // 2. block content: any element carrying data-en/data-es/data-vi
    // (rendered by each block's render.php from that block's own fields)
    document.querySelectorAll('[data-en]').forEach(el => {
      if (!el.dataset.zhOrig) el.dataset.zhOrig = el.textContent;
      if (lang === 'zh') {
        el.textContent = el.dataset.zhOrig;
      } else if (el.dataset[lang]) {
        el.textContent = el.dataset[lang];
      }
    });

    // 2b. testimonial carousel arrows, by data-aria-{lang}
    document.querySelectorAll('[data-aria-en]').forEach(el => {
      const val = lang === 'zh' ? el.dataset.ariaZh : el.dataset['aria' + lang.charAt(0).toUpperCase() + lang.slice(1)];
      if (val) el.setAttribute('aria-label', val);
    });

    if (skipLink) skipLink.textContent = lang === 'zh' ? '跳至主要内容' : skipLinkText[lang];
    const searchInputEl = document.getElementById('blogSearchInput');
    if (searchInputEl) {
      const placeholders = {
        en: 'Search articles…',
        es: 'Buscar artículos…',
        vi: 'Tìm kiếm bài viết…'
      };
      searchInputEl.placeholder = lang === 'zh' ? '搜索文章…' : placeholders[lang];
    }
    currentLang = lang;
    langSelect.value = lang;
    htmlEl.setAttribute('lang', htmlLangCode[lang]);
    carousels.forEach(c => c.update());
  }

  langSelect.addEventListener('change', (e) => setLanguage(e.target.value));
});
