// ==================== ГОЛОВНИЙ ФАЙЛ (ІНІЦІАЛІЗАЦІЯ) ====================

document.addEventListener("DOMContentLoaded", () => {
  try {
    initCarousel();
    initRevealOnScroll();
    initMobileMenu();
    initStickyHeader();
    updateActiveNavLink();
    initBackToTop();
    initGalleryAccordion();
    initMobileGallery();
    initServiceCards();
    initNewsFilter();
    initBooking();
    initCallWidget();
    initSmoothAnchorScroll();

    document.querySelector('[data-action="scroll-to-booking"]')?.addEventListener("click", () => {
      document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
    });

    console.info("✅ МЕДЛАЙК website loaded!");
  } catch (error) {
    console.error("❌ Помилка ініціалізації сайту:", error);
  }
});
