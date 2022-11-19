// create a schema for reminder app
const mongoose = require("mongoose");
const { PrioList } = require("../utils/Constants");
const Schema = mongoose.Schema;
const ReminderSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      required: false,
    },
    time: {
      type: String,
      required: false,
    },
    priority: {
      type: String,
      required: false,
      default: PrioList.Low,
    },
  },
  {
    timestamps: true,
  }
);

// export the model
const Reminder = mongoose.model("Reminder", ReminderSchema);
module.exports = Reminder;
