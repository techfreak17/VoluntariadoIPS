const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load User model
const Project = require("../../models/project");

// @route POST api/projects/create
// @desc Register user
// @access Public
router.post("/createProject", (req, res) => {
    
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    Project.findOne({title: req.body.title}).then(project => {
        if (project) {
            return res.status(400).json({ email: "Project already exists" });
        } else {
            const newProject = new Project({
                title: req.body.title,
                contact_person: req.body.contact_person,
                email_person: req.body.email_person,
                phone_person: req.body.phone_person,
                synopis: req.body.synopis,
                target_audience: req.body.target_audience,
                objectives: req.body.objectives,
                date: req.body.date,
                areas: req.body.areas,
                description: req.body.description,
                related_entities: req.body.related_entities,
                observations: req.body.observations,
                authorization: req.body.authorization,
                user_in_charge: req.body.user_in_charge,
            });
            newProject
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
        }
    });
});

module.exports = router;