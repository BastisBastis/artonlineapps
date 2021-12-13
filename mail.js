const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport('smtps://skissa%40bastismusic.se:' +
  process.env.SKISSA_PASSWORD + 
  '@ns6.inleed.net:465');

const sendMail = ({
  to,
  subject,
  text,
  html,
  attachments,
  callback=()=>false
  }) =>{
    const options= {
      from: '"Skissa - Artisten Online" <skissa@bastismusic.se>',
      to:to,
      subject:subject,
      text:text,
      html:html,
      attachments:attachments
    }
    
    transporter.sendMail(options, function(error, info){
      if(error){
        callback({error:error})
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
      callback(info);
  });
  
  }
  
module.exports = sendMail;
