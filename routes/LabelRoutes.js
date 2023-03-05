const express = require("express");
const Label = require("../models/LabelModel");

// const requireAuth = require('../utils/requireAuth');
const router = express.Router();

router.get("/all/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const labels = await Label.find({ userId }).select(["name", "color", "_id", "isFavorite"]);
    return res.status(200).json(labels);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong", error });
  }
});

router.post("/add", async (req, res) => {
  const { name, color, userId, isFavorite } = req.body;
  try {
    const newLabel = new Label({
      name,
      color,
      userId,
      isFavorite,
    });

    await newLabel.save();
    return res.status(200).json({ message: "Label added successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong", error });
  }
});
module.exports = router;
