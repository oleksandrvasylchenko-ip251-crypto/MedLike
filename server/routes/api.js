// ==================== API ====================
const API_BASE_URL = "http://localhost:3000/api";

async function submitBooking(payload) {
  try {
    const response = await fetch(`${API_BASE_URL}/booking`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("[api] submitBooking failed:", error);
    return { ok: false, message: "Не вдалося надіслати заявку. Спробуйте пізніше." };
  }
}

async function submitCallRequest(payload) {
  try {
    const response = await fetch(`${API_BASE_URL}/call-request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("[api] submitCallRequest failed:", error);
    return { ok: false, message: "Не вдалося надіслати запит. Спробуйте пізніше." };
  }
}