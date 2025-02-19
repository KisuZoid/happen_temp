require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const qrRoutes = require("./routes/qrRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/qr", qrRoutes);
app.use("/api/attendance", attendanceRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected on Localhost"))
  .catch(err => console.error("Database Connection Failed:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
