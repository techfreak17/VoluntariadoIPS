const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const template = require('../../Notifications/emailNotificationsTemplates.js');
const sender = require('../../Notifications/emailNotify.js');
const crypto = require('crypto');

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/user");
const Token = require("../../models/token");

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

      const email = req.body.email;

      User.findOne({ email }).then(user => {

        var mytoken = new Token({ _userEmail: email, token: crypto.randomBytes(16).toString('hex') });
        mytoken.save();

        msgToken = 'http://' + req.headers.host + '/ConfirmAccountToken/' + mytoken.token;
        console.log(msgToken);

        const msg = template.confirmarEmail(email, msgToken);
        sender.sendEmail(msg);

        console.log("EMAIL SENT");
      });
    }
  });
});

// @route POST api/users/confirmtoken
// @desc Recover User password
// @access Public
router.post("/confirmtoken", (req, res) => {

  console.log("Got into backend ");

  const reqToken = req.body.token;
  console.log("token -> " + reqToken);

  Token.findOne({ reqToken }).then(token => {
    if (!token) {
      console.log("Invalid token");
      return res.status(404).json({ tokennotfound: "Token not found" });
    }

    console.log("Valid token");
    const email = token._userEmail;
    console.log("Token email -> " + email);

    User.findOne({ email }).then(user => {
      console.log("Found user");

      user.updateOne(
        { isVerified: true })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });

      console.log("Updated user");
      res.json(user);
    });

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
        // Make sure the user has been verified
        if (!user.isVerified) return res.status(401).send({ type: 'not-verified', msg: 'Your account has not been verified.' });

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

    //token=generateToken();

    const msg = template.confirmarEmail(email, "localhost::3000/resetPassword");
    sender.sendEmail(msg);

    console.log("EMAIL SENT");
    res.json(user);
  });
});

module.exports = router;