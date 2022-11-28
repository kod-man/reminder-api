const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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

    // relationships with other models
    reminders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reminder",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// export the model
const User = mongoose.model("User", UserSchema);
module.exports = User;
