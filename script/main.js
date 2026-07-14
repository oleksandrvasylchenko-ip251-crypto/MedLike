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