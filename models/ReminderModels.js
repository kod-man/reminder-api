// create a schema for reminder app
const mongoose = require('mongoose');
const { PrioList } = require('../utils/constants');

const { Schema } = mongoose;
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
    priority: {
      type: String,
      required: false,
      default: PrioList.Low,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// export the model
const Reminder = mongoose.model('Reminder', ReminderSchema);
module.exports = Reminder;
