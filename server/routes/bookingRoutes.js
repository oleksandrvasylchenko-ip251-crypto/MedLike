// routes/bookingRoutes.js
const express = require("express");
const router = express.Router();
const { createBooking } = require("../controllers/bookingController");
const { validateBooking } = require("../middleware/validate");

// POST /api/booking
router.post("/", validateBooking, createBooking);

module.exports = router;
