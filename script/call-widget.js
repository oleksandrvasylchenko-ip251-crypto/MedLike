// ==================== CALL MODAL / TIMER ====================

let timerInterval = null;
let timerSeconds = 600;
let isTimerRunning = false;
let selectedTime = 10;

function openCallModal() {
  const modal = document.getElementById("callModal");
  if (!modal) {
    console.error('❌ Модальне вікно не знайдено!');
    return;
  }
  
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  const phoneInput = document.getElementById("callPhone");
  if (phoneInput) {
    phoneInput.value = "";
    phoneInput.focus();
  }
  
  const timerContainer = document.getElementById("callTimer");
  if (timerContainer) {
    timerContainer.style.display = "none";
  }
  
  const form = document.querySelector(".call-modal-form");
  if (form) {
    form.style.display = "flex";
  }
  
  const selector = document.querySelector(".call-time-selector");
  if (selector) {
    selector.style.display = "block";
  }

  selectedTime = 10;
  timerSeconds = 600;
  
  document.querySelectorAll(".time-option").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.time == 10);
  });
  
  const customTime = document.getElementById("customTime");
  if (customTime) {
    customTime.value = "";
  }
  
  console.log('✅ Модальне вікно відкрито');
}

function closeCallModal() {
  const modal = document.getElementById("callModal");
  if (!modal) return;
  
  modal.classList.remove("active");
  document.body.style.overflow = "";

  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    isTimerRunning = false;
  }
  
  console.log('✅ Модальне вікно закрито');
}

function setCustomTime() {
  const input = document.getElementById("customTime");
  if (!input) return;
  
  const minutes = parseInt(input.value, 10);
  if (minutes && minutes > 0 && minutes <= 120) {
    document.querySelectorAll(".time-option").forEach((b) => b.classList.remove("active"));
    selectedTime = minutes;
    timerSeconds = minutes * 60;
    input.value = "";
  } else {
    alert("Введіть час від 1 до 120 хвилин");
  }
}

async function submitPhone(event) {
  event.preventDefault();

  const phoneInput = document.getElementById("callPhone");
  if (!phoneInput) return;
  
  const phone = phoneInput.value.trim();

  if (!isValidPhone(phone)) {
    alert("Будь ласка, введіть коректний номер телефону");
    phoneInput.focus();
    return;
  }

  const form = document.querySelector(".call-modal-form");
  if (form) {
    form.style.display = "none";
  }
  
  const selector = document.querySelector(".call-time-selector");
  if (selector) {
    selector.style.display = "none";
  }

  const timerContainer = document.getElementById("callTimer");
  if (timerContainer) {
    timerContainer.style.display = "block";
  }

  try {
    await submitCallRequest({ phone, waitMinutes: selectedTime });
  } catch (error) {
    console.error("[call-widget] submitCallRequest failed:", error);
  }

  startTimer(phone);
}

function startTimer(phone) {
  isTimerRunning = true;
  updateTimerDisplay(timerSeconds);

  const progressBar = document.getElementById("timerProgressBar");
  if (progressBar) {
    progressBar.style.width = "100%";
  }

  const totalSeconds = timerSeconds;
  
  const statusEl = document.getElementById("timerStatus");
  if (statusEl) {
    statusEl.textContent = `⏳ Очікуємо дзвінка на номер ${phone}...`;
  }
  
  const submitBtn = document.querySelector(".call-submit-btn");
  if (submitBtn) {
    submitBtn.disabled = true;
  }

  const timerDisplay = document.getElementById("timerDisplay");
  if (timerDisplay) {
    timerDisplay.classList.remove("timer-warning", "timer-critical");
  }
  
  const statusDone = document.getElementById("timerStatus");
  if (statusDone) {
    statusDone.classList.remove("timer-status-done");
  }

  if (timerInterval) {
    clearInterval(timerInterval);
  }

  timerInterval = setInterval(() => {
    timerSeconds--;
    updateTimerDisplay(timerSeconds);

    const progress = (timerSeconds / totalSeconds) * 100;
    const progressBarEl = document.getElementById("timerProgressBar");
    if (progressBarEl) {
      progressBarEl.style.width = progress + "%";
    }

    const timerDisplayEl = document.getElementById("timerDisplay");
    const statusEl2 = document.getElementById("timerStatus");
    
    if (timerDisplayEl) {
      if (timerSeconds <= 60) {
        timerDisplayEl.classList.add("timer-critical");
        timerDisplayEl.classList.remove("timer-warning");
        if (statusEl2) {
          statusEl2.textContent = "🔔 Скоро зателефонують!";
        }
      } else if (timerSeconds <= 180) {
        timerDisplayEl.classList.add("timer-warning");
        if (statusEl2) {
          statusEl2.textContent = "⏳ Готуємось до дзвінка...";
        }
      }
    }

    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      isTimerRunning = false;

      const displayEl = document.getElementById("timerDisplay");
      if (displayEl) {
        displayEl.textContent = "00:00";
      }
      
      const statusEl3 = document.getElementById("timerStatus");
      if (statusEl3) {
        statusEl3.textContent = "✅ Дзвінок виконано! Дякуємо за довіру!";
        statusEl3.classList.add("timer-status-done");
      }
      
      const cancelBtn = document.querySelector(".timer-cancel-btn");
      if (cancelBtn) {
        cancelBtn.style.display = "none";
      }

      setTimeout(() => {
        if (!isTimerRunning) {
          resetModal();
        }
      }, 5000);
    }
  }, 1000);
}

