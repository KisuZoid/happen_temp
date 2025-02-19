//QR scan and attendance marking
const Attendance = require("../models/attendanceModel");

exports.scanQR = async (req, res) => {
  try {
    const { qrData } = req.body;
    const [userId, eventId] = qrData.split("-");

    // Check if attendance already exists for this user & event
    const existingAttendance = await Attendance.findOne({ userId, eventId });
    if (existingAttendance) {
      return res.status(400).json({ message: "Already marked present" });
    }

    // Mark attendance if not already marked
    const newAttendance = new Attendance({ userId, eventId });
    await newAttendance.save();

    res.json({ message: "Attendance marked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

  