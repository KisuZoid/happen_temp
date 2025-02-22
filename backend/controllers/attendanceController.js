const Attendance = require("../models/attendanceModel");

exports.markAttendance = async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    const alreadyMarked = await Attendance.findOne({ userId, eventId });
    if (alreadyMarked) return res.status(400).json({ message: "Attendance already marked" });

    const attendance = new Attendance({ userId, eventId });
    await attendance.save();

    res.json({ message: "Attendance marked successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getAttendanceList = async (req, res) => {
  try {
    const attendance = await Attendance.find().populate("userId", "name email").populate("eventId", "title");
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


