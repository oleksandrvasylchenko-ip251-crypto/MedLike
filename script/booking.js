// ==================== BOOKING FORM ====================

function initBooking() {
  const form = document.getElementById("bookingForm");
  if (!form) return;

  initFieldValidationStyles(".booking-form");
  attachPhoneMask(document.getElementById("bookingPhone"));

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("bookingName").value.trim();
    const phone = document.getElementById("bookingPhone").value.trim();
    const service = document.getElementById("bookingService").value;
    const note = document.getElementById("bookingNote").value.trim();

    if (!name || !phone || !service) {
      alert("Будь ласка, заповніть всі необхідні поля!");
      return;
    }

    if (!isValidPhone(phone)) {
      alert("Будь ласка, введіть коректний номер телефону!");
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;

    try {
      const result = await submitBooking({ name, phone, service, note });

      if (result.ok) {
        alert(
          ` Дякуємо, ${name}!\n\nМи отримали вашу заявку.\nНайближчим часом ми зв'яжемось з вами за номером ${phone}.\n\nОчікуваний час прийому буде підтверджено в SMS.`,
        );
        form.reset();
      } else {
        alert(` ${result.message || "Сталася помилка. Спробуйте ще раз."}`);
      }
    } catch (error) {
      console.error("[booking] submit failed:", error);
      alert(" Сталася помилка. Спробуйте ще раз.");
    } finally {
      submitBtn.disabled = false;
    }
  });
}

function scrollToBooking() {
  const bookingSection = document.getElementById("booking");
  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: "smooth" });
  }
}
