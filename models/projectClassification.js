const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FKHelper = require('./helpers/foreign-key-helper');

// Create Schema
const ProjectClassificationSchema = new Schema({
    projectID: {
        type: Schema.ObjectId,
        ref: 'Projects',
        validate: {
            validator: function (v) {
                return FKHelper(mongoose.model('Projects'), v);
            },
            message: `Project doesn't exist`
        }
    },
    userID: {
        type: Schema.ObjectId,
        ref: 'Users',
        validate: {
            validator: function (v) {
                return FKHelper(mongoose.model('Users'), v);
            },
            message: `User doesn't exist`
        }
    },
    title:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true
    }
});
module.exports = mongoose.model("ProjectClassification", ProjectClassificationSchema);