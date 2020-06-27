const express = require("express");
const router = express.Router();
const User = require("../../models/user");

const buildJSON = (...files) => {
    var obj = {}
    Object.assign(obj, files);
    return obj;
};

// @route GET api/users/listUsers
// @desc Get List Users
// @access Private
router.route('/countUsers').get(function (req, res) {
    User.countDocuments({ role: "Voluntário" }, function (err, userVoluntary) {
        User.countDocuments({ role: "Empresa" }, function (err, userCompany) {
            User.countDocuments({ role: "Administrador" }, function (err, userAdmin) {
                let array = [userVoluntary,userCompany,userAdmin];
                res.send(array);
            });
        });
    });
});

module.exports = router;