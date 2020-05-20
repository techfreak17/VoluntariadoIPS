const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/user");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {

  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        number: req.body.number,
        name: req.body.name,
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
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {

  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

// @route POST api/users/recover
// @desc Recover User password
// @access Public
router.post("/recover", (req, res) => {

  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    
    console.log("SEND EMAIL");
    res.json(user);
  });
});

// @route POST api/users/createUser
// @desc Create user
// @access Public
router.post("/createUser", (req, res) => {
        
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        number: req.body.number,
        name: req.body.name,
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
    }
  });
});

// Defined get data(index or listing) route
router.route('/listUsers').get(function (req, res) {
  User.find(function(err, users){
    if(err){
      console.log(err);
    }
    else {
      res.json(users);
    }
  });
});


// Defined edit route
router.route('/editUser/:id').get(function (req, res) {
  let id = req.params.id;
  User.findById(id, function (err, user){
      res.json(user);
  });
});

router.route('/updateUser/:id').post(function (req, res) {
  User.findById(req.params.id, function(err, user) {
  if (!user)
    res.status(404).send("data is not found");
  else {
      user.name = req.body.name;
      user.number = req.body.number;
      user.email = req.body.email;
      user.role = req.body.role;
      user.password = req.body.password;

      user.updateOne({ name: user.name,
        number: user.number,
        email: user.email,
        role: user.role,
        password: user.password}
         )
      .catch(err => {
        res.status(400).send("unable to update the database");
      });
  }
});
});

// Defined delete | remove | destroy route
router.route('/deleteUser/:id').get(function (req, res) {
  User.findByIdAndRemove({_id: req.params.id}, function(err, user){
      if(err) res.json(err);
      else res.json('Successfully removed');
  });
});

module.exports = router;