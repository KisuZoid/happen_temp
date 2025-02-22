const express = require("express");
const { markAttendance, getAttendance } = require("../controllers/attendanceController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/mark/:eventId", authMiddleware, markAttendance);
router.get("/:eventId", authMiddleware, getAttendance);

module.exports = router;



