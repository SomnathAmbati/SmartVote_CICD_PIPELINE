"use strict";

// app.js
var express = require('express');

var app = express();

var mongoose = require('mongoose');

var cors = require('cors');

var PORT = process.env.PORT || 5000;

var _require = require('./keys'),
    MONGO_URI = _require.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('connected', function () {
  console.log("MongoDB is connected");
});
mongoose.connection.on('error', function (err) {
  console.error('MongoDB connection error:', err);
});

require('./models/user');

require('./models/post');

require('./models/students');

app.use(express.json());
app.use(cors()); // app.use(require('./routes/auth'));

app.use(require('./routes/post'));
app.use(require('./routes/user'));
app.use(require('./routes/student'));
app.listen(PORT, function () {
  console.log("Server is running on", PORT);
});