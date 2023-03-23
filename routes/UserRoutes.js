const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");

const { validateUser, userValidation, nameValidation } = require("../utils/validation");
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

    const user = await User.find({ email });

    // if user already exists
    if (user.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // create a new user
    const newUser = new User({
      password: hash,
      email,
    });

    await newUser.save();

    return res.status(200).json({ message: "User created succesfully" });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong.Please try again", error });
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

    const findUser = await User.findOne({ email });

    // if user doesn't exist
    if (!findUser) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // check if password is correct
    const isPasswordCorrect = bcrypt.compareSync(password, findUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = await createToken(findUser._id);
    const response = {
      token,
      user: {
        id: findUser._id,
      },
    };
    return res.status(200).json({ message: "Login successful", response });
  } catch (error) {
    return res.status(400).json({ message: "Error logging in", error });
  }
});

router.get("/me/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    userValidation(userId, res);
    const user = await User.findById(userId).select(["userName", "email", "_id", "imageSrc"]);
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ message: "Error getting user", error });
  }
});

// update user
router.put("/username", async (req, res) => {
  const { userName, imageSrc, userId } = req.body;
  try {
    nameValidation(userName, res);
    userValidation(userId, res);
    await User.findByIdAndUpdate({ _id: userId }, { $set: { userName, imageSrc } }, { new: true });
    return res.status(200).json({ message: "Succesfully updated" });
  } catch (error) {
    return res.status(400).json({ message: "Error updating user", error });
  }
});

// export the router
module.exports = router;
