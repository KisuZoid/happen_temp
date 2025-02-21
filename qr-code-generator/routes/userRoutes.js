const express = require("express");
const { getUserProfile, updateUserRole } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/profile", authMiddleware, getUserProfile);
router.put("/update-role/:userId", authMiddleware, roleMiddleware("admin"), updateUserRole);

module.exports = router;

