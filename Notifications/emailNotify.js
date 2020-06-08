// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
//process.env.SENDGRID_API_KEY
const sgMail = require('@sendgrid/mail');
const emailConnection = require('./emailApiKey');


sgMail.setApiKey(emailConnection.apiKey);
sgMail.setSubstitutionWrappers('{{', '}}');

module.exports = {
  sendEmail: (template) => {

    sgMail.send(template).then(() => {
      console.log('emailNotify.js Sent an Email');
    }).catch((error) => {
      console.log(error.response.body)
      // console.log(error.response.body.errors[0].message)
    })
  }
}
