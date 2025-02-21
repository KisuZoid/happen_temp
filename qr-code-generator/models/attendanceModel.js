//Attendance schema (track user event attendance)
const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  checkInTime: { type: Date, default: Date.now },
  checkOutTime: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model("Attendance", attendanceSchema);

