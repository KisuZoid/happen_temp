const Event = require("../models/eventModel");

exports.createEvent = async (req, res) => {
  try {
    const { name, date, location } = req.body;
    const newEvent = new Event({ name, date, location });
    await newEvent.save();
    res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
};
