// ==================== API ====================
// Централізований модуль для звернень до бекенду.
// Наразі бекенд (Node.js + Express + MySQL) ще не підключено — форми
// показують локальне підтвердження (alert). Коли бекенд буде готовий
// (див. /server у корені проєкту), достатньо розкоментувати fetch()
// у функціях нижче — розмітка форм (name/id) вже підготовлена.

const API_BASE_URL = "/api";

/**
 * Надсилає заявку на запис до лікаря.
 * @param {{name: string, phone: string, service: string, note?: string}} payload
 * @returns {Promise<{ok: boolean, message?: string}>}
 */
async function submitBooking(payload) {
  try {
    // TODO: увімкнути після розгортання бекенду
    // const response = await fetch(`${API_BASE_URL}/booking`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload),
    // });
    // if (!response.ok) throw new Error(`HTTP ${response.status}`);
    // return await response.json();

    // Тимчасова заглушка, поки немає бекенду:
    console.info("[api] submitBooking (mock):", payload);
    return { ok: true };
  } catch (error) {
    console.error("[api] submitBooking failed:", error);
    return { ok: false, message: "Не вдалося надіслати заявку. Спробуйте пізніше." };
  }
}

/**
 * Надсилає заявку на зворотній дзвінок.
 * @param {{phone: string, waitMinutes: number}} payload
 * @returns {Promise<{ok: boolean, message?: string}>}
 */
async function submitCallRequest(payload) {
  try {
    // TODO: увімкнути після розгортання бекенду
    // const response = await fetch(`${API_BASE_URL}/call-request`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload),
    // });
    // if (!response.ok) throw new Error(`HTTP ${response.status}`);
    // return await response.json();

    console.info("[api] submitCallRequest (mock):", payload);
    return { ok: true };
  } catch (error) {
    console.error("[api] submitCallRequest failed:", error);
    return { ok: false, message: "Не вдалося надіслати запит. Спробуйте пізніше." };
  }
}
