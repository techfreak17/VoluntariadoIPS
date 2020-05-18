// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
//process.env.SENDGRID_API_KEY
const sgMail = require('@sendgrid/mail');
const template='d-c5dbf138617b49faad5754d80d15d66a'; 



sgMail.setApiKey('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');
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
    // console.log(error.response.body.errors[0].message)
})