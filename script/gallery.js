// ==================== GALLERY (ДЕСКТОП-АКОРДЕОН + МОБІЛЬНИЙ СВАЙП) ====================

function initGalleryAccordion() {
  const items = document.querySelectorAll(".gallery-accordion-item");
  if (items.length === 0) return;

  if (window.innerWidth > 768) {
    items[0].classList.add("active");

    items.forEach((item) => {
      item.addEventListener("click", function () {
        if (this.classList.contains("active")) return;
        items.forEach((i) => i.classList.remove("active"));
        this.classList.add("active");
      });
    });
  }
}

function initMobileGallery() {
  const gallery = document.querySelector(".gallery-accordion");
  const items = document.querySelectorAll(".gallery-accordion-item");

  if (!gallery || items.length === 0) return;
  if (window.innerWidth > 768) return;

  items.forEach((item) => item.classList.remove("active"));

  let dotsContainer = document.querySelector(".gallery-dots");
  if (!dotsContainer) {
    dotsContainer = document.createElement("div");
    dotsContainer.className = "gallery-dots";
    gallery.parentNode.insertBefore(dotsContainer, gallery.nextSibling);
  }

  items.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = `gallery-dot ${index === 0 ? "active" : ""}`;
    dot.dataset.index = index;
    dot.setAttribute("aria-label", `Фото ${index + 1}`);
    dot.addEventListener("click", () => scrollToItem(index));
    dotsContainer.appendChild(dot);
  });

  let navContainer = document.querySelector(".gallery-nav");
  if (!navContainer) {
    navContainer = document.createElement("div");
    navContainer.className = "gallery-nav";
    navContainer.innerHTML = `
            <button type="button" class="gallery-nav-btn prev-btn" aria-label="Попереднє фото">❮</button>
            <button type="button" class="gallery-nav-btn next-btn" aria-label="Наступне фото">❯</button>
        `;
    dotsContainer.parentNode.insertBefore(navContainer, dotsContainer.nextSibling);
  }

  const prevBtn = navContainer.querySelector(".prev-btn");
  const nextBtn = navContainer.querySelector(".next-btn");
  const itemsArr = Array.from(items);

  function scrollToItem(index) {
    itemsArr[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
    updateActive(index);
  }

  function updateActive(index) {
    document.querySelectorAll(".gallery-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
    itemsArr.forEach((item, i) => {
      item.classList.toggle("active", i === index);
    });
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === itemsArr.length - 1;
  }

  let isScrolling = false;
  gallery.addEventListener("scroll", () => {
    if (isScrolling) return;
    isScrolling = true;
    requestAnimationFrame(() => {
      const center = gallery.scrollLeft + gallery.offsetWidth / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;
      itemsArr.forEach((item, i) => {
        const distance = Math.abs(center - (item.offsetLeft + item.offsetWidth / 2));
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      });
      updateActive(closestIndex);
      isScrolling = false;
    });
  });

  prevBtn?.addEventListener("click", () => {
    const current = itemsArr.findIndex((item) => item.classList.contains("active"));
    if (current > 0) scrollToItem(current - 1);
  });

  nextBtn?.addEventListener("click", () => {
    const current = itemsArr.findIndex((item) => item.classList.contains("active"));
    if (current < itemsArr.length - 1) scrollToItem(current + 1);
  });

  setTimeout(() => updateActive(0), 100);
}

window.addEventListener("resize", () => {
  const gallery = document.querySelector(".gallery-accordion");
  const navContainer = document.querySelector(".gallery-nav");
  const dotsContainer = document.querySelector(".gallery-dots");
  const items = document.querySelectorAll(".gallery-accordion-item");

  if (gallery && items.length > 0) {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      if (navContainer) navContainer.style.display = "flex";
      if (dotsContainer) dotsContainer.style.display = "flex";
      let hasActive = false;
      items.forEach((item) => {
        if (item.classList.contains("active")) hasActive = true;
      });
      if (!hasActive) {
        items.forEach((item) => item.classList.remove("active"));
        items[0].classList.add("active");
      }
    } else {
      if (navContainer) navContainer.style.display = "none";
      if (dotsContainer) dotsContainer.style.display = "none";
      items.forEach((item) => item.classList.remove("active"));
      if (items.length > 0) items[0].classList.add("active");
    }
  }
});
