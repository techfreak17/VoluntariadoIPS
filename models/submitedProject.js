const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FKHelper = require('./helpers/foreign-key-helper');

// Create Schema
const SubmitedProjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    synopsis: {
        type: String,
        required: true
    },
    intervationArea: {
        type: String,
        required: false
    },
    target_audience: {
        type: String,
        required: true
    },
    objectives: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    requiredFormation: {
        type: Boolean,
        required: false
    },
    formation: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true
    },
    interestAreas: {
        type: Array,
        required: true
    },
    relatedEntities:{
        type: Array,
        required: false
    },
    logo: {
        data: Buffer,
        contentType: String
    },
    observations: {
        type: String,
        required: false
    },
    authorization: {
        type: Boolean,
        required: true,
        default: false
    },
    responsibleID: {
        type: Schema.ObjectId,
        ref: 'Users',
        validate: {
            validator: function (v) {
                return FKHelper(mongoose.model('Users'), v);
            },
            message: `Users doesn't exist`
        }
    }
});

module.exports = mongoose.model("SubmitedProjects", SubmitedProjectSchema);