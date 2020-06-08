const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FKHelper = require('./helpers/foreign-key-helper');

// Create Schema
const CompanySchema = new Schema({
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
        required: true
    },
    address: {
        type: String,
        required: false
    },
    birthDate: {
        type: Date,
        required: true
    },
    observations: {
        type: String,
        required: false
    },
    companyName:{
        type: String,
        required: true
    },
    companyAddress:{
        type: String,
        required: true
    },
    authorization: {
        type: Boolean,
        required: true,
        default: false
    },
    listProjects:{
        type: Array,
        required: false
    },
    responsibleID: {
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
module.exports = Company = mongoose.model("Company", CompanySchema);