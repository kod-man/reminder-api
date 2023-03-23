const express = require("express");
const Filter = require("../models/FilterModel");
const { nameValidation, userValidation } = require("../utils/validation");

// const requireAuth = require('../utils/requireAuth');
const router = express.Router();

router.get("/all/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    userValidation(userId, res);
    const filters = await Filter.find({ userId }).select(["name", "color", "_id", "isFavorite"]);
    return res.status(200).json(filters);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong", error });
  }
});

router.post("/add", async (req, res) => {
  const { name, color, userId, isFavorite } = req.body;

  // validate name and userId
  userValidation(userId, res);
  nameValidation(name, res);

  try {
    const newFilter = new Filter({
      name,
      color,
      userId,
      isFavorite,
    });

    await newFilter.save();
    return res.status(200).json({ message: "Filter added successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong", error });
  }
});
module.exports = router;
