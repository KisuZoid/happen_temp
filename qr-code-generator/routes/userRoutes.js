//Routes for user operations
const express = require("express");
const { getUserProfile, updateUserRole, deleteUser } = require("../controllers/userController");
const { protect, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/profile", protect, getUserProfile); // Get logged-in user's profile
router.put("/update-role/:id", protect, isAdmin, updateUserRole); // Admin updating user role
router.delete("/delete/:id", protect, isAdmin, deleteUser); // Admin deleting a user

module.exports = router;
