const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const template = require('../../Notifications/emailNotificationsTemplates.js');
const sender = require('../../Notifications/emailNotify.js');
const crypto = require('crypto');

// Load input validation
const validateRegisterInputVoluntary = require("../../validation/registerVoluntary");
const validateRegisterInputCompany = require("../../validation/register");
const validateEditInputAdminProfileUser = require("../../validation/editAdminProfileUser");
const validateLoginInput = require("../../validation/login");
const validatePasswordReset = require("../../validation/recover");
const createNotification = require("../../Notifications/pushNotifications");

// Load User model
const User = require("../../models/user");
const Voluntary = require("../../models/voluntary");
const Company = require("../../models/company");
const Token = require("../../models/token");
const Administrator = require("../../models/administrator");

const buildJSON = (...files) => {
  var obj = {}
  Object.assign(obj, files);
  return obj;
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
      return res.status(400).json({ email: "Email já existe" });
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
            .then(user => {
              const email = user.email;
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
                  listProjects: req.body.listProjects,
                  userID: user._id,
                });
                newVoluntary.save();
              });
            })
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
      return res.status(400).json({ email: "Email já existe" });
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
            .then(user => {
              const email = user.email;
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
                  listProjects: req.body.listProjects,
                  responsibleID: user._id,
                });
                newCompany.save();
              });
            })
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
  Token.findOne({ token: reqToken }).then(token => {
    if (!token) {
      return res.status(404).json({ tokennotfound: "Token nâo encontrado" });
    }
    const email = token._userEmail;
    User.findOne({ email }).then(user => {
      user.updateOne(
        { isVerified: true })
        .catch(err => {
          res.status(400).send("Não foi possível atualizar a base de dados");
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
      return res.status(404).json({ emailnotfound: "Email não encontrado" });
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
            name: user.name,
            role: user.role
          };
          //notification.getNotification(email);
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
          return res.status(401).json({ notverified: 'A tua conta ainda não foi verificada.' });
        }
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Combinação Email/Password inválida" });
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

// @route GET api/users/listUsers
// @desc Get List Users
// @access Private
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

// @route POST api/users/searchUser
// @desc Search User
// @access Private
router.post("/searchUser", (req, res) => {
  User.find({ username: { $regex: req.body.search, $options: "i" } }).then(user => {
    if (user) {
      res.json(user);
    } else {
      res.status(404).send({ message: "Not found any user with that name" });
    }
  })
});

// @route GET api/users/getUserDetails/:id
// @desc Get User Details
// @access Private
router.route('/getUserDetails/:id').get(function (req, res) {
  let id = req.params.id;
  User.findById(id, function (err, user) {
    if (user) {
      if (user.role === "Voluntário") {
        Voluntary.findOne({ userID: user._id }).then(voluntary => {
          if (voluntary) {
            res.json(buildJSON(user, voluntary));
          } else {
            return res.status(400).json({ voluntary: "Such data doesn´t exist" });
          };
        })
      } else if (user.role === "Empresa") {
        Company.findOne({ responsibleID: user._id }).then(company => {
          if (company) {
            res.json(buildJSON(user, company));
          } else {
            return res.status(400).json({ company: "Such data doesn´t exist" });
          };
        })
      } else if (user.role === "Administrador") {
        Administrator.findOne({ userID: user._id }).then(admin => {
          if (admin) {
            res.json(buildJSON(user, admin));
          } else {
            return res.status(400).json({ admin: "Such data doesn´t exist" });
          };
        })
      }
    }
  });
});

// @route POST api/users/updateUser/:id
// @desc Update User
// @access Private
router.route('/updateUser/:id').post(function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (!user) {
      res.status(404).send("data is not found");
    }

    if (user.role === "Voluntário") {
      atualPassword = req.body.password;
      newPassword = req.body.password2;
      var countAtualPassword = Object.keys(newPassword).length
      var countNewPassword = Object.keys(newPassword).length
      if (atualPassword === newPassword && countAtualPassword >= 6 && countNewPassword >= 6) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPassword, salt, (err, hash) => {
            if (err) throw err;
            newPassword = hash;
            user.updateOne({
              password: newPassword,
            })
              .catch(err => {
                res.status(400).send("unable to update the database");
              });
          })
        })
      }

      Voluntary.findOne({ email: user.email }).then(voluntary => {
        if (voluntary) {
          voluntary.name = req.body.name;
          voluntary.phone = req.body.phone;
          voluntary.address = req.body.address;
          voluntary.birthDate = req.body.birthDate;
          voluntary.memberIPS = req.body.memberIPS;
          voluntary.schoolIPS = req.body.schoolIPS;
          voluntary.courseIPS = req.body.courseIPS;
          voluntary.interestAreas = req.body.interestAreas;

          if (voluntary.courseIPS !== undefined && voluntary.schoolIPS !== undefined && voluntary.memberIPS !== undefined) {
            voluntary.updateOne({
              name: voluntary.name,
              phone: voluntary.phone,
              address: voluntary.address,
              birthDate: voluntary.birthDate,
              memberIPS: voluntary.memberIPS,
              schoolIPS: voluntary.schoolIPS,
              courseIPS: voluntary.courseIPS,
              interestAreas: voluntary.interestAreas,
            })
              .catch(err => {
                res.status(400).send("unable to update the database");
              });
            createNotification('editarVoluntario', voluntary.name, user.email);
          } else {
            voluntary.updateOne({
              name: voluntary.name,
              phone: voluntary.phone,
              address: voluntary.address,
              birthDate: voluntary.birthDate,
              interestAreas: voluntary.interestAreas,
            })
              .catch(err => {
                res.status(400).send("unable to update the database");
              });
            createNotification('editarPerfil', voluntary.name, user.email);
          }
        } else {
          res.status(404).send("data is not found");
        }
      });

    } else if (user.role === "Empresa") {

      atualPassword = req.body.password;
      newPassword = req.body.password2;
      var countAtualPassword = Object.keys(newPassword).length
      var countNewPassword = Object.keys(newPassword).length
      if (atualPassword === newPassword && countAtualPassword >= 6 && countNewPassword >= 6) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPassword, salt, (err, hash) => {
            if (err) throw err;
            newPassword = hash;
            user.updateOne({
              password: newPassword,
            })
              .catch(err => {
                res.status(400).send("unable to update the database");
              });
          })
        })
      }

      Company.findOne({ email: user.email }).then(company => {
        if (company) {
          company.name = req.body.name;
          company.phone = req.body.phone;
          company.address = req.body.address;
          company.birthDate = req.body.birthDate;
          company.companyName = req.body.companyName;
          company.companyAddress = req.body.companyAddress;

          if (company.companyName !== undefined && company.companyAddress !== undefined) {
            company.updateOne({
              name: company.name,
              phone: company.phone,
              address: company.address,
              birthDate: company.birthDate,
              companyName: company.companyName,
              companyAddress: company.companyAddress
            })
              .catch(err => {
                res.status(400).send("unable to update the database");
              });
            createNotification('editarEntidade', company.companyName, user.email);
          } else {
            company.updateOne({
              name: company.name,
              phone: company.phone,
              address: company.address,
              birthDate: company.birthDate,
            })
              .catch(err => {
                res.status(400).send("unable to update the database");
              });
            createNotification('editarPerfil', company.companyName, user.email);
          }
        } else {
          res.status(404).send("data is not found");
        }
      });
    } else if (user.role === "Administrador") {
      const { errors, isValid } = validateEditInputAdminProfileUser(req.body);
      // Check validation
      if (!isValid) {
        return res.status(400).json(errors);
      }

      atualPassword = req.body.password;
      newPassword = req.body.password2;
      var countAtualPassword = Object.keys(newPassword).length
      var countNewPassword = Object.keys(newPassword).length
      if (atualPassword === newPassword && countAtualPassword >= 6 && countNewPassword >= 6) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPassword, salt, (err, hash) => {
            if (err) throw err;
            newPassword = hash;
            user.updateOne({
              password: newPassword,
            })
              .catch(err => {
                res.status(400).send("unable to update the database");
              });
          })
        })
      }

      Administrator.findOne({ email: user.email }).then(admin => {
        if (admin) {
          admin.name = req.body.name;
          admin.phone = req.body.phone;
          admin.address = req.body.address;
          admin.birthDate = req.body.birthDate;

          admin.updateOne({
            name: admin.name,
            phone: admin.phone,
            address: admin.address,
            birthDate: admin.birthDate,
          })
            .catch(err => {
              res.status(400).send("unable to update the database");
            });
          createNotification('editarPerfil', admin.name, user.email);
        } else {
          res.status(404).send("data is not found");
        }
      });
    }
  });
});

module.exports = router;