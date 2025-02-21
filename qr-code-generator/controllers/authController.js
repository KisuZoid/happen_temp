//Handles authentication (Login, Register, Email Verify, Reset Password, JWT)
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendVerificationEmail, sendPasswordResetEmail } = require("../utils/emailService");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });

    await newUser.save();
    sendVerificationEmail(newUser.email, newUser._id); // Send verification email

    res.status(201).json({ message: "User registered. Check email for verification." });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndUpdate(userId, { isVerified: true });
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Verification failed", error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: "Invalid credentials" });

    if (!user.isVerified) return res.status(403).json({ message: "Please verify your email first" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    sendPasswordResetEmail(user.email, user._id);
    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ message: "Error sending reset email", error });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(userId, { password: hashedPassword });
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Password reset failed", error });
  }
};

