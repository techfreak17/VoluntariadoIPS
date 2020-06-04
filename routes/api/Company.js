const express = require("express");
const router = express.Router();

// Load User model
const User = require("../../models/user");
const Company = require("../../models/company");

// @route GET api/companies/getCompanyUserDetails/:id
// @desc Get Company User Details
// @access Private
router.route('/getCompanyUserDetails/:id').get(function (req, res) {
    let id = req.params.id;
    User.findById(id, function (err, user) {
        Company.findOne({ userID: user._id }).then(company => {
            if (company) {
                res.json(company);
            } else {
                return res.status(400).json({ user: "Such data doesn´t exist" });
            };
        })
    });
});

module.exports = router;