const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Load User model
const User = require("../../models/user");
const Company = require("../../models/company");
const Project = require("../../models/project");
const SubmitedProject = require("../../models/submitedProject");

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

// @route GET api/voluntaries/searchCompanyProject/:id
// @desc Search Project
// @access Private
router.post("/searchCompanyProject/:id", (req, res) => {
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