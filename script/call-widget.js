// ==================== CALL MODAL / TIMER ====================

let timerInterval = null;
let timerSeconds = 600;
let isTimerRunning = false;
let selectedTime = 10;

function openCallModal() {
  const modal = document.getElementById("callModal");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  document.getElementById("callPhone").value = "";
  document.getElementById("callPhone").focus();
  document.getElementById("callTimer").style.display = "none";
  document.querySelector(".call-modal-form").style.display = "flex";
  document.querySelector(".call-time-selector").style.display = "block";

  selectedTime = 10;
  timerSeconds = 600;
  document.querySelectorAll(".time-option").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.time == 10);
  });
  document.getElementById("customTime").value = "";
}

function closeCallModal() {
  const modal = document.getElementById("callModal");
  modal.classList.remove("active");
  document.body.style.overflow = "";

  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    isTimerRunning = false;
  }
}

function setCustomTime() {
  const input = document.getElementById("customTime");
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
  const phone = phoneInput.value.trim();

  if (!isValidPhone(phone)) {
    alert("Будь ласка, введіть коректний номер телефону");
    phoneInput.focus();
    return;
  }

  document.querySelector(".call-modal-form").style.display = "none";
  document.querySelector(".call-time-selector").style.display = "none";

  const timerContainer = document.getElementById("callTimer");
  timerContainer.style.display = "block";

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
  progressBar.style.width = "100%";

  const totalSeconds = timerSeconds;
  document.getElementById("timerStatus").textContent = `⏳ Очікуємо дзвінка на номер ${phone}...`;
  document.querySelector(".call-submit-btn").disabled = true;

  const timerDisplay = document.getElementById("timerDisplay");
  timerDisplay.classList.remove("timer-warning", "timer-critical");
  document.getElementById("timerStatus").classList.remove("timer-status-done");

  if (timerInterval) {
    clearInterval(timerInterval);
  }

  timerInterval = setInterval(() => {
    timerSeconds--;
    updateTimerDisplay(timerSeconds);

    const progress = (timerSeconds / totalSeconds) * 100;
    document.getElementById("timerProgressBar").style.width = progress + "%";

    if (timerSeconds <= 60) {
      timerDisplay.classList.add("timer-critical");
      timerDisplay.classList.remove("timer-warning");
      document.getElementById("timerStatus").textContent = " Скоро зателефонують!";
    } else if (timerSeconds <= 180) {
      timerDisplay.classList.add("timer-warning");
      document.getElementById("timerStatus").textContent = " Готуємось до дзвінка...";
    }

    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      isTimerRunning = false;

      document.getElementById("timerDisplay").textContent = "00:00";
      const statusEl = document.getElementById("timerStatus");
      statusEl.textContent = " Дзвінок виконано! Дякуємо за довіру!";
      statusEl.classList.add("timer-status-done");
      document.querySelector(".timer-cancel-btn").style.display = "none";

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
  document.getElementById("timerDisplay").textContent =
    `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
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
  document.getElementById("callTimer").style.display = "none";
  document.querySelector(".call-modal-form").style.display = "flex";
  document.querySelector(".call-time-selector").style.display = "block";
  document.querySelector(".call-submit-btn").disabled = false;
  document.getElementById("callPhone").value = "";
  document.getElementById("timerDisplay").classList.remove("timer-warning", "timer-critical");
  document.getElementById("timerStatus").classList.remove("timer-status-done");
  document.querySelector(".timer-cancel-btn").style.display = "block";
  document.getElementById("timerProgressBar").style.width = "100%";
}

function initCallWidget() {
  const openBtn = document.querySelector('[data-action="open-call-modal"]');
  const closeBtn = document.querySelector('[data-action="close-call-modal"]');
  const setTimeBtn = document.querySelector('[data-action="set-custom-time"]');
  const cancelBtn = document.querySelector('[data-action="cancel-timer"]');
  const form = document.getElementById("callModalForm");
  const modal = document.getElementById("callModal");

  openBtn?.addEventListener("click", openCallModal);
  closeBtn?.addEventListener("click", closeCallModal);
  setTimeBtn?.addEventListener("click", setCustomTime);
  cancelBtn?.addEventListener("click", cancelTimer);
  form?.addEventListener("submit", submitPhone);

  modal?.addEventListener("click", function (e) {
    if (e.target === this) {
      closeCallModal();
    }
  });

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
      document.getElementById("customTime").value = "";
    });
  });

  attachPhoneMask(document.getElementById("callPhone"));
}
