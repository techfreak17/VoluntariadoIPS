const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FKHelper = require('./helpers/foreign-key-helper');

// Create Schema
const AdministratorSchema = new Schema({
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
module.exports = mongoose.model("Administrator", AdministratorSchema);