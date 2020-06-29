const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// Load input validation
const validateRegisterInputVoluntary = require("../../validation/registerVoluntary");
const validateRegisterInputCompany = require("../../validation/register");
const validateEditInputVoluntary = require("../../validation/editVoluntary");
const validateEditInputCompany = require("../../validation/editCompany");
const createNotification = require("../../Notifications/pushNotifications");

// Load User model
const User = require("../../models/user");
const Voluntary = require("../../models/voluntary");
const Company = require("../../models/company");

// @route POST api/admin/createVoluntaryUser
// @desc Create Voluntary User
// @access Private
router.post("/createVoluntaryUser", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInputVoluntary(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email já existe" });
    } else {
      const newUser = new User({
        username: req.body.username,
        name: req.body.name,
        role: req.body.role,
        email: req.body.email,
        password: req.body.password,
        isVerified: req.body.isVerified
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              const email = user.email;
              User.findOne({ email }).then(user => {
                const newVoluntary = new Voluntary({
                  name: req.body.name,
                  email: req.body.email,
                  phone: req.body.phone,
                  address: req.body.address,
                  birthDate: req.body.birthDate,
                  memberIPS: req.body.memberIPS,
                  schoolIPS: req.body.schoolIPS,
                  courseIPS: req.body.courseIPS,
                  interestAreas: req.body.interestAreas,
                  reasons: req.body.reasons,
                  observations: req.body.observations,
                  authorization: req.body.authorization,
                  listProjects: req.body.listProjects,
                  userID: user._id
                });
                newVoluntary
                  .save()
                  .then(voluntary => res.json(voluntary))
                  .catch(err => console.log(err));
              });
              createNotification('novoVoluntario', req.body.name, 'admin@teste.pt');
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/admin/createCompanyUser
// @desc Create Company User
// @access Private
router.post("/createCompanyUser", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInputCompany(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email já existe" });
    } else {
      const newUser = new User({
        username: req.body.username,
        name: req.body.name,
        role: req.body.role,
        email: req.body.email,
        password: req.body.password,
        isVerified: req.body.isVerified
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              const email = user.email;
              User.findOne({ email }).then(user => {
                const newCompany = new Company({
                  name: req.body.name,
                  email: req.body.email,
                  phone: req.body.phone,
                  address: req.body.address,
                  birthDate: req.body.birthDate,
                  companyAddress: req.body.companyAddress,
                  companyName: req.body.companyName,
                  observations: req.body.observations,
                  authorization: req.body.authorization,
                  responsibleID: user._id,
                  listProjects: req.body.listProjects
                });
                newCompany
                  .save()
                  .then(company => res.json(company))
                  .catch(err => console.log(err));
              });
              createNotification('novaEntidade', req.body.companyName, 'admin@teste.pt');
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/admin/updateUser/:id
// @desc Update User
// @access Private
router.route('/updateUser/:id').post(function (req, res) {
  User.findById(req.params.id, function (err, user) {

    if (!user)
      res.status(404).send("data is not found");

    if (user.role === "Voluntário") {
      const { errors, isValid } = validateEditInputVoluntary(req.body);
      // Check validation
      if (!isValid) {
        return res.status(400).json(errors);
      }

      newEmail = req.body.email;
      user.username = req.body.username;
      oldEmail = user.email;

      user.updateOne({
        email: newEmail,
        username: user.username
      })
        .then(user => res.json(user))
        .catch(err => {
          res.status(400).send("unable to update the database");
        });

      Voluntary.findOne({ email: oldEmail }).then(voluntary => {
        if (voluntary) {
          voluntary.name = req.body.name;
          voluntary.email = req.body.email;
          voluntary.phone = req.body.phone;
          voluntary.address = req.body.address;
          voluntary.birthDate = req.body.birthDate;
          voluntary.memberIPS = req.body.memberIPS;
          voluntary.schoolIPS = req.body.schoolIPS;
          voluntary.courseIPS = req.body.courseIPS;
          voluntary.interestAreas = req.body.interestAreas;
          voluntary.reasons = req.body.reasons;
          voluntary.observations = req.body.observations;

          voluntary.updateOne({
            name: voluntary.name,
            email: voluntary.email,
            phone: voluntary.phone,
            address: voluntary.address,
            birthDate: voluntary.birthDate,
            memberIPS: voluntary.memberIPS,
            schoolIPS: voluntary.schoolIPS,
            courseIPS: voluntary.courseIPS,
            interestAreas: voluntary.interestAreas,
            reasons: voluntary.reasons,
            observations: voluntary.observations,
          })
            .then(voluntary => res.json(voluntary))
            .catch(err => {
              res.status(400).send("unable to update the database");
            });
          createNotification('editarVoluntario', req.body.name, 'admin@teste.pt');
        } else {
          res.status(404).send("data is not found");
        }
      });

    } else if (user.role === "Empresa") {
      const { errors, isValid } = validateEditInputCompany(req.body);
      // Check validation
      if (!isValid) {
        return res.status(400).json(errors);
      }

      newEmail = req.body.email;
      user.username = req.body.username;
      oldEmail = user.email;

      user.updateOne({
        email: newEmail,
        username: user.username
      })
        .then(user => res.json(user))
        .catch(err => {
          res.status(400).send("unable to update the database");
        });

      Company.findOne({ email: oldEmail }).then(company => {
        if (company) {
          company.name = req.body.name;
          company.email = req.body.email;
          company.phone = req.body.phone;
          company.address = req.body.address;
          company.birthDate = req.body.birthDate;
          company.companyName = req.body.companyName;
          company.companyAddress = req.body.companyAddress;
          company.observations = req.body.observations;

          company.updateOne({
            name: company.name,
            email: company.email,
            phone: company.phone,
            address: company.address,
            birthDate: company.birthDate,
            companyName: company.companyName,
            companyAddress: company.companyAddress,
            observations: company.observations,
          })
            .then(company => res.json(company))
            .catch(err => {
              res.status(400).send("unable to update the database");
            });
          createNotification('editarEntidade', req.body.companyName, 'admin@teste.pt');
        } else {
          res.status(404).send("data is not found");
        }
      });
    }
  });
});

// @route GET api/admin/deleteUser/:id
// @desc Delete Voluntary User
// @access Private
router.route('/deleteUser/:id').get(function (req, res) {
  User.findByIdAndRemove({ _id: req.params.id }, function (err, user) {
    if (err) {
      res.json(err);
    }
    else {
      if (user.role === "Voluntário") {
        Voluntary.findOneAndRemove({ email: user.email }, function (err, voluntary) {
          if (err) res.json(err);
          else res.json('Successfully removed');
          createNotification('apagarVoluntario', voluntary.name, 'admin@teste.pt');
        });
      } else if (user.role === "Empresa") {
        Company.findOneAndRemove({ email: user.email }, function (err, company) {
          if (err) res.json(err);
          else res.json('Successfully removed');
          createNotification('apagarEntidade', company.name, 'admin@teste.pt');
        });
      }
    }
  });
});

// @route GET api/admin/getCompanyUsers/:id
// @desc Get Company Users
// @access Private
router.route('/getCompanyUsers').get(function (req, res) {
  Company.find(function (err, users) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(users);
    }
  });
});

module.exports = router;