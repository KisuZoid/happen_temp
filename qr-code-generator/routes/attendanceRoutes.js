//Attendance marking & record retrieval
const express = require("express");
const { markAttendance, getAttendanceRecords } = require("../controllers/attendanceController");
const { protect, isOrganizer } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/mark", protect, markAttendance); // Marks attendance when QR is scanned
router.get("/records/:eventId", protect, isOrganizer, getAttendanceRecords); // Organizer fetches attendance records

module.exports = router;

