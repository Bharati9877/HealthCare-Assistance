import express from "express";
import Reminder from "../models/Reminder.js";

const router = express.Router();

// 🟢 Create a new reminder
router.post("/", async (req, res) => {
  try {
    const { medicineName, time, frequency, userId } = req.body;
    const newReminder = new Reminder({ medicineName, time, frequency, userId });
    await newReminder.save();
    res.status(201).json({ message: "Reminder added successfully!", reminder: newReminder });
  } catch (error) {
    res.status(500).json({ error: "Failed to add reminder" });
  }
});

// 🔵 Get all reminders
router.get("/", async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reminders" });
  }
});

// 🟠 Delete a reminder by ID
router.delete("/:id", async (req, res) => {
  try {
    await Reminder.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Reminder deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete reminder" });
  }
});

export default router;
