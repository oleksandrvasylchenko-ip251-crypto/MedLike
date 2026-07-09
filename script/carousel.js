// ============================================
// КАРУСЕЛЬ ЛІКАРІВ - НОВА ВЕРСІЯ
// ============================================

(function() {
    'use strict';

    const track = document.getElementById('carouselTrack');
    const container = document.getElementById('carouselContainer');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');

    if (!track || !container) return;

    // ===== СТАН =====
    const state = {
        currentIndex: 0,
        slidesPerView: 3,
        totalSlides: 0,
        cardWidth: 0,
        gap: 30,
        isAnimating: false
    };

    // ===== ОТРИМУЄМО КІЛЬКІСТЬ СЛАЙДІВ =====
    function getSlidesPerView() {
        const width = window.innerWidth;
        if (width <= 768) return 1;
        if (width <= 1024) return 2;
        return 3;
    }

    // ===== ОТРИМУЄМО КАРТКИ =====
    function getCards() {
        return Array.from(track.querySelectorAll('.doctor-card'));
    }

    // ===== РОЗРАХУНОК ШИРИНИ =====
    function calculateWidths() {
        const containerWidth = container.offsetWidth;
        state.slidesPerView = getSlidesPerView();
        state.gap = window.innerWidth <= 768 ? 20 : 30;
        
        const totalGap = state.gap * (state.slidesPerView - 1);
        state.cardWidth = (containerWidth - totalGap) / state.slidesPerView;
        
        return state.cardWidth;
    }

    // ===== ОНОВЛЕННЯ КАРТОК =====
    function updateCards() {
        const cards = getCards();
        state.totalSlides = cards.length;
        
        if (state.totalSlides === 0) return;
        
        const cardWidth = calculateWidths();
        
        cards.forEach((card, index) => {
            card.style.flex = `0 0 ${cardWidth}px`;
            card.style.maxWidth = `${cardWidth}px`;
        });
        
        // Оновлюємо відступ
        track.style.gap = `${state.gap}px`;
        
        // Оновлюємо позицію
        updatePosition();
        
        // Оновлюємо точки
        updateDots();
        
        // Оновлюємо кнопки
        updateButtons();
    }

    // ===== ОНОВЛЕННЯ ПОЗИЦІЇ =====
    function updatePosition() {
        const cards = getCards();
        if (cards.length === 0) return;
        
        const cardWidth = state.cardWidth;
        const gap = state.gap;
        const offset = state.currentIndex * (cardWidth + gap);
        
        track.style.transform = `translateX(-${offset}px)`;
    }

    // ===== ОНОВЛЕННЯ КНОПОК =====
    function updateButtons() {
        if (!prevBtn || !nextBtn) return;
        
        const total = state.totalSlides;
        const perView = state.slidesPerView;
        
        prevBtn.classList.toggle('is-disabled', state.currentIndex === 0);
        nextBtn.classList.toggle('is-disabled', state.currentIndex + perView >= total);
    }

    // ===== ОНОВЛЕННЯ ТОЧОК =====
    function updateDots() {
        if (!dotsContainer) return;
        
        const totalDots = Math.ceil(state.totalSlides / state.slidesPerView);
        const activeIndex = Math.floor(state.currentIndex / state.slidesPerView);
        
        dotsContainer.innerHTML = '';
        
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('button');
            dot.className = `carousel-dot ${i === activeIndex ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Слайд ${i + 1}`);
            dot.addEventListener('click', () => {
                goTo(i * state.slidesPerView);
            });
            dotsContainer.appendChild(dot);
        }
    }

    // ===== ПЕРЕХІД ДО СЛАЙДУ =====
    function goTo(index) {
        if (state.isAnimating) return;
        
        const total = state.totalSlides;
        const perView = state.slidesPerView;
        
        // Обмежуємо індекс
        if (index < 0) index = 0;
        if (index + perView > total) index = total - perView;
        if (index < 0) index = 0;
        
        state.currentIndex = index;
        state.isAnimating = true;
        
        updatePosition();
        updateButtons();
        updateDots();
        
        setTimeout(() => {
            state.isAnimating = false;
        }, 500);
    }

    // ===== НАСТУПНИЙ / ПОПЕРЕДНІЙ =====
    function goToNext() {
        const perView = state.slidesPerView;
        const nextIndex = state.currentIndex + perView;
        if (nextIndex < state.totalSlides) {
            goTo(nextIndex);
        }
    }

    function goToPrev() {
        const prevIndex = state.currentIndex - state.slidesPerView;
        if (prevIndex >= 0) {
            goTo(prevIndex);
        }
    }

    // ===== ОБРОБНИКИ КНОПОК =====
    if (prevBtn) {
        prevBtn.addEventListener('click', goToPrev);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', goToNext);
    }

    // ===== СВАЙП НА МОБІЛЬНИХ =====
    let touchStartX = 0;
    let touchEndX = 0;
    let isSwiping = false;

    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        isSwiping = true;
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;
        // Не блокуємо прокрутку сторінки
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
        if (!isSwiping) return;
        isSwiping = false;
        
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                goToNext();
            } else {
                goToPrev();
            }
        }
    }, { passive: true });

    // ===== РЕЗАЙЗ =====
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newPerView = getSlidesPerView();
            if (newPerView !== state.slidesPerView) {
                state.slidesPerView = newPerView;
                updateCards();
                // Повертаємо на початок
                goTo(0);
            } else {
                updateCards();
            }
        }, 300);
    });

    // ===== ІНІЦІАЛІЗАЦІЯ =====
    function init() {
        updateCards();
        goTo(0);
    }

    // Запускаємо після завантаження
    if (document.readyState === 'complete') {
        init();
    } else {
        window.addEventListener('load', init);
    }

    // Додатковий запуск через DOMContentLoaded
    document.addEventListener('DOMContentLoaded', () => {
        // Якщо ще не ініціалізовано
        if (state.totalSlides === 0) {
            init();
        }
    });

})();