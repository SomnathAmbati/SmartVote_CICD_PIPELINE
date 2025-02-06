const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const { MONGO_URI } = require('./keys');

// Connect to MongoDB
// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });


// Require models
require('./models/user');
require('./models/post');
require('./models/students');

// Middleware
app.use(express.json());
app.use(cors());

// Routes
// app.use(require('./routes/auth')); // Uncomment if auth route exists
app.use(require('./routes/post'));
app.use(require('./routes/user'));
app.use(require('./routes/student'));

// Start server
app.listen(PORT, () => {
    console.log("Server is running on", PORT);
});
