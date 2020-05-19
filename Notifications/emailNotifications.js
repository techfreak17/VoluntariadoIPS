// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
//process.env.SENDGRID_API_KEY
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

//Email de confirmação de Email
const msg = {
  to: '170221078@estudantes.ips.pt',
  from: 'ipsvoluntariado@gmail.com',
  subject: 'Confirmar Email',
  template_id: 'd-22ac10364c4148f5a5b9507fcc402d62'
};
sgMail.send(msg).then(() => {
    console.log('Message sent')
}).catch((error) => {
    console.log(error.response.body)
})

//Email de recuperação de Password
const msg = {
  to: '170221078@estudantes.ips.pt',
  from: 'ipsvoluntariado@gmail.com',
  subject: 'Recuperar Password',
  template_id: 'd-0935ddb2419643f2a9e879f3a9d4bfe0'
};
sgMail.send(msg).then(() => {
    console.log('Message sent')
}).catch((error) => {
    console.log(error.response.body)
})

//Email de novo Projeto criado
const msg = {
  to: '170221078@estudantes.ips.pt',
  from: 'ipsvoluntariado@gmail.com',
  subject: 'Projecto Criado',
  template_id: 'd-c5dbf138617b49faad5754d80d15d66a'
};
sgMail.send(msg).then(() => {
    console.log('Message sent')
}).catch((error) => {
    console.log(error.response.body)
})

//Email de edição de Projeto
const msg = {
  to: '170221078@estudantes.ips.pt',
  from: 'ipsvoluntariado@gmail.com',
  subject: 'Projecto Editado',
  template_id: 'd-d3e1d886df2d478b858eb49380783421'
};
sgMail.send(msg).then(() => {
    console.log('Message sent')
}).catch((error) => {
    console.log(error.response.body)
})

//Email de remoção de Projeto
const msg = {
  to: '170221078@estudantes.ips.pt',
  from: 'ipsvoluntariado@gmail.com',
  subject: 'Projecto Removido',
  template_id: 'd-8a0cae9185a8468ca4b069d462b35967'
};
sgMail.send(msg).then(() => {
    console.log('Message sent')
}).catch((error) => {
    console.log(error.response.body)
})

//Email de Projeto sem vagas
const msg = {
  to: '170221078@estudantes.ips.pt',
  from: 'ipsvoluntariado@gmail.com',
  subject: 'Sem Vagas',
  template_id: 'd-aaf2a5c12faa45198c64f4b25701ec88'
};
sgMail.send(msg).then(() => {
    console.log('Message sent')
}).catch((error) => {
    console.log(error.response.body)
})