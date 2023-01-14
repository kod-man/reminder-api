const mongoose = require("mongoose");

const { Schema } = mongoose;
const UserSchema = new Schema(
  {
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      unique: true,
    },
    imageSrc: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// export the model
const User = mongoose.model("User", UserSchema);
module.exports = User;
