const mongoose = require("mongoose");

const { Schema } = mongoose;

const FilterSchema = new Schema(
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
  },
);

// export the model
const Filter = mongoose.model("Filter", FilterSchema);
module.exports = Filter;
