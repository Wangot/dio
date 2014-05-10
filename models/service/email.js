var mail = require("nodemailer").mail;
exports.send = function(emailsRecipient, msgSubject, msgText, msgHtml){

mail({
    from: "Team DIO ✔ <info@team-dio-dummy.com>", // sender address
    to: emailsRecipient, // list of receivers
    subject: msgSubject, // Subject line
    text: msgText, // plaintext body
    html: msgHtml // html body
});
}