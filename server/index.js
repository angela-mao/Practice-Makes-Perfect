const express = require("express");
const app = express(); // create express app
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());

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