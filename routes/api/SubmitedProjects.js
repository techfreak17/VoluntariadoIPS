const express = require("express");
const router = express.Router();
var mongoose = require('mongoose');

// Load User model
const SubmitedProject = require("../../models/submitedProject");
const User = require("../../models/user");
const Company = require("../../models/company");
const Project = require("../../models/project");
const Administrator = require("../../models/administrator");

// Load input validation
const validateCreateProject = require("../../validation/createProject")
const createNotification = require("../../Notifications/pushNotifications");

const buildJSON = (...files) => {
  var obj = {}
  Object.assign(obj, files);
  return obj;
};

// @route POST api/submitedProjects/submitCreateProject
// @desc Submit Create Project - Company and AAIPS
// @access Private
router.post("/submitCreateProject", (req, res) => {
  const { errors, isValid } = validateCreateProject(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  SubmitedProject.findOne({ title: req.body.title }).then(project => {
    if (project) {
      return res.status(400).json({ title: "Project already exists" });
    } else {
      const newSubmitedProject = new SubmitedProject({
        title: req.body.title,
        synopsis: req.body.synopsis,
        intervationArea: req.body.intervationArea,
        target_audience: req.body.target_audience,
        objectives: req.body.objectives,
        description: req.body.description,
        date: req.body.date,
        interestAreas: req.body.interestAreas,
        photo: req.body.photo,
        observations: req.body.observations,
        relatedEntities: req.body.relatedEntities,
        responsibleID: req.body.responsibleID,
        requiredFormation: req.body.requiredFormation,
        formation: req.body.formation,
        vacancies: req.body.vacancies
      });
      newSubmitedProject
        .save()
        .then(newSubmitedProject => res.json(newSubmitedProject))
        .catch(err => console.log(err));

      User.findOne({ _id: mongoose.Types.ObjectId(newSubmitedProject.responsibleID) }).then(user => {
        if (user) {
          createNotification('proporProjetoEntidade', newSubmitedProject.title, user.email);
          createNotification('proporProjetoAdmin', newSubmitedProject.title, 'admin@teste.pt');
        }
      });
    }
  });
});

// @route GET api/submitedProjects/submitEditProject/:id
// @desc Submit Edit Project - Company and AAIPS
// @access Private
router.route('/submitEditProject/:id').get(function (req, res) {
  let id = req.params.id;
  SubmitedProject.findById(id, function (err, submitedProject) {
    res.json(submitedProject);
  });
});

// @route POST api/submitedProjects/submitUpdateProject/:id
// @desc Submit Update Project - Company and AAIPS
// @access Private
router.route('/submitUpdateProject/:id').post(function (req, res) {
  SubmitedProject.findById(req.params.id, function (err, submitedProject) {
    if (!submitedProject)
      res.status(404).send("data is not found");
    else {
      submitedProject.title = req.body.title;
      submitedProject.synopsis = req.body.synopsis,
        submitedProject.intervationArea = req.body.intervationArea,
        submitedProject.target_audience = req.body.target_audience,
        submitedProject.objectives = req.body.objectives,
        submitedProject.description = req.body.description,
        submitedProject.date = (req.body.date) ? req.body.date : null,
        submitedProject.interestAreas = req.body.interestAreas,
        submitedProject.observations = req.body.observations,
        submitedProject.relatedEntities = req.body.relatedEntities

      submitedProject.updateOne({
        title: submitedProject.title,
        synopsis: submitedProject.synopsis,
        intervationArea: submitedProject.intervationArea,
        target_audience: submitedProject.target_audience,
        objectives: submitedProject.objectives,
        description: submitedProject.description,
        date: submitedProject.date,
        interestAreas: submitedProject.interestAreas,
        observations: submitedProject.observations,
        relatedEntities: submitedProject.relatedEntities,
      }
      )
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// @route GET api/submitedProjects/submiteDeleteProject/:id
// @desc Submit Delete Project - Company and AAIPS
// @access Private
router.route('/submitDeleteProject/:id').get(function (req, res) {
  SubmitedProject.findByIdAndRemove({ _id: req.params.id }, function (err, project) {
    if (err) res.json(err);
    else res.json('Successfully removed');

    User.findOne({ _id: mongoose.Types.ObjectId(project.responsibleID) }).then(user => {
      if (user) {
        createNotification('recusarProjetoEntidade', project.title, user.email);
        createNotification('recusarProjetoAdmin', project.title, 'admin@teste.pt');
      }
    });
  });
});

// @route GET api/submitedProjects/listSubmitedProjects
// @desc Get List of Submited Projects
// @access Private
router.route('/listSubmitedProjects').get(function (req, res) {
  SubmitedProject.find(function (err, submitedProject) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(submitedProject);
    }
  });
});

// @route GET api/submitedProjects/searchSubmitedProject
// @desc Search Submited Project
// @access Private
router.post("/searchSubmitedProject", (req, res) => {
  SubmitedProject.find({ title: { $regex: req.body.search, $options: "i" } }).then(submitedProject => {
    if (submitedProject) {
      res.json(submitedProject);
    } else {
      res.status(404).send({ message: "Not found any project with that title" });
    }
  })
});

// @route GET api/submitedProjects/getSubmitedProjectUserDetails/:id
// @desc Get Project User Details
// @access Private
router.route('/getSubmitedProjectUserDetails/:id').get(function (req, res) {
  let id = req.params.id;
  SubmitedProject.findById(id, function (err, submitedProject) {
    let newId = submitedProject.responsibleID;
    User.findOne({ _id: newId }).then(user => {
      if (user.role === "Empresa") {
        Company.findOne({ responsibleID: newId }).then(company => {
          if (company) {
            
            res.json(buildJSON(submitedProject, user, company ));
          
          } else {
            return res.status(400).json({ company: "Such data doesn´t exist" });
          };
        })
      } else if (user.role === "Administrador") {
        Administrator.findOne().then(admin => {
          if (admin) {
            res.json(buildJSON(submitedProject, user, admin));
          } else {
            return res.status(400).json({ admin: "Such data doesn´t exist" });
          };
        })

      }
    })
  });
});

// @route POST api/submitedProjects/acceptSubmitedProject/:d
// @desc Accept Submited Project
// @access Private
router.route('/acceptSubmitedProject/:id').post(function (req, res) {
  SubmitedProject.findById({ _id: req.params.id }, function (err, project) {
    if (err) {
      res.json(err);
    }
    else {
      const newProject = new Project({
        title: project.title,
        synopsis: project.synopsis,
        intervationArea: project.intervationArea,
        target_audience: project.target_audience,
        objectives: project.objectives,
        description: project.description,
        date: project.date,
        interestAreas: project.interestAreas,
        photo: project.photo,
        observations: project.observations,
        relatedEntities: project.relatedEntities,
        responsibleID: project.responsibleID,
        requiredFormation: project.requiredFormation,
        formation: project.formation,
        vacancies: project.vacancies
      });
      newProject
        .save()
        .then(newProject => res.json(newProject))
        .catch(err => console.log(err));

      User.findOne({ _id: mongoose.Types.ObjectId(project.responsibleID) }).then(user => {
        if (user) {
          createNotification('aceitarProjetoEntidade', project.title, user.email);
          createNotification('aceitarProjetoAdmin', project.title, 'admin@teste.pt');
        }
      });

      project.deleteOne();
    }
  });
});

module.exports = router;