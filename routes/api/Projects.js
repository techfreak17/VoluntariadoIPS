const express = require("express");
const router = express.Router();

// Load Project model
const Project = require("../../models/project");

// @route POST api/projects/create
// @desc Register user
// @access Public
router.post("/createProject", (req, res) => {
        
    Project.findOne({title: req.body.title}).then(project => {
        if (project) {
            return res.status(400).json({ title: "Project already exists" });
        } else {
            const newProject = new Project({
                title: req.body.title,
                contact_person: req.body.contact_person,
                email_person: req.body.email_person,
                phone_person: req.body.phone_person,
                synopsis: req.body.synopsis,
                target_audience: req.body.target_audience,
                objectives: req.body.objectives,
                date: (req.body.date) ? req.body.date : null,
                areas: req.body.areas,
                description: req.body.description,
                related_entities: req.body.related_entities,
                observations: req.body.observations,
                authorization: req.body.authorization,
                user_in_charge: req.body.user_in_charge
            });
            newProject
                    .save()
                    .then(project => res.json(project))
                    .catch(err => console.log(err));
        }
    });
});

// Defined get data(index or listing) route
router.route('/listProjects').get(function (req, res) {
  Project.find(function(err, projects){
    if(err){
      console.log(err);
    }
    else {
      res.json(projects);
    }
  });
});

// Defined edit route
router.route('/editProject/:id').get(function (req, res) {
  let id = req.params.id;
  Project.findById(id, function (err, project){
      res.json(project);
  });
});

//  Defined update route
router.route('/updateProject/:id').post(function (req, res) {
  Project.findById(req.params.id, function(err, project) {
  if (!project)
    res.status(404).send("data is not found");
  else {
      project.title = req.body.title;
      project.contact_person = req.body.contact_person;
      project.email_person = req.body.email_person;
      project.phone_person = req.body.phone_person;
      project.synopsis = req.body.synopsis;
      project.target_audience = req.body.target_audience;
      project.objectives = req.body.objectives;
      project.date = (req.body.date) ? req.body.date : null;
      project.areas = req.body.areas;
      project.description = req.body.description;
      project.related_entities = req.body.related_entities;
      project.observations = req.body.observations;
      project.authorization = req.body.authorization;
      project.user_in_charge = req.body.user_in_charge;

      project.save().then(project => {
        res.json('Update complete');
      })
      .catch(err => {
        res.status(400).send("unable to update the database");
      });
  }
});
});

// Defined delete | remove | destroy route
router.route('/deleteProject/:id').get(function (req, res) {
  Project.findByIdAndRemove({_id: req.params.id}, function(err, business){
      if(err) res.json(err);
      else res.json('Successfully removed');
  });
});


module.exports = router;