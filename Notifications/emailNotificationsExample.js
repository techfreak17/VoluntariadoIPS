const template = require('./emailNotificationsTemplates');
const sender = require('./emailNotify');

//Designar qual o template a usar e para que email
const msg = template.confirmarEmail('170221078@estudantes.ips.pt','ThisIsAToken');


//Enviar email
sender.sendEmail(msg);