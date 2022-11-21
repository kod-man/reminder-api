const express = require("express");
const requireAuth = require("../utils/requireAuth");
const router = express.Router();

router.use(requireAuth);

router.post("/new-reminder", (req, res) => {
  console.log(req.body);
  try {
    res.send("Hello World");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
