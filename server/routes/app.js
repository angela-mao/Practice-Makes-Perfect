var express = require('express');
var router = express.Router();

router.get("/", (req, res) => {
  res.send("This is from express.js");
});

module.exports = router;