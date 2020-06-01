const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const template = require('../../Notifications/emailNotificationsTemplates.js');
const sender = require('../../Notifications/emailNotify.js');
const crypto = require('crypto');


// Load User model
const User = require("../../models/user");
const Voluntary = require("../../models/voluntary");
const Company = require("../../models/company");
const Token = require("../../models/token");



module.exports = router;