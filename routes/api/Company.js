const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Load User model
const Project = require("../../models/project");
const SubmitedProject = require("../../models/submitedProject");

// @route GET api/companies/listCompanyProjects/:id
// @desc Get List of Projects
// @access Private
router.route('/listCompanyProjects/:id').get(function (req, res) {
    let userID = req.params.id;
    Project.find({ responsibleID: mongoose.Types.ObjectId(userID) },function (err, projects) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(projects);
        }
    });
});

// @route GET api/companies/listCompanyProjects/:id
// @desc Get List of Projects
// @access Private
router.route('/listCompanySubmitedProjects/:id').get(function (req, res) {
    let userID = req.params.id;
    SubmitedProject.find({ responsibleID: mongoose.Types.ObjectId(userID) },function (err, projects) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(projects);
        }
    });
});

// @route POST api/voluntaries/searchCompanyProject/:id
// @desc Search Project
// @access Private
router.post("/searchCompanyProject/:id", (req, res) => {
    let userID = req.params.id;
    Project.find({ responsibleID: mongoose.Types.ObjectId(userID), title: { $regex: req.body.search, $options: "i" } },function (err, projects) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(projects);
        }
    });
  });

module.exports = router;