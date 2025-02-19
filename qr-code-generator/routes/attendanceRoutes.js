//Attendance API
const express = require("express");
const { scanQR } = require("../controllers/attendanceController");
const router = express.Router();

router.post("/scan", scanQR);

module.exports = router;
