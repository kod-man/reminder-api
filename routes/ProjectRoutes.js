const express = require("express");
const Project = require("../models/ProjectModel");
const { nameValidation, userValidation } = require("../utils/validation");

// const requireAuth = require('../utils/requireAuth');
const router = express.Router();

// add project if user is authenticated

router.post("/add", async (req, res) => {
  const { name, color, userId, isFavorite } = req.body;
  try {
    // validate name and userId
    nameValidation(name, res);
    userValidation(userId, res);

    const newProject = new Project({
      name,
      color,
      userId,
      isFavorite,
    });

    await newProject.save();
    return res.status(200).json({ message: "Project added successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong", error });
  }
});

// get all projects for a user

router.get("/all/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    userValidation(userId, res);
    const projects = await Project.find({ userId });
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong", error });
  }
});

// delete project by id

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Project.findByIdAndDelete(id);
    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong", error });
  }
});

module.exports = router;
