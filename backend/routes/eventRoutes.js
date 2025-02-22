const express = require("express");
const { createEvent, getEvents, getEventById, deleteEvent } = require("../controllers/eventController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createEvent);
router.get("/", authMiddleware, getEvents);
router.get("/:id", authMiddleware, getEventById);
router.delete("/:id", authMiddleware, deleteEvent);

module.exports = router;

