// ==================== КАРТКИ ПОСЛУГ (РОЗГОРТАННЯ) ====================

function initServiceCards() {
  const allCards = document.querySelectorAll(".service-card");
  if (allCards.length === 0) return;

  allCards.forEach((card) => {
    const hint = document.createElement("span");
    hint.className = "click-hint";
    hint.textContent = " Натисніть для перегляду послуг та цін";
    card.appendChild(hint);

    const toggle = () => {
      allCards.forEach((c) => {
        if (c !== card && c.classList.contains("active")) {
          c.classList.remove("active");
        }
      });
      card.classList.toggle("active");
    };

    card.addEventListener("click", toggle);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
  });

  document.addEventListener("click", function (event) {
    const isCard = event.target.closest(".service-card");
    if (!isCard) {
      document.querySelectorAll(".service-card.active").forEach((card) => {
        card.classList.remove("active");
      });
    }
  });
}
