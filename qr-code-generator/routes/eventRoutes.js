//Routes for event management
const express = require("express");
const { createEvent, getEvents, updateEvent, deleteEvent } = require("../controllers/eventController");
const { protect, isOrganizer } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/create", protect, isOrganizer, createEvent); // Organizer creates an event
router.get("/", getEvents); // Publicly available events
router.put("/update/:id", protect, isOrganizer, updateEvent); // Organizer updating an event
router.delete("/delete/:id", protect, isOrganizer, deleteEvent); // Organizer deleting an event

module.exports = router;
