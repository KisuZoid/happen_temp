const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  collegeId: String,
  role: { type: String, enum: ["student", "club_admin"] },
  tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ticket" }],
});

module.exports = mongoose.model("User", UserSchema);
