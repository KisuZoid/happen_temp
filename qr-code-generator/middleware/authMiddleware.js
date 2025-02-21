// JWT authentication & role-based access control
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized, no token provided" });
        }

        token = token.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password"); // Attach user info to req

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized, invalid token" });
        }

        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized, token failed" });
    }
};
