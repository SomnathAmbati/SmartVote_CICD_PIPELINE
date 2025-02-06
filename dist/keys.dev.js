"use strict";

require("dotenv").config(); // Load environment variables from .env file

module.exports = {
    MONGO_URI: process.env.MONGO_URI,  // Fetch from environment variable
    JWT_SECRET: process.env.JWT_SECRET // Fetch from environment variable
};
