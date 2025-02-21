const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendVerificationEmail, sendPasswordResetEmail } = require("../utils/emailService");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({ name, email, password: hashedPassword, role, isVerified: false });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    await sendVerificationEmail(user.email, token);

    res.status(201).json({ message: "User registered. Check email for verification link." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isVerified = true;
    await user.save();

    res.json({ message: "Email verified successfully!" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    if (!user.isVerified) return res.status(400).json({ message: "Verify your email first!" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    await sendPasswordResetEmail(user.email, token);

    res.json({ message: "Password reset link sent to email." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};



