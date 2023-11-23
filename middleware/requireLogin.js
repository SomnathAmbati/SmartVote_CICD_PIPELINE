const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../keys');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Student = mongoose.model('Student');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // authorization === Bearer ewefwegwrherhe
  if (!authorization) {
    return res.status(401).json({ error: 'You must be logged in' });
  }

  const token = authorization.replace('Bearer ', '');

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: 'You must be logged in' });
    }

    const { _id } = payload;

    // Use the appropriate model, either User or Student, based on your requirements
    Student.findById(_id)
      .then((userdata) => {
        if (!userdata) {
          // If no user is found, check the User model
          return User.findById(_id);
        }
        return userdata;
      })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ error: 'User not found' });
        }
        req.user = user;
        next();
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });
};
