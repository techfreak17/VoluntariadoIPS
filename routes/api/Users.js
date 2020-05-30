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
const validateRegisterInputVoluntary = require("../../validation/register");
const validateRegisterInputCompany = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validatePasswordReset = require("../../validation/recover");

// Load User model
const User = require("../../models/user");
const Voluntary = require("../../models/voluntary");
const Company = require("../../models/company");
const Token = require("../../models/token");

function emailSend(user) {
  const email = user.email;

  User.findOne({ email }).then(user => {
    var mytoken = new Token({ _userEmail: email, token: crypto.randomBytes(16).toString('hex') });
    msgToken = 'http://' + req.headers.host + '/ConfirmAccountToken/' + mytoken.token;
    mytoken.save();
    const msg = template.confirmarEmail(email, msgToken);
    sender.sendEmail(msg);
  });
};

// @route POST api/users/registerVoluntary
// @desc Register user
// @access Public
router.post("/registerVoluntary", (req, res) => {
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
            //.then(user => res.json(user))
            .then(user => {  const email = user.email;
              User.findOne({ email }).then(user => {        
                var mytoken = new Token({ _userEmail: email, token: crypto.randomBytes(16).toString('hex') });          
                msgToken = 'http://' + req.headers.host + '/ConfirmAccountToken/' + mytoken.token;           
                mytoken.save();          
                const msg = template.confirmarEmail(email, msgToken);
                sender.sendEmail(msg);
                res.json(user);
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
                  userID: user._id
                });       
                newVoluntary.save();
              });})
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/registerCompany
// @desc Register user
// @access Public
router.post("/registerCompany", (req, res) => {
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
            //.then(user => res.json(user))
            .then(user => {  const email = user.email;
              User.findOne({ email }).then(user => {        
                var mytoken = new Token({ _userEmail: email, token: crypto.randomBytes(16).toString('hex') });          
                msgToken = 'http://' + req.headers.host + '/ConfirmAccountToken/' + mytoken.token;           
                mytoken.save();          
                const msg = template.confirmarEmail(email, msgToken);
                sender.sendEmail(msg);
                res.json(user);
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
                  userID: user._id
                });       
                newCompany.save();
              });})
            .catch(err => console.log(err));
        });
      });
    }
  });
});



// @route POST api/users/confirmtoken
// @desc Recover User password
// @access Public
router.post("/confirmtoken", (req, res) => {
  var reqToken = req.body.token.token;
  reqToken = reqToken.toString();
  Token.findOne({token: reqToken }).then(token => {
    if (!token) {
      return res.status(404).json({ tokennotfound: "Token not found" });
    }
    const email = token._userEmail;
    User.findOne({ email }).then(user => {
      user.updateOne(
        { isVerified: true })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
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
        if (user.isVerified) {
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
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    var mytoken = new Token({ _userEmail: email, token: crypto.randomBytes(16).toString('hex') });
    user.passwordResetToken = mytoken.token;
    user.passwordResetExpires = Date.now();
    user.save();
    msgToken = 'http://' + req.headers.host + '/resetpassword/' + mytoken.token;
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

router.post("/searchUser", (req, res) => {   
  User.find({ name: { $regex: req.body.search, $options: "i" } }).then(user => {
      if (user) {
          res.json(user);
      } else {
        res.status(404).send({message: "Not found any user with that name"});
      }
  })
});

// Defined get route
router.route('/getUserDetails/:id').get(function (req, res) {
  let id = req.params.id;
  User.findById(id, function (err, user){
      if(user.role == "Voluntário"){
        Voluntary.findOne({ userID: user._id }).then(voluntary => {
          if (voluntary) {
            res.json(voluntary);
          } else {
            return res.status(400).json({ email: "Such data doesn´t exist" });
          };
        })
      }else{
        Company.findOne({ userID: user._id }).then(company => {
          if (company) {
            res.json(company);
          } else {
            return res.status(400).json({ email: "Such data doesn´t exist" });
          };
        })
      }
  });
});

// Defined get route
router.route('/getUser/:id').get(function (req, res) {
  let id = req.params.id;
  User.findById(id, function (err, user){
    res.json(user);
  });
});

module.exports = router;