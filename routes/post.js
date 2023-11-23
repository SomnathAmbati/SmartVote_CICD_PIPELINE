const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model('Post');

router.get('/posts/:postId', (req, res) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then(post => {
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json({ post });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

router.get('/allpost', (req, res) => {
  Post.find()
    .then(posts => {
      res.json({ posts });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get('/posts', (req, res) => {
  Post.find()
    .then(posts => {
      res.json({ posts });
    })
    .catch(err => {
      console.log(err);
    });
});

router.post('/createpost', (req, res) => {
  const { title, pic } = req.body;
  if (!title) {
    return res.status(422).json({ error: 'Please add all the fields' });
  }
  const post = new Post({
    title,
    photo: pic,
    postedBy: 'admin',
  });
  post
    .save()
    .then(result => {
      res.json({ post: result });
    })
    .catch(err => {
      console.log(err);
    });
});

router.put('/updatepost/:postId', requireLogin, (req, res) => {
  const { title, pic } = req.body;
  const postId = req.params.postId;

  if (!title) {
    return res.status(422).json({ error: 'Please provide a title for the post' });
  }

  Post.findByIdAndUpdate(
    postId,
    {
      title,
      photo: pic,
    },
    { new: true }
  )
    .then(updatedPost => {
      res.json({ post: updatedPost });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

router.delete('/deletepost/:postId', requireLogin, (req, res) => {
  const postId = req.params.postId;

  Post.findByIdAndDelete(postId)
    .then(deletedPost => {
      if (!deletedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json({ message: 'Post deleted successfully', post: deletedPost });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

router.put('/vote', requireLogin, async (req, res) => {
  try {
    const { postId, userId } = req.body;

    const result = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { votes: userId },
      },
      {
        new: true,
      }
    ).exec();

    // Add your logic here for a successful vote
    res.json(result);
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
});


module.exports = router;
