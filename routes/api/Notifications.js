const pushTemplates= require("../../models/pushNotificationTemplates");
const notifications= require("../../models/notifications");
const express = require("express");
const router = express.Router();


// @desc Criar uma Notificação
// @access Interno
function createNotification ( type, texto, email){
  let notification;
  const templates=new pushTemplates();
  console.log('entered the method')
  switch(type){
    case 'semVagas':
     notification=buildnotification(type, templates.semVagas,texto, email, date);
      break;
    case 'confirmarEmail':
      notification=buildnotification(type, templates.confirmarEmail,texto, email);
      break;
    case 'projectoEditado':
      notification=buildnotification(type, templates.projectoEditado,texto, email);
      break;
    case 'novoProjecto':
      notification=buildnotification(type, templates.novoProjecto,texto, email);
      break;
    case 'projectoRemovido':
      notification=buildnotification(type, templates.projectoRemovido,texto, email);
    break;
    default:
      console.log("failed to find a possible type.")
  }
  console.log(notification);
  notification.save();
}


function buildnotification(title,body,texto, email){
  const notif= new notifications;
  console.log('entered build');
  notif.title=title;
  notif.body=body.replace('{{ title }}', '\"'+texto+'\"');
  notif.date=new Date();
  notif.email=email;

  return notif;
}

function getNotification(userEmail){
  console.log('entered getnotification');
    notifications.find({ email: userEmail , isRead: false}, function(err, notif){
      if(err){
        console.log('has error');
        return err;
      }
      else{
        console.log('has something');
        console.log(notif);
        return notif;
      }

    });
}

router.route('/listNotifications').get(function (req, res) {
  notifications.find(function (err, notif) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(notif);
    }
  });
});

//router.route('/deleteNotif/:id').get(function (req, res) {
  //notifications.findByIdAndRemove({ _id: req.params.id }, function (err, user) {
    //if (err) res.json(err);
    //else res.json('Successfully removed');
  //});
//});

router.put('/updateNotification/:id').get(function (req, res) {
  console.log('entered update Notification');
  notifications.findOne({_id: req.params.id},function(err, notif){
    if(err){
      console.log('error');
      console.log(err);
      res.json(err);
    }
    else {
      console.log('has an object');
      console.log(notif);
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



module.exports= createNotif ={createNotification};
module.exports= getNotif ={getNotification};
//createNotification('semVagas','\"Ajudar o Ambiente\"','180221102@estudantes.ips.pt');
//createNotification('confirmarEmail','', '180221102@estudantes.ips.pt');
//getNotification('180221102@estudantes.ips.pt');

module.exports = router;