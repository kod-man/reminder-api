const express = require('express');
// const requireAuth = require('../utils/requireAuth');
const router = express.Router();

// prevent user from accessing the route if not authenticated
// router.use(requireAuth);

// add reminder if user is authenticated

router.post('/add', (req, res) => {
  console.log(req.body);
  try {
    // const errors = validateReminder(req.body);
    res.send('Hello World');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
