const express = require("express");
const app = express(); // create express app

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("This is from express.js");
});

app.get("/api", (req, res) => {
  res.json({ message: "example message value" });
});

// start express server on port
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});