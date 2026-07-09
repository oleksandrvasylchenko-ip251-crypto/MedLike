// ==================== VALIDATION ====================
// Валідація форм та маска телефону. Використовується booking.js та
// call-widget.js.

/** Показує/знімає стилі помилки на невалідному полі вводу. */
function initFieldValidationStyles(formSelector) {
  const inputs = document.querySelectorAll(`${formSelector} input`);

  inputs.forEach((input) => {
    input.addEventListener("invalid", (e) => {
      e.preventDefault();
      input.classList.add("field-invalid");
    });

    input.addEventListener("input", () => {
      if (input.validity.valid) {
        input.classList.remove("field-invalid");
      }
    });
  });
}

/** Автоматично форматує номер телефону у вигляд +38(0XX)XXX-XX-XX. */
function attachPhoneMask(input) {
  if (!input) return;
  input.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    
    // Якщо номер починається з 380 - обрізаємо
    if (value.startsWith("380")) {
      value = value.slice(3);
    }
    
    // Якщо номер починається з 0 - обрізаємо
    if (value.startsWith("0")) {
      value = value.slice(1);
    }
    
    // Якщо порожньо - очищаємо поле
    if (value.length === 0) {
      e.target.value = "";
      return;
    }
    
    // Форматуємо поступово
    if (value.length <= 2) {
      // Перші 2 цифри після 0
      e.target.value = `+38(0${value}`;
    } else if (value.length <= 5) {
      // Код оператора (3 цифри)
      e.target.value = `+38(0${value.slice(0, 2)})${value.slice(2)}`;
    } else if (value.length <= 7) {
      // Перші 3 цифри номера
      e.target.value = `+38(0${value.slice(0, 2)})${value.slice(2, 5)}-${value.slice(5)}`;
    } else {
      // Повний номер
      e.target.value = `+38(0${value.slice(0, 2)})${value.slice(2, 5)}-${value.slice(5, 7)}-${value.slice(7, 9)}`;
    }
  });
}

/** Перевіряє, що очищений від символів номер має принаймні 10 цифр. */
function isValidPhone(phone) {
  return phone.replace(/[^0-9]/g, "").length >= 10;
}