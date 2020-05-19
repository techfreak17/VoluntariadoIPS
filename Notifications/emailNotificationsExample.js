const template = require('./emailNotificationsTemplates');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

const msg = template.confirmarEmail();

sgMail.send(msg).then(() => {
    console.log('Message sent')
}).catch((error) => {
    console.log(error.response.body)
})