function updateTimerDisplay(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const display = document.getElementById("timerDisplay");
  if (display) {
    display.textContent = `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
}

function cancelTimer() {
  if (confirm("Ви впевнені, що хочете скасувати очікування дзвінка?")) {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
      isTimerRunning = false;
    }
    resetModal();
  }
}

function resetModal() {
  const timerContainer = document.getElementById("callTimer");
  if (timerContainer) {
    timerContainer.style.display = "none";
  }
  
  const form = document.querySelector(".call-modal-form");
  if (form) {
    form.style.display = "flex";
  }
  
  const selector = document.querySelector(".call-time-selector");
  if (selector) {
    selector.style.display = "block";
  }
  
  const submitBtn = document.querySelector(".call-submit-btn");
  if (submitBtn) {
    submitBtn.disabled = false;
  }
  
  const phoneInput = document.getElementById("callPhone");
  if (phoneInput) {
    phoneInput.value = "";
  }
  
  const timerDisplay = document.getElementById("timerDisplay");
  if (timerDisplay) {
    timerDisplay.classList.remove("timer-warning", "timer-critical");
  }
  
  const statusEl = document.getElementById("timerStatus");
  if (statusEl) {
    statusEl.classList.remove("timer-status-done");
  }
  
  const cancelBtn = document.querySelector(".timer-cancel-btn");
  if (cancelBtn) {
    cancelBtn.style.display = "block";
  }
  
  const progressBar = document.getElementById("timerProgressBar");
  if (progressBar) {
    progressBar.style.width = "100%";
  }
}

function initCallWidget() {
  console.log('🔄 initCallWidget викликано');
  
  // Шукаємо кнопку за ID
  const callBtn = document.getElementById('callButton');
  console.log('callBtn за ID:', callBtn);
  
  // Якщо не знайшли за ID - шукаємо за класом
  const callBtnByClass = document.querySelector('.call-btn-fixed');
  console.log('callBtn за класом:', callBtnByClass);
  
  const openBtn = callBtn || callBtnByClass;
  
  const closeBtn = document.querySelector('[data-action="close-call-modal"]');
  const setTimeBtn = document.querySelector('[data-action="set-custom-time"]');
  const cancelBtn = document.querySelector('[data-action="cancel-timer"]');
  const form = document.getElementById("callModalForm");
  const modal = document.getElementById("callModal");

  if (openBtn) {
    openBtn.addEventListener("click", function(e) {
      e.preventDefault();
      console.log('🔔 Кнопка дзвінка натиснута!');
      openCallModal();
    });
    console.log('✅ Слухач на кнопку дзвінка додано');
  } else {
    console.error('❌ Кнопка дзвінка не знайдена!');
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeCallModal);
    console.log('✅ Слухач на closeBtn додано');
  }

  if (setTimeBtn) {
    setTimeBtn.addEventListener("click", setCustomTime);
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", cancelTimer);
  }

  if (form) {
    form.addEventListener("submit", submitPhone);
  }

  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        closeCallModal();
      }
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeCallModal();
    }
  });

  document.querySelectorAll(".time-option").forEach((btn) => {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".time-option").forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      selectedTime = parseInt(this.dataset.time, 10);
      timerSeconds = selectedTime * 60;
      const customTime = document.getElementById("customTime");
      if (customTime) {
        customTime.value = "";
      }
    });
  });

  const phoneInput = document.getElementById("callPhone");
  if (phoneInput) {
    attachPhoneMask(phoneInput);
  }
  
  console.log('✅ initCallWidget завершено');
}