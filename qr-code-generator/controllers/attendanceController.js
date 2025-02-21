//Handles attendance tracking and reports
const Attendance = require("../models/attendanceModel");
const Ticket = require("../models/ticketModel");
const mongoose = require("mongoose");

exports.markAttendance = async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: "Invalid userId or eventId" });
    }

    // Check if the user has a valid ticket
    const ticket = await Ticket.findOne({ userId, eventId });
    if (!ticket) return res.status(400).json({ message: "No valid ticket found for this event" });

    // Check if attendance is already marked
    const existingAttendance = await Attendance.findOne({ userId, eventId });
    if (existingAttendance) return res.status(400).json({ message: "Attendance already marked" });

    // Mark attendance
    const newAttendance = new Attendance({ userId, eventId, timestamp: new Date() });
    await newAttendance.save();

    res.status(200).json({ message: "Attendance marked successfully", attendance: newAttendance });
  } catch (error) {
    res.status(500).json({ message: "Error marking attendance", error });
  }
};

exports.getAttendanceByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: "Invalid eventId" });
    }

    const attendanceRecords = await Attendance.find({ eventId }).populate("userId", "name email");
    res.status(200).json({ attendance: attendanceRecords });
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance records", error });
  }
};

exports.getUserAttendance = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const userAttendance = await Attendance.find({ userId }).populate("eventId", "name date location");
    res.status(200).json({ attendance: userAttendance });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user attendance", error });
  }
};


