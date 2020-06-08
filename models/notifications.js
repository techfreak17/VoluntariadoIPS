const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const NotificationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    }
});
module.exports = Notification = mongoose.model("Notifications", NotificationSchema);