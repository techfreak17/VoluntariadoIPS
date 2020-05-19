// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
//process.env.SENDGRID_API_KEY
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
const msg = {
  to: '170221078@estudantes.ips.pt',
  from: 'ipsvoluntariado@gmail.com',
  subject: 'Projecto Criado',
  template_id: 'd-d3e1d886df2d478b858eb49380783421'
};
sgMail.send(msg).then(() => {
    console.log('Message sent')
}).catch((error) => {
    console.log(error.response.body)
    // console.log(error.response.body.errors[0].message)
})