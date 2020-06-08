const notifications= require("../../models/notifications");
const User = require("../../models/user");
const express = require("express");
const router = express.Router();




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

router.route('/deleteNotification/:id').get(function (req, res) {
  notifications.findByIdAndRemove(req.params.id, function (err, notif) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

router.put('/updateNotification/:id').get(function (req, res) {
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


router.post("/createNotification", (req, res) => {

  const newNotif = new notifications;
    
    newNotif.body=req.body.body
    newNotif.date=new Date();
    newNotif.email=req.body.email;
  
});


//createNotification('semVagas','\"Ajudar o Ambiente\"','180221102@estudantes.ips.pt');
//createNotification('confirmarEmail','', '180221102@estudantes.ips.pt');
//getNotification('180221102@estudantes.ips.pt');

module.exports = router;