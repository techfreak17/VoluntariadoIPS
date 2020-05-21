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
const validatePasswordReset = require("../../validation/recover");

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

        msgToken = 'http://' + "localhost:3000"/*req.headers.host*/ + '/ConfirmAccountToken/' + mytoken.token;

        const msg = template.confirmarEmail(email, msgToken);
        sender.sendEmail(msg);

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
        console.log(user.isVerified);
        if (user.isVerified) {
          console.log("after true");
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
          return res.status(401).json({ notverified: 'Your account has not been verified.' });
        }

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

  const email = req.body.email;

  // Find user by email
  console.log(email);
  User.findOne({ email }).then(user => {
    console.log(user.email);
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    var mytoken = new Token({ _userEmail: email, token: crypto.randomBytes(16).toString('hex') });

    user.passwordResetToken = mytoken.token;
    user.passwordResetExpires = Date.now();

    user.save();

    msgToken = 'http://' + "localhost:3000"/*req.headers.host*/ + '/resetpassword/' + mytoken.token;

    const msg = template.recuperarPassword(user.email, msgToken);
    sender.sendEmail(msg);

    res.json(user);
  });

});

// @route POST api/users/recover
// @desc Recover User password
// @access Public
router.post("/updatePassword", (req, res) => {

  // Form validation
  const { errors, isValid } = validatePasswordReset(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const passwordResetToken = req.body.token.token;
  var mypassword = req.body.password;

  // Find user by email
  User.findOne({ passwordResetToken }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ tokennotfound: "Token not found" });
    }
    const createdDate = user.passwordResetExpires;
    const nowDate = Date.now();
    const difference = nowDate - createdDate;

    // 12 Horas em milisegundos
    if (difference >= 12 * 60 * 60 * 1000) {
      return res.status(401).json({ tokenexpired: "Token date expired" });
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(mypassword, salt, (err, hash) => {
        if (err) throw err;
        user.password = hash;
        user.passwordResetToken = null;
        user.passwordResetExpires = null;

        user.save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
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
  User.find(function (err, users) {
    if (err) {
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
  User.findById(id, function (err, user) {
    res.json(user);
  });
});

router.route('/updateUser/:id').post(function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (!user)
      res.status(404).send("data is not found");
    else {
      user.name = req.body.name;
      user.number = req.body.number;
      user.email = req.body.email;
      user.role = req.body.role;
      user.password = req.body.password;

      user.updateOne({
        name: user.name,
        number: user.number,
        email: user.email,
        role: user.role,
        password: user.password
      }
      )
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
router.route('/deleteUser/:id').get(function (req, res) {
  User.findByIdAndRemove({ _id: req.params.id }, function (err, user) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = router;