// ==================== MENU / HEADER / BACK-TO-TOP ====================

function initMobileMenu() {
  const nav = document.querySelector(".nav");
  const headerTop = document.querySelector(".header-top");

  const oldHamburger = document.querySelector(".hamburger-menu");
  if (oldHamburger) {
    oldHamburger.remove();
  }

  const hamburger = document.createElement("button");
  hamburger.className = "hamburger-menu";
  hamburger.innerHTML = "☰";
  hamburger.setAttribute("aria-label", "Меню");
  hamburger.setAttribute("type", "button");

  if (window.innerWidth <= 768 && nav) {
    hamburger.style.display = "block";
    nav.classList.remove("open");

    if (headerTop) {
      headerTop.insertBefore(hamburger, headerTop.firstChild);
    }

    hamburger.addEventListener("click", function (e) {
      e.stopPropagation();
      nav.classList.toggle("open");
      hamburger.innerHTML = nav.classList.contains("open") ? "✕" : "☰";
    });

    document.addEventListener("click", function (e) {
      if (!e.target.closest(".header-top") && nav.classList.contains("open")) {
        nav.classList.remove("open");
        hamburger.innerHTML = "☰";
      }
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        hamburger.innerHTML = "☰";
      });
    });
  } else if (nav && window.innerWidth > 768) {
    nav.classList.remove("open");
    hamburger.style.display = "none";
  }
}

window.addEventListener("resize", function () {
  const nav = document.querySelector(".nav");
  const hamburger = document.querySelector(".hamburger-menu");

  if (window.innerWidth > 768 && nav) {
    nav.classList.remove("open");
    if (hamburger) {
      hamburger.style.display = "none";
      hamburger.innerHTML = "☰";
    }
  } else if (window.innerWidth <= 768 && nav) {
    if (hamburger) {
      hamburger.style.display = "block";
    } else {
      initMobileMenu();
    }
    if (nav.classList.contains("open")) {
      nav.classList.remove("open");
      if (hamburger) hamburger.innerHTML = "☰";
    }
  }
});

function initStickyHeader() {
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 100);
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("nav-active", link.getAttribute("href") === `#${current}`);
    });
  });
}

function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTop");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", function () {
    backToTopBtn.classList.toggle("visible", window.scrollY > 300);
  });

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initSmoothAnchorScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}
