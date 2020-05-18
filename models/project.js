const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    contact_person: {
        type: String,
        required: true
    },
    email_person: {
        type: String,
        required: true
    },
    phone_person: {
        type: Number,
        required: true
    },
    synopsis: {
        type: String,
        required: true
    },
    target_audience: {
        type: String,
        required: true
    },
    objectives: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    areas: {
        type: Array,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    related_entities: {
        type: Array,
        required: true
    },
    observations: {
        type: String,
        required: true
    },
    authorization: {
        type: Boolean,
        required: true
    },
    user_in_charge: {
        type: Number,
        required: true
    }
});
module.exports = Project = mongoose.model("Projects", ProjectSchema);