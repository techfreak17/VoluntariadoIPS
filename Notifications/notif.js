// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
//process.env.SENDGRID_API_KEY
const sgMail = require('@sendgrid/mail');


sgMail.setApiKey('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');
const msg = {
  to: '190200026@estudantes.ips.pt',
  from: 'ipsvoluntariado@gmail.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg).then(() => {
    console.log('Message sent')
}).catch((error) => {
    console.log(error.response.body)
    // console.log(error.response.body.errors[0].message)
})