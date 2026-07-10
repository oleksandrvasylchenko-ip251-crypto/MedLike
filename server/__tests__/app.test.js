const request = require("supertest");
const { app } = require("../app");

describe("MedLike API", () => {
  test("GET /api/health returns service status", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.service).toBe("medlike-server");
    expect(typeof response.body.time).toBe("string");
  });

  test("POST /api/booking validates request body", async () => {
    const response = await request(app).post("/api/booking").send({
      name: "",
      phone: "123",
      service: "",
    });

    expect(response.status).toBe(400);
    expect(response.body.ok).toBe(false);
  });

  test("POST /api/call-request validates waitMinutes", async () => {
    const response = await request(app).post("/api/call-request").send({
      phone: "+380671234567",
      waitMinutes: 0,
    });

    expect(response.status).toBe(400);
    expect(response.body.ok).toBe(false);
  });

  test("Unknown /api route returns 404", async () => {
    const response = await request(app).get("/api/unknown");

    expect(response.status).toBe(404);
    expect(response.body.ok).toBe(false);
  });
});
