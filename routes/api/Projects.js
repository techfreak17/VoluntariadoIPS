const express = require("express");
const router = express.Router();

// Load Project model
const Project = require("../../models/project");

// @route POST api/projects/create
// @desc Register user
// @access Public
router.post("/create", (req, res) => {
        
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
                user_in_charge: req.body.user_in_charge,
            });
            newProject
                    .save()
                    .then(project => res.json(project))
                    .catch(err => console.log(err));
        }
    });
});

module.exports = router;