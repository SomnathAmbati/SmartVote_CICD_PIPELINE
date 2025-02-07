const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: ""
    },
    votes: [{ 
        type: ObjectId, 
        ref: "User" 
    }],
    postedBy: {
        type: ObjectId, 
        ref: "User",
        required: true
    }
});

// ✅ Correctly export the model
module.exports = mongoose.model("Post", postSchema);
