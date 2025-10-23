// server.js
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 4000;

// Serve static files from public and assets folders
app.use(express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Read schedule
function loadSchedule() {
  const filePath = path.join(__dirname, "schedule.json");
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

// Endpoint for device schedule
app.get("/schedule", (req, res) => {
  const device = req.query.device;
  if (!device) return res.status(400).json({ error: "Device ID required" });

  const schedule = loadSchedule();
  const deviceData = schedule[device] || schedule["default"];

  res.json({
    now: Date.now(),
    device,
    content: deviceData,
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
