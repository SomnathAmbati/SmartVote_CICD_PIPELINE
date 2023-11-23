"use strict";

var express = require('express');

var router = express.Router();

var mongoose = require('mongoose');

var User = mongoose.model("User");
var Student = mongoose.model("Student");

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var _require = require('../keys'),
    JWT_SECRET = _require.JWT_SECRET;

var requireLogin = require('../middleware/requireLogin');

router.post('/stuReg', function (req, res) {
  console.log(req.body);
  var _req$body = req.body,
      name = _req$body.name,
      email = _req$body.email,
      password = _req$body.password,
      Roll_No = _req$body.Roll_No,
      clsName = _req$body.clsName,
      mobile = _req$body.mobile;

  if (!email || !password || !name || !Roll_No || !clsName) {
    return res.status(422).json({
      error: "Please add all the fields"
    });
  }

  Student.findOne({
    email: email
  }).then(function (savedUser) {
    if (savedUser) {
      return res.status(422).json({
        error: "User already exists with that email"
      });
    }

    bcrypt.hash(password, 12).then(function (hashedpassword) {
      var user = new Student({
        password: hashedpassword,
        name: name,
        email: email,
        Roll_No: Roll_No,
        clsName: clsName,
        mobile: mobile
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
router.post('/StuSign', function (req, res) {
  var _req$body2 = req.body,
      email = _req$body2.email,
      password = _req$body2.password;

  if (!email || !password) {
    return res.status(422).json({
      error: "Please add email or password"
    });
  }

  Student.findOne({
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
            name = savedUser.name,
            _email = savedUser.email,
            pic = savedUser.pic,
            mobile = savedUser.mobile,
            Roll_No = savedUser.Roll_No,
            clsName = savedUser.clsName;
        res.json({
          token: token,
          user: {
            _id: _id,
            name: name,
            email: _email,
            pic: pic,
            mobile: mobile,
            Roll_No: Roll_No,
            clsName: clsName
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
router.post('/getStuByClass', function (req, res) {
  console.log(req.body);
  Student.find({
    clsName: req.body.clsName
  }).then(function (posts) {
    res.json(posts);
  })["catch"](function (err) {
    console.log(err);
  });
});
router.post('/makeAttdence', requireLogin, function _callee(req, res) {
  var posts, _req$body3, timestamp, type, StudentId, dateId, obj;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Student.find({
            _id: req.body.StudentId
          }));

        case 2:
          posts = _context.sent;
          _req$body3 = req.body, timestamp = _req$body3.timestamp, type = _req$body3.type, StudentId = _req$body3.StudentId, dateId = _req$body3.dateId;
          obj = {
            timestamp: timestamp,
            type: type,
            StudentId: StudentId,
            dateId: dateId,
            madeBy: req.user.name
          };
          posts[0].attdenList.push(obj);
          posts[0].pList.push(dateId);
          posts[0].save();
          res.json(posts);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post("/profile", function (req, res) {
  console.log(req.body);
  Student.find({
    _id: req.body.id
  }).select("-password").then(function (admins) {
    res.json(admins);
  })["catch"](function (err) {
    console.log(err);
  });
});
module.exports = router;