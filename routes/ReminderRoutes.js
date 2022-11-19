const express = require("express");

const router = express.Router();

// it will be /api
router.get("/", (req, res) => {
  res.send("Hello World");
});

router.post("/new-reminder", (req, res) => {
  console.log(req.body);
  try {
    res.send("Hello World");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
