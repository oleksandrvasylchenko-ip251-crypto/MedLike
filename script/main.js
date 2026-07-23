// ==================== ГОЛОВНИЙ ФАЙЛ (ІНІЦІАЛІЗАЦІЯ) ====================

document.addEventListener("DOMContentLoaded", () => {
  try {
    console.log('🚀 Початок ініціалізації сайту');
    
    // Ініціалізуємо всі компоненти
    if (typeof initCarousel === 'function') initCarousel();
    if (typeof initRevealOnScroll === 'function') initRevealOnScroll();
    if (typeof initMobileMenu === 'function') initMobileMenu();
    if (typeof initStickyHeader === 'function') initStickyHeader();
    if (typeof updateActiveNavLink === 'function') updateActiveNavLink();
    if (typeof initBackToTop === 'function') initBackToTop();
    if (typeof initGalleryAccordion === 'function') initGalleryAccordion();
    if (typeof initMobileGallery === 'function') initMobileGallery();
    if (typeof initServiceCards === 'function') initServiceCards();
    if (typeof initNewsFilter === 'function') initNewsFilter();
    if (typeof initBooking === 'function') initBooking();
    if (typeof initCallWidget === 'function') initCallWidget();
    if (typeof initSmoothAnchorScroll === 'function') initSmoothAnchorScroll();

    // Кнопка "Записатися" в навігації
    document.querySelector('[data-action="scroll-to-booking"]')?.addEventListener("click", () => {
      document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
    });

    console.info("✅ МЕДЛАЙК website loaded!");
  } catch (error) {
    console.error("❌ Помилка ініціалізації сайту:", error);
  }
});


// ==================== АНІМАЦІЯ ЛІЧИЛЬНИКІВ ====================
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  // Опція: запускати анімацію тільки коли блок видно
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const count = parseInt(target.dataset.count, 10);
        const duration = 2000; // 2 секунди
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // easeOutQuart для плавності
          const eased = 1 - Math.pow(1 - progress, 4);
          const current = Math.round(eased * count);
          target.textContent = current.toLocaleString('uk-UA');
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            target.textContent = count.toLocaleString('uk-UA');
          }
        }
        requestAnimationFrame(updateCounter);
        observer.unobserve(target); // запускаємо один раз
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

// Викликаємо після завантаження
document.addEventListener('DOMContentLoaded', animateCounters);