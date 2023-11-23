"use strict";

var jwt = require('jsonwebtoken');

var _require = require('../keys'),
    JWT_SECRET = _require.JWT_SECRET;

var mongoose = require('mongoose');

var User = mongoose.model('User');
var Student = mongoose.model('Student');

module.exports = function (req, res, next) {
  var authorization = req.headers.authorization; // authorization === Bearer ewefwegwrherhe

  if (!authorization) {
    return res.status(401).json({
      error: 'You must be logged in'
    });
  }

  var token = authorization.replace('Bearer ', '');
  jwt.verify(token, JWT_SECRET, function (err, payload) {
    if (err) {
      return res.status(401).json({
        error: 'You must be logged in'
      });
    }

    var _id = payload._id; // Use the appropriate model, either User or Student, based on your requirements

    Student.findById(_id).then(function (userdata) {
      if (!userdata) {
        // If no user is found, check the User model
        return User.findById(_id);
      }

      return userdata;
    }).then(function (user) {
      if (!user) {
        return res.status(401).json({
          error: 'User not found'
        });
      }

      req.user = user;
      next();
    })["catch"](function (error) {
      console.error(error);
      res.status(500).json({
        error: 'Internal Server Error'
      });
    });
  });
};