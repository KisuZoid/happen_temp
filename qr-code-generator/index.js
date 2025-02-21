require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const qrRoutes = require("./routes/qrRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/qr", qrRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/attendance", attendanceRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => console.error("❌ Database connection error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

