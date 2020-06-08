const express = require("express");
const router = express.Router();


const Project = require("../../models/project");
const User = require("../../models/user");
const Company = require("../../models/company");
const Administrator = require("../../models/administrator");
const createNotification = require("../../Notifications/pushNotifications");

// Load input validation
const validateCreateProject = require("../../validation/createProject")

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
        responsibleID: req.body.responsibleID,
        requiredFormation: req.body.requiredFormation,
        formation: req.body.formation
      });
      createNotification('novoProjecto',req.body.title,'admin@teste.pt');
      newProject
        .save()
        .then(project => res.json(project))
        .catch(err => console.log(err));
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
  console.log(errors);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Project.findById(req.params.id, function (err, project) {
    if (!project)
      res.status(404).send("data is not found");
    else {
      project.title = req.body.title;
      project.synopsis = req.body.synopsis,
        project.intervationArea = req.body.intervationArea,
        project.target_audience = req.body.target_audience,
        project.objectives = req.body.objectives,
        project.description = req.body.description,
        project.date = (req.body.date) ? req.body.date : null,
        project.interestAreas = req.body.interestAreas,
        project.observations = req.body.observations,
        project.relatedEntities = req.body.relatedEntities

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
      }
      )
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
        createNotification('projectoEditado',project.title,'admin@teste.pt');
    }
  });
});

// @route GET api/projects/deleteProject
// @desc Delete Project - Administrator
// @access Private
router.route('/deleteProject/:id').get(function (req, res) {
  Project.findByIdAndRemove({ _id: req.params.id }, function (err, project) {
    if (err){
      res.json(err);
    }
    else {
      createNotification('projectoRemovido',project.title,'admin@teste.pt');
      res.json('Successfully removed');
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

// @route GET api/projects/getProject/:id
// @desc Get Project
// @access Private
router.route('/getProject/:id').get(function (req, res) {
  let id = req.params.id;
  Project.findById(id, function (err, project) {
    res.json(project);
  });
});

// @route GET api/projects/getProjectUser/:id
// @desc Get Project User
// @access Private
router.route('/getProjectUser/:id').get(function (req, res) {
  let id = req.params.id;
  Project.findById(id, function (err, project) {
    let newId = project.responsibleID;
    User.findOne({ _id: newId }).then(user => {
      res.json(user);
    })
  });
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

// @route POST api/project/joinProject/:id
// @desc Join Project
// @access Private
router.route('/joinProject/:id').post(function (req, res) {
  console.log(req);
  /*let id = req.params.id;
  User.findById(id, function (err, user) {
      Voluntary.findOne({ userID: user._id }).then(voluntary => {
          if (voluntary) {
              res.json(voluntary);
          } else {
              return res.status(400).json({ user: "Such data doesn´t exist" });
          };
      })
  });*/
});

module.exports = router;