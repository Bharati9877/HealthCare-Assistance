import React, { useState, useEffect } from "react";
import axios from "axios";

const TabletReminder = () => {
    const [reminders, setReminders] = useState([]);
    const [medicineName, setMedicineName] = useState("");
    const [time, setTime] = useState("");
    const [frequency, setFrequency] = useState("Daily");

    // Fetch reminders from backend
    useEffect(() => {
        axios.get("http://localhost:4000/api/reminders") // 🔹 Updated URL
            .then((res) => setReminders(res.data))
            .catch((err) => console.error("Error fetching reminders:", err));
    }, []);

    // Add a new reminder
    const addReminder = async () => {
        try {
            await axios.post("http://localhost:4000/api/reminders", { medicineName, time, frequency }); // 🔹 Updated URL
            alert("Reminder added successfully!");
            window.location.reload(); // Reload to see the new reminder
        } catch (error) {
            console.error("Error adding reminder:", error);
            alert("Failed to add reminder");
        }
    };

    return (
        <div>
            <h2>Tablet Reminders</h2>
            <input type="text" placeholder="Medicine Name" value={medicineName} onChange={(e) => setMedicineName(e.target.value)} />
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
            </select>
            <button onClick={addReminder}>Add Reminder</button>

            <h3>Your Reminders</h3>
            <ul>
                {reminders.map((reminder) => (
                    <li key={reminder._id}>
                        {reminder.medicineName} at {reminder.time} ({reminder.frequency})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TabletReminder;
