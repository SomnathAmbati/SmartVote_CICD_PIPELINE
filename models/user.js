const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    city: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    stateName: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        default: "https://res.cloudinary.com/cnq/image/upload/v1586197723/noimage_d4ipmd.png"
    }
});

// ✅ Correctly export the model
module.exports = mongoose.model("User", userSchema);
