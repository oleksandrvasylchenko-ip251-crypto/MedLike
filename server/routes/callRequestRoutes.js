// routes/callRequestRoutes.js
const express = require("express");
const router = express.Router();
const { createCallRequest } = require("../controllers/callRequestController");
const { validateCallRequest } = require("../middleware/validate");

// POST /api/call-request
router.post("/", validateCallRequest, createCallRequest);

module.exports = router;
