// テスティモニアルスライダーの初期化
function initTestimonialSliderV2() {
  const track = document.querySelector('.testimonial-slider-track-v2');
  if (!track) return;

  const cards = Array.from(track.children);
  const nextButton = document.querySelector('.testimonial-next-btn-v2');
  const prevButton = document.querySelector('.testimonial-prev-btn-v2');
  const dotsContainer = document.querySelector('.testimonial-dots-v2');

  if (!cards.length || !nextButton || !prevButton || !dotsContainer) return;

  let cardWidth = cards[0].getBoundingClientRect().width;
  let visibleCards = window.innerWidth >= 768 ? 2 : 1; 
  let currentIndex = 0;
  let dots = [];

  function setupDots() {
    dotsContainer.innerHTML = ''; // ドットをクリア
    dots = [];
    const numDots = Math.ceil(cards.length / visibleCards);
    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement('button');
      dot.classList.add('testimonial-dot-v2');
      dot.addEventListener('click', () => {
        currentIndex = i * visibleCards;
        // Ensure currentIndex does not exceed possible scroll positions
        if (currentIndex >= cards.length - visibleCards + 1 && cards.length > visibleCards) {
            currentIndex = cards.length - visibleCards;
        }
        if (cards.length <= visibleCards) { // if less cards than visible spots, always go to 0
            currentIndex = 0;
        }
        updateSliderPosition();
        updateActiveDot();
      });
      dotsContainer.appendChild(dot);
      dots.push(dot);
    }
    updateActiveDot();
  }

  function updateActiveDot() {
    const currentDotIndex = Math.floor(currentIndex / visibleCards);
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentDotIndex);
    });
  }

  function updateSliderPosition() {
    const cardMarginRight = cards.length > 1 ? parseFloat(getComputedStyle(cards[0]).marginRight) : 0;
    const totalCardWidth = cardWidth + cardMarginRight;
    track.style.transform = `translateX(-${currentIndex * totalCardWidth}px)`;
  }
  
  function reinitializeSlider() {
    if (!cards.length) return;
    cardWidth = cards[0].getBoundingClientRect().width;
    visibleCards = window.innerWidth >= 768 ? 2 : 1;
    // Clamp currentIndex to prevent going out of bounds after resize
    if (currentIndex + visibleCards > cards.length) {
        currentIndex = Math.max(0, cards.length - visibleCards);
    }
    if (cards.length <= visibleCards) {
        currentIndex = 0; 
    }
    setupDots();
    updateSliderPosition();
  }

  nextButton.addEventListener('click', () => {
    if (currentIndex < cards.length - visibleCards) {
      currentIndex += 1; // 1カードずつスライドさせるように変更
    } else {
      // currentIndex = 0; // ループする場合
    }
    // Ensure currentIndex does not exceed possible scroll positions
    if (currentIndex >= cards.length - visibleCards +1 && cards.length > visibleCards) {
         currentIndex = cards.length - visibleCards;
    }
     if (cards.length <= visibleCards) {
        currentIndex = 0; 
    }
    updateSliderPosition();
    updateActiveDot();
  });

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex -= 1; // 1カードずつスライドさせるように変更
    } else {
      // currentIndex = cards.length - visibleCards; // ループする場合
    }
    updateSliderPosition();
    updateActiveDot();
  });
  
  window.addEventListener('resize', reinitializeSlider);

  // 初期化
  reinitializeSlider();
}

// アドバイザーの声スライダーの初期化
function initAdvisorVoicesSlider() {
  // 先輩アドバイザーの声セクションでも受講生のリアルな声と同じクラス名で初期化
  const advisorVoicesSection = document.querySelector('.advisor-voices');
  if (!advisorVoicesSection) return;
  
  const track = advisorVoicesSection.querySelector('.testimonial-slider-track-v2');
  if (!track) return;

  const cards = Array.from(track.children);
  const nextButton = advisorVoicesSection.querySelector('.testimonial-next-btn-v2');
  const prevButton = advisorVoicesSection.querySelector('.testimonial-prev-btn-v2');
  const dotsContainer = advisorVoicesSection.querySelector('.testimonial-dots-v2');

  if (!cards.length || !nextButton || !prevButton || !dotsContainer) return;

  let cardWidth = cards[0].getBoundingClientRect().width;
  // visibleCards は常に1とする (1カードずつ表示)
  const visibleCards = 1; 
  let currentIndex = 0;
  let dots = [];

  function setupDots() {
    dotsContainer.innerHTML = ''; // ドットをクリア
    dots = [];
    // 1カードずつなので、カードの枚数分ドットを作成
    const numDots = cards.length;
    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement('button');
      dot.classList.add('testimonial-dot-v2'); // 受講生の声のドットスタイルを再利用
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateSliderPosition();
        updateActiveDot();
      });
      dotsContainer.appendChild(dot);
      dots.push(dot);
    }
    updateActiveDot();
  }

  function updateActiveDot() {
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function updateSliderPosition() {
    // カード間のマージンを考慮（CSSで margin: 0 10px; としているので、左右で20px）
    const cardMargin = cards.length > 1 ? parseFloat(getComputedStyle(cards[0]).marginLeft) + parseFloat(getComputedStyle(cards[0]).marginRight) : 0;
    // スクロール位置計算を修正：(カード幅 + マージン) * 現在のインデックス
    // ここではカードがコンテナ幅100%なので、マージンはtransformに直接影響しないように見えるが、
    // スライド全体の幅の計算には影響する可能性がある。ただし、min-width: 100%で、trackがtransformされるので、カード自体の幅で良いはず。
    const totalCardWidth = cardWidth; // marginはカード自体に含まれないので、transformではカード幅のみ考慮
    track.style.transform = `translateX(-${currentIndex * totalCardWidth}px)`;
  }
  
  function reinitializeSlider() {
    if (!cards.length) return;
    // スライダーコンテナの幅を基準にカード幅を再計算する
    const sliderContainerWidth = track.parentElement.getBoundingClientRect().width;
    // CSSでmargin: 0 10px があるため、カードの実際の表示領域はコンテナ幅からマージンを引いたものになる。
    // min-width: 100% は、親要素である track の幅に対して100%となる。
    // track はカードの数 * カードの表示幅となるので、ここではコンテナ幅をカード幅とするのがシンプル。
    cardWidth = sliderContainerWidth; 
    // currentIndex の再計算は不要 (常に1枚表示)
    if (currentIndex >= cards.length) {
        currentIndex = cards.length - 1;
    }
    setupDots();
    updateSliderPosition();
  }

  nextButton.addEventListener('click', () => {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0; // ループする場合
    }
    updateSliderPosition();
    updateActiveDot();
  });

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = cards.length - 1; // ループする場合
    }
    updateSliderPosition();
    updateActiveDot();
  });
  
  window.addEventListener('resize', reinitializeSlider);
  
  // 初期化
  reinitializeSlider();
}

// DOMが読み込まれた時の初期化処理
document.addEventListener('DOMContentLoaded', function() {
  initTestimonialSliderV2();
  initAdvisorVoicesSlider();
}); 