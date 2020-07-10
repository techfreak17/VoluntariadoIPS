const express = require("express");
const router = express.Router();
var mongoose = require('mongoose');

const createNotification = require("../../Notifications/pushNotifications");

// Load User model
const Voluntary = require("../../models/voluntary");
const Project = require("../../models/project");
const User = require("../../models/user");


// @route POST api/voluntaries/joinProject/:id
// @desc Join Project
// @access Private
router.route('/joinProject/:id').post(function (req, res) {
    let id = req.params.id;
    User.findById(req.body.userID, function (err, user) {
        if (user.role === "Voluntário") {
            Voluntary.findOne({ userID: user._id }).then(voluntary => {
                Project.findById(id).then(project => {
                    if (project.vacancies > Object.keys(project.enroled_IDs).length) {
                        voluntary.listProjects.push(project._id);
                        voluntary.save().then(() => {
                            project.enroled_IDs.push(user._id);
                            project.save().then(() => {
                                createNotification('entrarProjeto', project.title, user.email);
                                res.status(200);
                            })
                        });
                    } else {
                        createNotification('semVagas', project.title, user.email);
                        res.status(403);
                    }
                })
            })
        }
    });
});

// @route POST api/voluntaries/unjoinProject/:id
// @desc Unjoin Project
// @access Private
router.route('/unjoinProject/:id').post(function (req, res) {
    let id = req.params.id;
    User.findById(req.body.userID, function (err, user) {
        if (user.role === "Voluntário") {
            Voluntary.findOne({ userID: user._id }).then(voluntary => {
                Project.findById(id).then(project => {
                    voluntary.listProjects.pull(project._id);
                    voluntary.save().then(() => {
                        project.enroled_IDs.pull(user._id);
                        project.save().then(() => {
                            createNotification('sairProjeto', project.title, user.email);
                            res.status(200);
                        })
                    })
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
    Project.find({ enroled_IDs: mongoose.Types.ObjectId(userID) }, {title: 1, synopsis: 1, date: 1, enroled_IDs: 1}, function (err, projects) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(projects);
        }
    });
});

// @route POST api/voluntaries/searchVoluntaryProject/:id
// @desc Search Project
// @access Private
router.post("/searchVoluntaryProject/:id", (req, res) => {
    let userID = req.params.id;
    Project.find({ enroled_IDs: mongoose.Types.ObjectId(userID), title: { $regex: req.body.search, $options: "i" } }, function (err, projects) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(projects);
        }
    });
});

module.exports = router;