const express = require('express');
const Reminder = require('../models/ReminderModels');
const { validateReminder } = require('../utils/validation');
// const requireAuth = require('../utils/requireAuth');
const router = express.Router();

// prevent user from accessing the route if not authenticated
// router.use(requireAuth);

// add reminder if user is authenticated

router.post('/add', async (req, res) => {
  const { title, priority, description, date, userId, label } = req.body;
  try {
    const errors = validateReminder(req.body);
    if (errors.keys?.length > 0) {
      return res.status(400).json(errors);
    }

    const newReminder = new Reminder({
      title,
      priority,
      description,
      date,
      userId,
      label,
    });

    await newReminder.save();
    return res.status(200).json({ message: 'Reminder added successfully' });
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong', error });
  }
});

// get all reminders for a user

router.get('/all/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const reminders = await Reminder.find({ userId });
    return res.status(200).json(reminders);
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong', error });
  }
});

module.exports = router;
