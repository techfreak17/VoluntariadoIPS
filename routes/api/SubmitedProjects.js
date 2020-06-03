const express = require("express");
const router = express.Router();

// Load User model
const SubmitedProject = require("../../models/submitedProject");
const User = require("../../models/user");
const Company = require("../../models/company");

// @route POST api/submitedProjects/submitCreateProject
// @desc Submit Create Project - Company and AAIPS
// @access Private
router.post("/submitCreateProject", (req, res) => {
  SubmitedProject.findOne({ title: req.body.title }).then(project => {
    if (project) {
      return res.status(400).json({ title: "Project already exists" });
    } else {
      console.log(req.body.related_entities);
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
        relatedEntities: req.body.relatedEntities
      });
      newSubmitedProject
        .save()
        .then(newSubmitedProject => res.json(newSubmitedProject))
        .catch(err => console.log(err));
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
  Project.findByIdAndRemove({ _id: req.params.id }, function (err, project) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

// @route GET api/submitedProjects/listProjects
// @desc Get List of Projects
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

// @route GET api/submitedProjects/searchProject
// @desc Search Project
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

// @route GET api/submitedProjects/getProject/:id
// @desc Get Project
// @access Private
router.route('/getSubmitedProject/:id').get(function (req, res) {
  let id = req.params.id;
  SubmitedProject.findById(id, function (err, submitedProject) {
    res.json(submitedProject);
  });
});

// @route GET api/submitedProjects/getProjectUser/:id
// @desc Get Project User
// @access Private
router.route('/getSubmitedProjectUser/:id').get(function (req, res) {
  let id = req.params.id;
  SubmitedProject.findById(id, function (err, submitedProject) {
    let newId = submitedProject.responsibleID;
    User.findOne({ _id: newId }).then(user => {
      res.json(user);
    })
  });
});

// @route GET api/submitedProjects/getSubmitedProjectUserDetails/:id
// @desc Get Project User Details
// @access Private
router.route('/getSubmitedProjectUserDetails/:id').get(function (req, res) {
  let id = req.params.id;
  SubmitedProject.findById(id, function (err, submitedProject) {
    let newId = submitedProject.responsibleID;
    Company.findOne({ responsibleID: newId }).then(company => {
      if (company) {
        res.json(company);
      } else {
        return res.status(400).json({ email: "Such data doesn´t exist" });
      };
    })
  });
});


module.exports = router;