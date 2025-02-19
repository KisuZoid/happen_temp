const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  scannedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
