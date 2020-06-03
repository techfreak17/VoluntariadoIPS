const express = require("express");
const router = express.Router();

// Load User model
const Voluntary = require("../../models/voluntary");
const User = require("../../models/user");

// @route GET api/voluntaries/getVoluntaryUserDetails/:id
// @desc Get Voluntary User Details
// @access Private
router.route('/getVoluntaryUserDetails/:id').get(function (req, res) {
    let id = req.params.id;
    User.findById(id, function (err, user) {
        Voluntary.findOne({ userID: user._id }).then(voluntary => {
            if (voluntary) {
                res.json(voluntary);
            } else {
                return res.status(400).json({ user: "Such data doesn´t exist" });
            };
        })
    });
});


module.exports = router;