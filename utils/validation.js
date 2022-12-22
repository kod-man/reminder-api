const User = require('../models/UserModel');
const { EMAIL_RGX, PASSWORD_RGX, PrioList } = require('./constants');

const validateUser = (user) => {
  const { password, email } = user;
  const errors = {};

  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  }

  if (!email.match(EMAIL_RGX)) {
    errors.email = 'Email must be a valid email address';
  }

  if (password === '') {
    errors.password = 'Password must not be empty';
  }
  if (password.length < 7) {
    errors.password = 'Password must be at least 7 characters';
  }

  if (password.length > 20) {
    errors.password = 'Password must be less than 20 characters';
  }

  // check if user password includes at least one number one uppercase and one lowercase letter
  if (!password.match(PASSWORD_RGX)) {
    errors.password = 'Password must contain at least one number, one uppercase and one lowercase letter';
  }
  return {
    errors,
  };
};

const validateReminder = async (reminder) => {
  const { title, priority, date: givenDate, userId } = reminder;
  const errors = {};

  if (title.trim() === '') {
    errors.title = 'Title must not be empty';
  }

  // The expiration date as a timestamp
  const currentDate = new Date().getTime(); // The current date as a timestamp

  if (givenDate && currentDate > givenDate) {
    errors.date = 'Date must be in the future';
  }

  if (PrioList[priority] === undefined) {
    errors.priority = 'Priority must be one of the following: Low, Medium, High';
  }

  const user = await User.findById(userId || '');

  if (!user) {
    errors.userId = 'User does not exist';
  }

  return {
    errors,
  };
};

module.exports = {
  validateUser,
  validateReminder,
};
