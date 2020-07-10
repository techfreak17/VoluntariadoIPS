const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const Project = require("../../models/project");
const ProjectClassification = require("../../models/projectClassification");
const ConcludedProject = require("../../models/concludedProject");
const SubmitedProject = require("../../models/submitedProject");
const Voluntary = require("../../models/voluntary");
const Company = require("../../models/company");
const Admin = require("../../models/administrator");

const buildJSON = (...files) => {
  var obj = {}
  Object.assign(obj, files);
  return obj;
};

// @route GET api/stats/countUsers
// @desc Count Users
// @access Private
router.route('/countUsers').get(function (req, res) {
  User.countDocuments({ role: "Voluntário" }, function (err, userVoluntary) {
    User.countDocuments({ role: "Empresa" }, function (err, userCompany) {
      User.countDocuments({ role: "Administrador" }, function (err, userAdmin) {
        let array = [userVoluntary, userCompany, userAdmin];
        res.send(array);
      });
    });
  });
});

// @route GET api/stats/listProjectsClassifications
// @desc Get Classifications of Projects
// @access Private
router.route('/listProjectsClassifications').get(function (req, res) {
  ProjectClassification.aggregate(
    [
      {
        $group:
        {
          _id: "$title",
          avgRating: { $avg: "$rating" },
          numberVotes: { $sum: 1 }
        }
      },

    ], function (err, project) {
      if (err) {
        res.json(err);
      }
      else {
        res.json(project);
      }
    });
});

// @route GET api/stats/getVoluntaryStatsData/:id
// @desc Get Voluntary Stats Data
// @access Private
router.route('/getVoluntaryStatsData/:id').get(function (req, res) {
  let id = req.params.id;
  User.findOne({ _id: id }).then(user => {
    if (user) {
      if (user.role === "Voluntário") {
        Project.find({ enroled_IDs: user._id }).then(project => {
          ConcludedProject.find({ enroled_IDs: user._id }).then(concludedProject => {
            if (project || concludedProject) {
              res.json(buildJSON(project, concludedProject));
            }
          })
        })
      }
    }
  });
});

// @route GET api/stats/countProjects
// @desc Get Count Projects
// @access Private
router.route('/countProjects').get(function (req, res) {
  Project.estimatedDocumentCount(function (err, project) {
    ConcludedProject.estimatedDocumentCount(function (err, concluded) {
      SubmitedProject.estimatedDocumentCount(function (err, submited) {
        let array = [project, concluded, submited];
        res.send(array);
      });
    });
  });
});

// @route GET api/stats/getAllProjects
// @desc Get All Projects
// @access Private
router.route('/getAllProjects').get(function (req, res) {
  Project.find({}, { title: 1 }).then(project => {
    ConcludedProject.find({}, { title: 1 }).then(concludedProject => {
      SubmitedProject.find({}, { title: 1 }).then(submitedProject => {
        if (project || concludedProject || submitedProject) {
          res.json(buildJSON(project, concludedProject, SubmitedProject));
        }
      })
    })
  })
});

// @route GET api/stats/getUsersInfo
// @desc Get Users Info
// @access Private
router.route('/getUsersInfo').get(function (req, res) {
    Voluntary.find({}, { name: 1, _id: 0 }).then(voluntary => {
      Company.find({}, { name: 1, _id: 0 }).then(company => {
        Admin.find({}, { name: 1, _id: 0 }).then(admin => {
          if (voluntary || company || admin) {
            res.json(buildJSON(voluntary, company, admin));
          }
        })
      })
    })
});

module.exports = router;