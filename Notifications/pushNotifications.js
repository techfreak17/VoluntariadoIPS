const pushTemplates = require("../models/pushNotificationTemplates");
const notifications = require("../models/notifications");


// @desc Criar uma Notificação
// @access Interno
module.exports = function createNotification(type, texto, email) {
  let notification;
  const templates = new pushTemplates();
  switch (type) {
    case 'semVagas':
      notification = buildnotification(type, templates.semVagas, texto, email, date);
      break;
    case 'confirmarEmail':
      notification = buildnotification(type, templates.confirmarEmail, texto, email);
      break;
    case 'projetoEditado':
      notification = buildnotification(type, templates.projetoEditado, texto, email);
      break;
    case 'novoProjeto':
      notification = buildnotification(type, templates.novoProjeto, texto, email);
      break;
    case 'projetoRemovido':
      notification = buildnotification(type, templates.projetoRemovido, texto, email);
      break;
    case 'novoVoluntario':
      notification = buildnotification(type, templates.novoVoluntario, texto, email);
      break;
    case 'editarVoluntario':
      notification = buildnotification(type, templates.editarVoluntario, texto, email);
      break;
    case 'apagarVoluntario':
      notification = buildnotification(type, templates.apagarVoluntario, texto, email);
      break;
    case 'novaEntidade':
      notification = buildnotification(type, templates.novaEntidade, texto, email);
      break;
    case 'editarEntidade':
      notification = buildnotification(type, templates.editarEntidade, texto, email);
      break;
    case 'apagarEntidade':
      notification = buildnotification(type, templates.apagarEntidade, texto, email);
      break;
    case 'entrarProjeto':
      notification = buildnotification(type, templates.entrarProjeto, texto, email);
      break;
    case 'sairProjeto':
      notification = buildnotification(type, templates.sairProjeto, texto, email);
      break;
    case 'editarPerfil':
      notification = buildnotification(type, templates.editarPerfil, texto, email);
      break;
    default:
      console.log("failed to find a possible type.")
  }
  notification.save();
}


function buildnotification(title, body, texto, email) {
  const notif = new notifications;
  notif.title = title;
  notif.body = body.replace('{{ title }}', texto);
  notif.date = new Date();
  notif.email = email;

  return notif;
};