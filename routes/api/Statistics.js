const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const Project = require("../../models/project");
const ProjectClassification = require("../../models/projectClassification");
const ConcludedProject = require("../../models/concludedProject");
const SubmitedProject=require("../../models/submitedProject");

const { use } = require("passport");

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
          numberVotes: {$sum: 1}
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

// @route GET api/projects/getProjectUserDetails/:id
// @desc Get Company Projects Details
// @access Private
router.route('/getVoluntaryStatsData/:id').get(function (req, res) {
  let id = req.params.id;
  User.findOne({ _id: id }).then(user => {
    if(user){
      if (user.role === "Voluntário") {
        Project.find({enroled_IDs: user._id}).then(project => {
          ConcludedProject.find({enroled_IDs: user._id}).then(concludedProject => {
            if(project || concludedProject){
              res.json(buildJSON(project, concludedProject));
            }    
          })
        })
      }
    }
  });
});


// @route GET api/users/listProjects
// @desc Get List of Projects
// @access Private
router.route('/countProjects').get(function (req, res) {
    Project.estimatedDocumentCount(function (err, project) {
        ConcludedProject.estimatedDocumentCount(function (err, concluded) {
            SubmitedProject.estimatedDocumentCount(function (err, submited) {
                let array = [project,concluded,submited];
                res.send(array);
            });
        });
    });
});

module.exports = router;