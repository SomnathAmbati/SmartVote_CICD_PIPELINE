"use strict";

var express = require('express');

var router = express.Router();

var mongoose = require('mongoose');

var requireLogin = require('../middleware/requireLogin');

var Post = mongoose.model('Post');
router.get('/posts/:postId', function (req, res) {
  var postId = req.params.postId;
  Post.findById(postId).then(function (post) {
    if (!post) {
      return res.status(404).json({
        error: 'Post not found'
      });
    }

    res.json({
      post: post
    });
  })["catch"](function (err) {
    console.log(err);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  });
});
router.get('/allpost', function (req, res) {
  Post.find().then(function (posts) {
    res.json({
      posts: posts
    });
  })["catch"](function (err) {
    console.log(err);
  });
});
router.get('/posts', function (req, res) {
  Post.find().then(function (posts) {
    res.json({
      posts: posts
    });
  })["catch"](function (err) {
    console.log(err);
  });
});
router.post('/createpost', function (req, res) {
  var _req$body = req.body,
      title = _req$body.title,
      pic = _req$body.pic;

  if (!title) {
    return res.status(422).json({
      error: 'Please add all the fields'
    });
  }

  var post = new Post({
    title: title,
    photo: pic,
    postedBy: 'admin'
  });
  post.save().then(function (result) {
    res.json({
      post: result
    });
  })["catch"](function (err) {
    console.log(err);
  });
});
router.put('/updatepost/:postId', requireLogin, function (req, res) {
  var _req$body2 = req.body,
      title = _req$body2.title,
      pic = _req$body2.pic;
  var postId = req.params.postId;

  if (!title) {
    return res.status(422).json({
      error: 'Please provide a title for the post'
    });
  }

  Post.findByIdAndUpdate(postId, {
    title: title,
    photo: pic
  }, {
    "new": true
  }).then(function (updatedPost) {
    res.json({
      post: updatedPost
    });
  })["catch"](function (err) {
    console.log(err);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  });
});
router["delete"]('/deletepost/:postId', requireLogin, function (req, res) {
  var postId = req.params.postId;
  Post.findByIdAndDelete(postId).then(function (deletedPost) {
    if (!deletedPost) {
      return res.status(404).json({
        error: 'Post not found'
      });
    }

    res.json({
      message: 'Post deleted successfully',
      post: deletedPost
    });
  })["catch"](function (err) {
    console.log(err);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  });
});
router.put('/vote', requireLogin, function _callee(req, res) {
  var _req$body3, postId, userId, result;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body3 = req.body, postId = _req$body3.postId, userId = _req$body3.userId;
          _context.next = 4;
          return regeneratorRuntime.awrap(Post.findByIdAndUpdate(postId, {
            $push: {
              votes: userId
            }
          }, {
            "new": true
          }).exec());

        case 4:
          result = _context.sent;
          // Add your logic here for a successful vote
          res.json(result);
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          res.status(422).json({
            error: _context.t0.message
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
module.exports = router;