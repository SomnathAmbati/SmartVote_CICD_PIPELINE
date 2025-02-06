"use strict";

var express = require('express');

var app = express();

var mongoose = require('mongoose');

var cors = require('cors');

var PORT = process.env.PORT || 5000;

var _require = require('./keys'),
    MONGO_URI = _require.MONGO_URI; // Connect to MongoDB


mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('connected', function () {
  console.log("MongoDB is connected");
});
mongoose.connection.on('error', function (err) {
  console.error('MongoDB connection error:', err);
}); // Require models

require('./models/user');

require('./models/post');

require('./models/students'); // Middleware


app.use(express.json());
app.use(cors()); // Routes
// app.use(require('./routes/auth')); // Uncomment if auth route exists

app.use(require('./routes/post'));
app.use(require('./routes/user'));
app.use(require('./routes/student')); // Start server

app.listen(PORT, function () {
  console.log("Server is running on", PORT);
});