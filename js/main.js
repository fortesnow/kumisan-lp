// FAQのアコーディオン機能
document.addEventListener('DOMContentLoaded', function() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentNode;
      item.classList.toggle('active');
    });
  });

  // フォーム送信のトラッキング
  const form = document.querySelector('#lead-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      if (typeof gtag === 'function') {
        gtag('event', 'form_submission', {
          'event_category': 'lead_form',
          'event_label': 'LP申し込み'
        });
      }
    });
  }

  // CTAボタンのトラッキング
  const ctaButtons = document.querySelectorAll('.btn-primary');
  ctaButtons.forEach(button => {
    button.addEventListener('click', function() {
      if (typeof gtag === 'function') {
        gtag('event', 'click', {
          'event_category': 'cta',
          'event_label': this.innerText
        });
      }
    });
  });

  // シラバスダウンロードのトラッキング
  const syllabusLink = document.querySelector('[data-syllabus]');
  if (syllabusLink) {
    syllabusLink.addEventListener('click', function() {
      if (typeof gtag === 'function') {
        gtag('event', 'file_download', {
          'event_category': 'syllabus',
          'event_label': 'シラバスPDF'
        });
      }
    });
  }
}); 