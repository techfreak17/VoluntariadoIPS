const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Project = require("../../models/project");
const ConcludedProject = require("../../models/concludedProject");
const User = require("../../models/user");
const Company = require("../../models/company");
const Administrator = require("../../models/administrator");
const Voluntary = require("../../models/voluntary");
const ProjectClassification = require("../../models/projectClassification");
const createNotification = require("../../Notifications/pushNotifications");

const buildJSON = (...files) => {
  var obj = {}
  Object.assign(obj, files);
  return obj;
};

// Load input validation
const validateCreateProject = require("../../validation/createProject");
const projectClassification = require("../../models/projectClassification");
const concludedProject = require("../../models/concludedProject");

// @route POST api/projects/createProject
// @desc Create Project - Administrator
// @access Private
router.post("/createProject", (req, res) => {
  // Form validation
  const { errors, isValid } = validateCreateProject(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Project.findOne({ title: req.body.title }).then(project => {
    if (project) {
      return res.status(400).json({ title: "Project already exists" });
    } else {
      Company.findOne({ name: req.body.responsibleID }).then(company => {
        const newProject = new Project({
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
          responsibleID: company.responsibleID,
          requiredFormation: req.body.requiredFormation,
          formation: req.body.formation,
          vacancies: req.body.vacancies
        });
        createNotification('novoProjeto', req.body.title, 'admin@teste.pt');
        newProject
          .save()
          .then(project => res.json(project))
          .catch(err => console.log(err));
      })
    }
  });
});

// @route GET api/projects/editProject
// @desc Edit Project - Administrator
// @access Private
router.route('/editProject/:id').get(function (req, res) {
  let id = req.params.id;
  Project.findById(id, function (err, project) {
    res.json(project);
  });
});

// @route POST api/projects/updateProject
// @desc Update Project - Administrator
// @access Private
router.route('/updateProject/:id').post(function (req, res) {
  // Form validation
  const { errors, isValid } = validateCreateProject(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Project.findById(req.params.id, function (err, project) {
    if (!project)
      res.status(404).send("data is not found");
    else {
      if (req.body.responsibleID !== undefined) {
        Company.findOne({ name: req.body.responsibleID }).then(company => {
          project.title = req.body.title;
          project.synopsis = req.body.synopsis,
            project.intervationArea = req.body.intervationArea,
            project.target_audience = req.body.target_audience,
            project.objectives = req.body.objectives,
            project.description = req.body.description,
            project.date = (req.body.date) ? req.body.date : null,
            project.interestAreas = req.body.interestAreas,
            project.observations = req.body.observations,
            project.relatedEntities = req.body.relatedEntities,
            project.vacancies = req.body.vacancies,
            project.responsibleID = company.responsibleID

          project.updateOne({
            title: project.title,
            synopsis: project.synopsis,
            intervationArea: project.intervationArea,
            target_audience: project.target_audience,
            objectives: project.objectives,
            description: project.description,
            date: project.date,
            interestAreas: project.interestAreas,
            observations: project.observations,
            relatedEntities: project.relatedEntities,
            responsibleID: project.responsibleID,
            vacancies: project.vacancies
          })
            .catch(err => {
              res.status(400).send("unable to update the database");
            });
        })
        createNotification('projetoEditado', project.title, 'admin@teste.pt');
      } else {
        project.title = (req.body.title) ? req.body.title : null;
        project.synopsis = (req.body.synopsis) ? req.body.title : null,
          project.intervationArea = (req.body.intervationArea) ? req.body.intervationArea : null,
          project.target_audience = (req.body.target_audience) ? req.body.target_audience : null,
          project.objectives = (req.body.objectives) ? req.body.objectives : null,
          project.description = (req.body.description) ? req.body.description : null,
          project.date = (req.body.date) ? req.body.date : null,
          project.interestAreas = (req.body.interestAreas) ? req.body.interestAreas : null,
          project.observations = (req.body.observations) ? req.body.observations : null,
          project.vacancies = (req.body.vacancies) ? req.body.vacancies : null,
          project.relatedEntities = (req.body.relatedEntities) ? req.body.relatedEntities : null

        project.updateOne({
          title: project.title,
          synopsis: project.synopsis,
          intervationArea: project.intervationArea,
          target_audience: project.target_audience,
          objectives: project.objectives,
          description: project.description,
          date: project.date,
          interestAreas: project.interestAreas,
          observations: project.observations,
          relatedEntities: project.relatedEntities,
          vacancies: project.vacancies
        })
          .catch(err => {
            res.status(400).send("unable to update the database");
          });
      }
    }
  });
});

// @route GET api/projects/deleteProject
// @desc Delete Project - Administrator
// @access Private
router.route('/deleteProject/:id').get(function (req, res) {
  Project.findById({ _id: req.params.id }, function (err, project) {
    if (err) {
      res.json(err);
    }
    else {
      project.deleteOne();
      createNotification('projetoRemovido', project.title, 'admin@teste.pt');
    }
  });
});

// @route GET api/projects/listProjects
// @desc Get List of Projects
// @access Private
router.route('/listProjects').get(function (req, res) {
  Project.find(function (err, projects) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(projects);
    }
  });
});

