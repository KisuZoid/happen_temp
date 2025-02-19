const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  eventName: String,
  eventDate: Date,
  location: String,
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Event", EventSchema);
