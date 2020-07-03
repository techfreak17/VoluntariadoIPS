const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FKHelper = require('./helpers/foreign-key-helper');

// Create Schema
const ProjectSchema = new Schema({
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
        contentType: String,
        required: false
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
    },
    enroled_IDs: {
        type: Array,
        required: false
    },
    vacancies:{
        type: Number,
        required: true
    },
    ended:{
        type: Boolean,
        default: false
    },
    img: { 
        data: Buffer, 
        contentType: String 
    },
    file:{
        data: Buffer,
        contentType: String
    }
});
module.exports = mongoose.model("Projects", ProjectSchema);