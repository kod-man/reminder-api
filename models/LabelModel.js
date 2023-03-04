const mongoose = require("mongoose");

const { Schema } = mongoose;

const LabelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isFavorite: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// export the model
const Label = mongoose.model("Label", LabelSchema);
module.exports = Label;
