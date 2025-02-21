//Routes for authentication & email verification
const express = require("express");
const { register, login, verifyEmail, resetPassword, forgotPassword } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register); // User registration
router.post("/login", login); // User login
router.get("/verify-email/:token", verifyEmail); // Email verification link
router.post("/forgot-password", forgotPassword); // Sends reset link to email
router.post("/reset-password/:token", resetPassword); // Resets password

module.exports = router;
