const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TokenSchema = new Schema({
    _userEmail:{
        type: String,
        required: true,
        ref: 'Users'
    },
    token:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    },
    expiresIn: {
        type: Number,
        default: 43200
    }
});
module.exports = Token = mongoose.model("Token",TokenSchema);