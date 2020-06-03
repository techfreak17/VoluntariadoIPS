const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// Load input validation
const validateRegisterInputVoluntary = require("../../validation/register");
const validateRegisterInputCompany = require("../../validation/register");

// Load User model
const User = require("../../models/user");
const Admin = require("../../models/administrator");
const Voluntary = require("../../models/voluntary");
const Company = require("../../models/company");

// @route GET api/admin/getAdminUserDetails/:id
// @desc Get Admin User Details
// @access Private
router.route('/getAdminUserDetails/:id').get(function (req, res) {
  let id = req.params.id;
  User.findById(id, function (err, user) {
    Admin.findOne({ userID: user._id }).then(admin => {
      if (admin) {
        res.json(admin);
      } else {
        return res.status(400).json({ user: "Such data doesn´t exist" });
      };
    })
  });
});

// @route GET api/admin/editUser/:id
// @desc Edit User
// @access Private
router.route('/editUser/:id').get(function (req, res) {
  let id = req.params.id;
  User.findById(id, function (err, user) {
    res.json(user);
  });
});

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
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        username: req.body.username,
        role: req.body.role,
        email: req.body.email,
        password: req.body.password
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
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
        authorization: true
      });
      newVoluntary
        .save()
        .then(voluntary => res.json(voluntary))
        .catch(err => console.log(err));
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
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        username: req.body.username,
        role: req.body.role,
        email: req.body.email,
        password: req.body.password
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
      const newCompany = new Company({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        birthDate: req.body.birthDate,
        observations: req.body.observations,
        companyName: req.body.companyName,
        companyAddress: req.body.companyAddress,
        authorization: true
      });
      newCompany
        .save()
        .then(company => res.json(company))
        .catch(err => console.log(err));
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
    else {
      user.email = req.body.email;
      user.username = req.body.username;
      user.password = req.body.password;

      user.updateOne({
        email: user.email,
        username: user.username,
        password: user.password,
      })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
      if (user.role === "Voluntário") {
        Voluntary.findOne({ email: user.email }).then(voluntary => {
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
              .catch(err => {
                res.status(400).send("unable to update the database");
              });
          } else {
            res.status(404).send("data is not found");
          }
        });
      } else if (user.role === "Empresa") {
        Company.findOne({ email: user.email }).then(company => {
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
              .catch(err => {
                res.status(400).send("unable to update the database");
              });
          } else {
            res.status(404).send("data is not found");
          }
        });
      }
    }
  });
});

// @route GET api/admin/deleteUser/:ud
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
        });
      } else if (user.role === "Empresa") {
        Company.findOneAndRemove({ email: user.email }, function (err, company) {
          if (err) res.json(err);
          else res.json('Successfully removed');
        });
      }
    }
  });
});

module.exports = router;