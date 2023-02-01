const express = require("express");
const Project = require("../models/ProjectModel");

// const requireAuth = require('../utils/requireAuth');
const router = express.Router();

// add project if user is authenticated

router.post("/add", async (req, res) => {
  const { name, color, userId } = req.body;
  try {
    const newProject = new Project({
      name,
      color,
      userId,
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
    const projects = await Project.find({ userId });
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong", error });
  }
});
