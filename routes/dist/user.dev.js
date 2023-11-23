"use strict";

var express = require('express');

var router = express.Router();

var mongoose = require('mongoose');

var User = mongoose.model("User");

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var _require = require('../keys'),
    JWT_SECRET = _require.JWT_SECRET;

var requireLogin = require('../middleware/requireLogin');

router.post('/signup', function (req, res) {
  var _req$body = req.body,
      firstname = _req$body.firstname,
      lastname = _req$body.lastname,
      stateName = _req$body.stateName,
      email = _req$body.email,
      password = _req$body.password,
      pic = _req$body.pic,
      mobile = _req$body.mobile,
      city = _req$body.city,
      branch = _req$body.branch;

  if (!email || !password || !firstname || !mobile || !city || !branch) {
    return res.status(422).json({
      error: "Please add all the fields"
    });
  }

  User.findOne({
    email: email
  }).then(function (savedUser) {
    if (savedUser) {
      return res.status(422).json({
        error: "User already exists with that email"
      });
    }

    bcrypt.hash(password, 12).then(function (hashedpassword) {
      var user = new User({
        email: email,
        mobile: mobile,
        city: city,
        branch: branch,
        password: hashedpassword,
        firstname: firstname,
        lastname: lastname,
        stateName: stateName,
        pic: pic
      });
      user.save().then(function (user) {
        res.json({
          message: "Saved successfully"
        });
      })["catch"](function (err) {
        console.log(err);
      });
    });
  })["catch"](function (err) {
    console.log(err);
  });
});
router.post('/signin', function (req, res) {
  var _req$body2 = req.body,
      email = _req$body2.email,
      password = _req$body2.password;

  if (!email || !password) {
    return res.status(422).json({
      error: "Please add email or password"
    });
  }

  User.findOne({
    email: email
  }).then(function (savedUser) {
    if (!savedUser) {
      return res.status(422).json({
        error: "Invalid Email or password"
      });
    }

    bcrypt.compare(password, savedUser.password).then(function (doMatch) {
      if (doMatch) {
        var token = jwt.sign({
          _id: savedUser._id
        }, JWT_SECRET);
        var _id = savedUser._id,
            firstname = savedUser.firstname,
            lastname = savedUser.lastname,
            stateName = savedUser.stateName,
            _email = savedUser.email,
            pic = savedUser.pic,
            mobile = savedUser.mobile,
            city = savedUser.city,
            branch = savedUser.branch,
            isAdmin = savedUser.isAdmin;
        res.json({
          token: token,
          user: {
            _id: _id,
            firstname: firstname,
            lastname: lastname,
            stateName: stateName,
            email: _email,
            pic: pic,
            mobile: mobile,
            city: city,
            branch: branch,
            isAdmin: isAdmin
          }
        });
      } else {
        return res.status(422).json({
          error: "Invalid Email or password"
        });
      }
    })["catch"](function (err) {
      console.log(err);
    });
  });
});
router.put('/updatepic', requireLogin, function (req, res) {
  User.findByIdAndUpdate(req.user._id, {
    $set: {
      pic: req.body.pic
    }
  }, {
    "new": true
  }, function (err, result) {
    if (err) {
      return res.status(422).json({
        error: "Pic cannot be updated"
      });
    }

    res.json(result);
  });
});
module.exports = router;