// ===========================
// スクロールアニメーション
// ===========================
document.addEventListener('DOMContentLoaded', function () {
  // fade-in クラスを付与する対象
  const targets = document.querySelectorAll(
    '.worry-card, .skill-item, .strength-card, .gallery-item, .visit-feature, .action-step, .req-table-wrap, .form-card'
  );

  targets.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 60 * (Array.from(targets).indexOf(entry.target) % 6));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => observer.observe(el));

  // ===========================
  // フォーム送信（デモ）
  // ===========================
  function handleFormSubmit(formId, successMsg) {
    const form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = '送信中...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = '✓ ' + successMsg;
        btn.style.background = '#4caf82';
        btn.disabled = false;
        form.reset();
        setTimeout(() => {
          btn.textContent = successMsg.includes('予約') ? '見学を予約する' : '送信する';
          btn.style.background = '';
        }, 4000);
      }, 1000);
    });
  }

  handleFormSubmit('visit-form', '見学予約を受け付けました！');
  handleFormSubmit('contact-form', 'お問い合わせを受け付けました！');

  // ===========================
  // スムーズスクロール（ヘッダー高さ考慮）
  // ===========================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const headerH = document.querySelector('.site-header')?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ===========================
  // ヘッダーのスクロール効果
  // ===========================
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
    } else {
      header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
    }
  });
});
