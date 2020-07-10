const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    role: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        required: false,
        default: false
    },
    passwordResetToken: {
        type: String,
        required: false
    },
    passwordResetExpires: {
        type: Date,
        required: false
    },
    img: { 
        data: Buffer, 
        contentType: String 
    }
});
module.exports = mongoose.model("Users", UserSchema);