const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  timestamp: { type: Date, default: Date.now }
});

attendanceSchema.index({ userId: 1, eventId: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendanceSchema);


