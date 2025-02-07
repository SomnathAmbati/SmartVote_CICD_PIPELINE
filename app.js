require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const { MONGO_URI } = require('./keys');

// ✅ Load Models First
require('./models/user'); 
require('./models/post');
require('./models/students');

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB is connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));


// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ Routes
app.use(require('./routes/post'));
app.use(require('./routes/user'));
app.use(require('./routes/student'));

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
