const express = require("express");
const router = express.Router();

// Load User model
const AAIPS = require("../../models/aaips");
const User = require("../../models/user");

// @route GET api/aaips/getAAIPSUserDetails/:id
// @desc Get AAIPS User Details
// @access Private
router.route('/getAAIPSUserDetails/:id').get(function (req, res) {
    let id = req.params.id;
    User.findById(id, function (err, user) {
        AAIPS.findOne({ userID: user._id }).then(aaips => {
            if (aaips) {
                res.json(aaips);
            } else {
                return res.status(400).json({ user: "Such data doesn´t exist" });
            };
        })
    });
});


module.exports = router;