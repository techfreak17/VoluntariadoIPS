const notifications= require("../../models/notifications");
const User = require("../../models/user");
const express = require("express");
const router = express.Router();

// @route GET api/notifications/listNotifications/:id
// @desc List Notifications
// @access Private
router.route('/listNotifications/:id').get(function (req, res) {
  const id = req.params.id;
  User.findById(id, function(err,user){
    notifications.find({email: user.email, isRead: false}, function (err, notif) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(notif);
      }
    });
  })
  
});

// @route GET api/notifications/listReadNotifications/:id
// @desc List Read Notifications
// @access Private
router.route('/listReadNotifications/:id').get(function (req, res) {
  const id = req.params.id;
  User.findById(id, function(err,user){
    notifications.find({email: user.email, isRead: true}, function (err, notif) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(notif);
      }
    });
  })
  
});

// @route GET api/notifications/deleteNotification/:id
// @desc Delete Notification
// @access Private
router.route('/deleteNotification/:id').get(function (req, res) {
  notifications.findByIdAndRemove(req.params.id, function (err, notif) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

// @route GET api/notifications/updateNotification/:id
// @desc Update Notification
// @access Private
router.route('/updateNotification/:id').get(function (req, res) {
  notifications.findOne({_id: req.params.id},function(err, notif){
    if(err){
      res.json(err);
    }
    else {
      notif.isRead=true;
      notif.save();
      res.json(notif);
    }
  });
});

// @route POST api/notifications/createNotification
// @desc Create Notification
// @access Private
router.post("/createNotification", (req, res) => {

  const newNotif = new notifications;
    
    newNotif.body=req.body.body
    newNotif.date=new Date();
    newNotif.email=req.body.email;
  
});


module.exports = router;