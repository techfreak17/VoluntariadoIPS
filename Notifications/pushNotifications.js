const pushTemplates= require("../models/pushNotificationTemplates");
const notifications= require("../models/notifications");


// @desc Criar uma Notificação
// @access Interno
module.exports = function createNotification ( type, texto, email){
    let notification;
    const templates=new pushTemplates();
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
    notification.save();
  }
  
  
function buildnotification(title,body,texto, email){
    const notif= new notifications;
    notif.title=title;
    notif.body=body.replace('{{ title }}', '\"'+texto+'\"');
    notif.date=new Date();
    notif.email=email;
  
    return notif;
  };