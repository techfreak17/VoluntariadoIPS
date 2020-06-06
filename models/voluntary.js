const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FKHelper = require('./helpers/foreign-key-helper');

// Create Schema
const VoluntarySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: false
    },
    birthDate: {
        type: Date,
        required: true
    },
    memberIPS: {
        type: String,
        required: true
    },
    schoolIPS: {
        type: String,
        required: true
    },
    courseIPS: {
        type: String,
        required: false
    },
    interestAreas: {
        type: Array,
        required: true
    },
    reasons: {
        type: Array,
        required: true
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
    listProjects: {
        type: Array,
        required: false
    },
    userID: {
        type: Schema.ObjectId,
        ref: 'Users',
		validate: {
			validator: function(v) {
				return FKHelper(mongoose.model('Users'), v);
			},
			message: `Users doesn't exist`
		}
    }
});
module.exports = mongoose.model("Voluntary", VoluntarySchema);