// @route GET api/projects/searchProject
// @desc Search Project
// @access Private
router.post("/searchProject", (req, res) => {
  Project.find({ title: { $regex: req.body.search, $options: "i" } }).then(project => {
    if (project) {
      res.json(project);
    } else {
      res.status(404).send({ message: "Not found any project with that title" });
    }
  })
});

// @route GET api/projects/getProjectUserDetails/:id
// @desc Get Project User Details
// @access Private
router.route('/getProjectUserDetails/:id').get(function (req, res) {
  let id = req.params.id;
  Project.findById(id, function (err, project) {
    let newId = project.responsibleID;
    User.findOne({ _id: newId }).then(user => {
      if (user.role === "Empresa") {
        Company.findOne({ responsibleID: newId }).then(company => {
          if (company) {
            res.json(company);
          } else {
            return res.status(400).json({ company: "Such data doesn´t exist" });
          };
        })
      } else if (user.role === "Administrador") {
        Administrator.findOne().then(admin => {
          if (admin) {
            res.json(admin);
          } else {
            return res.status(400).json({ admin: "Such data doesn´t exist" });
          };
        })

      }
    })
  });
});

// @route GET api/projects/getProjectVoluntaries/:id
// @desc Get Project Voluntaries
// @access Private
router.route('/getProjectVoluntaries/:id').get(function (req, res) {
  let id = req.params.id;
  Project.findById(id, function (err, project) {
    if (project) {
      Voluntary.find({ 'userID': { $in: project.enroled_IDs } }, function (err, user) {
        if (user) {
          res.json(user);
        }
        else {
          return res.status(404).json({ user: 'User não encontrado' });
        }
      });

    }
    else {
      return res.status(404).json({ project: 'Projeto não foi encontrado' });
    }

  });
});

// @route GET api/projects/getProjectUserDetails/:id
// @desc Get Company Projects Details
// @access Private
router.route('/getCompanyProjectDetails/:id').get(function (req, res) {
  let id = req.params.id;
  Project.findById(id, function (err, project) {
    let newId = project.responsibleID;
    User.findOne({ _id: newId }).then(user => {
      if (user.role === "Empresa") {
        Company.findOne({ responsibleID: newId }).then(company => {
          if (company) {
            res.json(buildJSON(project, user, company));
          } else {
            return res.status(400).json({ company: "Such data doesn´t exist" });
          };
        })
      } else if (user.role === "Administrador") {
        Administrator.findOne().then(admin => {
          if (admin) {
            res.json(buildJSON(project, user, admin));
          } else {
            return res.status(400).json({ admin: "Such data doesn´t exist" });
          };
        })
      }
    })
  });
});

router.route('/removeVoluntary/:id').post(function (req, res) {
  let id = req.params.id;
  Voluntary.findById(mongoose.Types.ObjectId(id), function (err, voluntary) {
    User.findById(voluntary.userID).then(user => {
      if (user.role === "Voluntário") {
        Project.findById(req.body.projectID).then(project => {
            voluntary.listProjects.pull(project._id);
            voluntary.save();
            project.enroled_IDs.pull(user._id);
            project.save();
            createNotification('sairProjeto', project.title, user.email);
        })
    }
    })
  });
});
// @route POST api/projects/ratingProject/:id
// @desc Add Rating of Project from User
// @access Private
router.route('/ratingProject/:id').post(function (req, res) {
  let id = req.params.id;
  Project.findById(id, function (err, project) {
    let newId = req.body.userID;
    User.findOne({ _id: newId }).then(user => {
      const newProjectClassification = new ProjectClassification({
        projectID: project._id,
        userID: user._id,
        rating: req.body.rating,
        title: project.title
      });

      newProjectClassification
        .save()
        .then(projectClassification => res.json(projectClassification))
        .catch(err => console.log(err));
    })
  })
});

// @route GET api/projects/getProjectUserStats/:id
// @desc Get Rating Stats
// @access Private
router.route('/getProjectUserStats').post(function (req, res) {
  ProjectClassification.findOne({ projectID: req.body.projectID, userID: req.body.userID}).then(projectClassification => {
    const obj = {
      alreadyClassified: true,
    };
    if (projectClassification)
    res.json(obj);
  })
});

// @route GET  api/projects/concludeProject/:id
// @desc Deletes a project from Projects, and had it to ConcludedProjects
// @public
router.route('/concludeProject/:id').get( function(req, res){
  let id = req.params.id;
  Project.findById(id, function(err, project){
      if(project){
        const newProject = new ConcludedProject({
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
        newProject.save()
        .then(project.deleteOne()
        .then(project => res.json(project)));
      }
      else{
        return res.status(404).json("Porjecto não encontrado.");
      }
  });
});

module.exports = router;