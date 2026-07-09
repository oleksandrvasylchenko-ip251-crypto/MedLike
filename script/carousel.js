// ==================== CAROUSEL/SLIDER (ЛІКАРІ) ====================
let currentSlide = 0;
let slidesPerView = 3;
let slides = [];
let totalSlides = 0;

function getSlidesPerView() {
  if (window.innerWidth <= 480) return 1;
  if (window.innerWidth <= 768) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
}

function initCarousel() {
  slides = document.querySelectorAll(".carousel-item");
  totalSlides = slides.length;
  if (totalSlides === 0) return;

  slidesPerView = getSlidesPerView();
  const carousel = document.querySelector(".carousel");
  const dotsContainer = document.getElementById("carouselDots");

  if (dotsContainer) {
    dotsContainer.innerHTML = "";
  }

  // Видаляємо старі кнопки
  const oldControls = document.querySelector(".carousel-controls");
  if (oldControls) {
    oldControls.remove();
  }

  // Кнопки ТІЛЬКИ для десктопу (>1024px)
  if (window.innerWidth > 1024) {
    const controls = document.createElement("div");
    controls.className = "carousel-controls";

    const prevBtn = document.createElement("button");
    prevBtn.className = "carousel-btn prev-btn";
    prevBtn.type = "button";
    prevBtn.innerHTML = "❮";
    prevBtn.setAttribute("aria-label", "Попередні лікарі");
    prevBtn.addEventListener("click", () => goToSlide(currentSlide - slidesPerView));

    const nextBtn = document.createElement("button");
    nextBtn.className = "carousel-btn next-btn";
    nextBtn.type = "button";
    nextBtn.innerHTML = "❯";
    nextBtn.setAttribute("aria-label", "Наступні лікарі");
    nextBtn.addEventListener("click", () => goToSlide(currentSlide + slidesPerView));

    const carouselContainer = carousel.parentNode;
    carouselContainer.classList.add("carousel-wrapper");
    carouselContainer.appendChild(controls);
    controls.appendChild(prevBtn);
    controls.appendChild(nextBtn);
  }

  // Створюємо точки (для всіх версій)
  const totalDots = Math.ceil(totalSlides / slidesPerView);
  for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = `carousel-dot ${i === 0 ? "active" : ""}`;
    dot.setAttribute("aria-label", `Слайд ${i + 1}`);
    dot.addEventListener("click", () => goToSlide(i * slidesPerView));
    if (dotsContainer) {
      dotsContainer.appendChild(dot);
    }
  }

  showSlide(0);
}

function showSlide(startIndex) {
  slidesPerView = getSlidesPerView();

  // Для десктопу (>1024px) - показуємо всі слайди
  if (window.innerWidth > 1024) {
    slides.forEach((slide) => {
      slide.style.display = "block";
    });
    // Оновлюємо кнопки
    updateDesktopButtons(startIndex);
    return;
  }

  // Для планшета і мобільного - показуємо через flex + is-visible
  slides.forEach((slide) => slide.classList.remove("is-visible"));

  const start = startIndex;
  const end = Math.min(start + slidesPerView, totalSlides);

  for (let i = start; i < end; i++) {
    if (slides[i]) {
      slides[i].classList.add("is-visible");
    }
  }

  // Оновлюємо точки
  const dots = document.querySelectorAll(".carousel-dot");
  const currentDotIndex = Math.floor(start / slidesPerView);
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentDotIndex);
  });
}

function updateDesktopButtons(startIndex) {
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  if (prevBtn) {
    prevBtn.classList.toggle("is-disabled", startIndex === 0);
  }
  if (nextBtn) {
    const isLast = startIndex + slidesPerView >= totalSlides;
    nextBtn.classList.toggle("is-disabled", isLast);
  }
}

function goToSlide(index) {
  if (index < 0 || index >= totalSlides) return;
  currentSlide = index;
  showSlide(index);
}

window.addEventListener("resize", function () {
  if (totalSlides === 0) return;
  const newSlidesPerView = getSlidesPerView();
  if (newSlidesPerView !== slidesPerView) {
    slidesPerView = newSlidesPerView;
    const dotsContainer = document.getElementById("carouselDots");
    if (dotsContainer) dotsContainer.innerHTML = "";
    initCarousel();
  }
});