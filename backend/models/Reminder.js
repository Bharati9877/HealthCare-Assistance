import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
  medicineName: { type: String, required: true },
  time: { type: String, required: true },
  frequency: { type: String, required: true }, // e.g., "Daily", "Weekly"
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // If linked to a user
});

const Reminder = mongoose.model("Reminder", reminderSchema);
export default Reminder;
