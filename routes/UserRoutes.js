const express = require("express");
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");

const { validateUser } = require("../utils/validation");
const { createToken } = require("../utils/commonMethods");

const router = express.Router();

// it will be /user/...
router.post("/register", async (req, res) => {
  const { password, email } = req.body;

  try {
    const { errors } = validateUser(req.body);

    // check if there are any errors
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }
    const findUser = await User.findOne({ email: email });

    // if user already exists
    if (findUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // create a new user
    const newUser = new User({
      password: hash,
      email,
    });

    const response = await newUser.save();

    res.status(200).json({ message: "User created succesfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong.Please try again", error });
  }
});

// login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { errors } = validateUser(req.body);

    if (errors.keys?.length > 0) {
      return res.status(400).json(errors);
    }

    const findUser = await User.findOne({ email: email });

    // if user doesn't exist
    if (!findUser) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    // check if password is correct
    const isPasswordCorrect = bcrypt.compareSync(password, findUser.password);

    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const token = await createToken(findUser._id);
    const response = {
      token,
      user: {
        id: findUser._id,
        email: findUser.email,
      },
    };
    res.status(200).json({ message: "Login successful", response });
  } catch (error) {
    res.status(400).json({ message: "Error logging in", error });
  }
});

// export the router
module.exports = router;
