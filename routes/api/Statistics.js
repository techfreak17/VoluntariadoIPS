const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const Project = require("../../models/project");
const ProjectClassification = require("../../models/projectClassification");

const buildJSON = (...files) => {
  var obj = {}
  Object.assign(obj, files);
  return obj;
};

// @route GET api/users/listUsers
// @desc Get List Users
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

// @route GET api/projects/listProjects
// @desc Get List of Projects
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



module.exports = router;