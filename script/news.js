// ==================== ФІЛЬТР НОВИН ====================

function initNewsFilter() {
  const buttons = document.querySelectorAll(".news-nav-btn");
  const cards = document.querySelectorAll(".news-card");

  if (buttons.length === 0) return;

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      buttons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const category = this.dataset.category;

      cards.forEach((card) => {
        card.classList.toggle("hidden", !(category === "all" || card.dataset.category === category));
      });
    });
  });
}

function initRevealOnScroll() {
  const elements = document.querySelectorAll(".service-card, .carousel-item");
  if (elements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
        }
      });
    },
    { threshold: 0.1 },
  );

  elements.forEach((el) => {
    el.classList.add("reveal-on-scroll");
    observer.observe(el);
  });
}
