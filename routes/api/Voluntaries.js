const express = require("express");
const router = express.Router();

// Load User model
const Voluntary = require("../../models/voluntary");
const Project = require("../../models/project");
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

// @route POST api/voluntaries/joinProject/:id
// @desc Join Project
// @access Private
router.route('/joinProject/:id').post(function (req, res) {
    let id = req.params.id;
    User.findById(req.body.userID, function (err, user) {
        if (user.role === "Voluntário") {
            Voluntary.findOne({ userID: user._id }).then(voluntary => {
                Project.findById(id).then(project => {
                    voluntary.listProjects.push(project._id);
                    voluntary.save();
                    project.enroled_IDs.push(user._id);
                    project.save();
                })
            })
        }
    });
});

// @route POST api/voluntaries/joinProject/:id
// @desc Join Project
// @access Private
router.route('/unjoinProject/:id').post(function (req, res) {
    let id = req.params.id;
    User.findById(req.body.userID, function (err, user) {
        if (user.role === "Voluntário") {
            Voluntary.findOne({ userID: user._id }).then(voluntary => {
                Project.findById(id).then(project => {
                    voluntary.listProjects.pull(project._id);
                    voluntary.save();
                    project.enroled_IDs.pull(user._id);
                    project.save();
                })
            })
        }
    });
});


module.exports = router;