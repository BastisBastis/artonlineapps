const nodemailer = require("nodemailer");

//Set up transporter with mail login credentials from .env
const transporter = nodemailer.createTransport('smtps://skissa%40bastismusic.se:' +
  process.env.SKISSA_PASSWORD + 
  '@ns6.inleed.net:465');

/**
 * This callback is called when the email is sent
 * @callback emailSent
 * @param {Object} response
 */

/**
 * Send an email using the sender specified in .env
 * @param {Object} options - Options for sending the email
 * @param {string} options.to - The receiver of the email
 * @param {string} options.subject - The subject of the email
 * @param {string} options.text - The rext contents of the email
 * @param {string} options.html - Contents of the email in HTML code
 * @param {emailSent} options.callback - A function to call once the email is sent
 */
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
    
    transporter.sendMail(options, (error, info)=>{
      if(error){
        callback({error:error})
          return console.log(error);
      }
      callback(info);
  });
  
  }
  
module.exports = sendMail;
