const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const validRoles = ["admin", "user", "organizer"];
    if (!validRoles.includes(role)) return res.status(400).json({ message: "Invalid role" });

    await User.findByIdAndUpdate(userId, { role });
    res.json({ message: "User role updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating role", error });
  }
};


