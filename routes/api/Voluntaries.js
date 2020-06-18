const express = require("express");
const router = express.Router();
var mongoose = require('mongoose');

const createNotification = require("../../Notifications/pushNotifications");

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
                    createNotification('entrarProjeto', project.title, user.email);
                })
            })
        }
    });
});

// @route POST api/voluntaries/unjoinProject/:id
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
                    createNotification('sairProjeto', project.title, user.email);
                })
            })
        }
    });
});

// @route GET api/voluntaries/listVoluntaryProjects/:id
// @desc Get List of Projects
// @access Private
router.route('/listVoluntaryProjects/:id').get(function (req, res) {
    let userID = req.params.id;
    Project.find({ enroled_IDs: mongoose.Types.ObjectId(userID) },function (err, projects) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(projects);
        }
    });
});

// @route GET api/voluntaries/searchVoluntaryProject/:id
// @desc Search Project
// @access Private
router.post("/searchVoluntaryProject/:id", (req, res) => {
    let userID = req.params.id;
    Project.find({ enroled_IDs: mongoose.Types.ObjectId(userID), title: { $regex: req.body.search, $options: "i" } },function (err, projects) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(projects);
        }
    });
  });
  
module.exports = router;