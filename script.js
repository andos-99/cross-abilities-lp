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
  // Web3Forms フォーム送信処理
  // ===========================
  function handleWeb3Form(formId, resultId, submitBtnId, successText) {
    const form = document.getElementById(formId);
    const resultDiv = document.getElementById(resultId);
    const submitBtn = document.getElementById(submitBtnId);
    if (!form) return;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      // ボタンを送信中に変更
      submitBtn.textContent = '送信中...';
      submitBtn.disabled = true;
      resultDiv.style.display = 'none';
      resultDiv.className = 'form-result';

      const formData = new FormData(form);
      const object = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });
      const json = JSON.stringify(object);

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: json
        });

        const result = await response.json();

        if (result.success) {
          // 送信成功
          resultDiv.textContent = '✓ ' + successText;
          resultDiv.classList.add('form-result-success');
          resultDiv.style.display = 'block';
          submitBtn.textContent = '✓ 送信完了';
          submitBtn.style.background = '#4caf82';
          form.reset();
          setTimeout(() => {
            submitBtn.textContent = formId === 'visit-form' ? '見学を予約する' : '送信する';
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            resultDiv.style.display = 'none';
          }, 5000);
        } else {
          // 送信失敗
          resultDiv.textContent = '送信に失敗しました。お電話（092-791-7656）にてお問い合わせください。';
          resultDiv.classList.add('form-result-error');
          resultDiv.style.display = 'block';
          submitBtn.textContent = formId === 'visit-form' ? '見学を予約する' : '送信する';
          submitBtn.disabled = false;
        }
      } catch (error) {
        resultDiv.textContent = '通信エラーが発生しました。お電話（092-791-7656）にてお問い合わせください。';
        resultDiv.classList.add('form-result-error');
        resultDiv.style.display = 'block';
        submitBtn.textContent = formId === 'visit-form' ? '見学を予約する' : '送信する';
        submitBtn.disabled = false;
      }
    });
  }

  handleWeb3Form('visit-form', 'visit-result', 'visit-submit-btn', '見学予約を受け付けました！担当者よりご連絡いたします。');
  handleWeb3Form('contact-form', 'contact-result', 'contact-submit-btn', 'お問い合わせを受け付けました！担当者よりご連絡いたします。');

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
