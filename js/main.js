// FAQのアコーディオン機能
document.addEventListener('DOMContentLoaded', function() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
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

  // ヘッダーの縮小効果
  const header = document.querySelector('header');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
    
    lastScrollTop = scrollTop;
  });

  // スムーススクロール
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const topOffset = targetElement.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: topOffset,
          behavior: 'smooth'
        });
      }
    });
  });

  // 受講生の声カルーセル
  const slider = document.querySelector('.testimonials-slider');
  const navDots = document.querySelectorAll('.nav-dot');
  
  if (slider && navDots.length > 0) {
    navDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        // アクティブクラスのリセット
        navDots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        
        // カードの幅を取得
        const cardWidth = slider.querySelector('.testimonial-card').offsetWidth;
        const gap = 24; // gap: 1.5rem = 24px
        
        // スクロール位置の計算
        const scrollPosition = index * (cardWidth + gap);
        
        // スムーススクロール
        slider.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      });
    });
    
    // スクロール時にナビゲーションドットを更新
    slider.addEventListener('scroll', () => {
      const scrollPosition = slider.scrollLeft;
      const cardWidth = slider.querySelector('.testimonial-card').offsetWidth;
      const gap = 24;
      
      const activeIndex = Math.round(scrollPosition / (cardWidth + gap));
      
      navDots.forEach((dot, index) => {
        if (index === activeIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    });
  }
  
  // カウントアップアニメーション
  const countElements = document.querySelectorAll('.count-up');
  
  function animateCountUp(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2秒
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
      current += step;
      
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }
  
  // Intersection Observerを使用して要素が表示されたらアニメーションを開始
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('count-up')) {
          animateCountUp(entry.target);
        } else if (entry.target.classList.contains('fade-in')) {
          entry.target.classList.add('visible');
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  // カウントアップ要素を監視
  countElements.forEach(element => {
    observer.observe(element);
  });
  
  // フェードイン要素を監視
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(element => {
    observer.observe(element);
  });
  
  // CTAボタンのマイクロアニメーション
  ctaButtons.forEach(btn => {
    btn.addEventListener('mouseover', () => {
      btn.classList.add('pulse');
    });
    
    btn.addEventListener('animationend', () => {
      btn.classList.remove('pulse');
    });
  });
}); 