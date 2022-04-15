const nodemailer = require("nodemailer");
const {google} = require('googleapis');

const sendEmail = async(options)=>{
  // const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI)
  // await oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})
  try {
   
// const acessToken = await oAuth2Client.getAccessToken()

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    // port: 587,
    // secure: false, 
    auth: {
      // type:'OAuth2',
      // user: 'shenome0@gmail.com', 
      // clientId: process.env.CLIENT_ID,
      // clientSecret: process.env.CLIENT_SECRET,
      // refreshToken: process.env.REFRESH_TOKEN,
      // acessToken: acessToken 
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD
  }
  
});
let mailOptions = {
  from: 'diss@gmail.com', // sender address
  to: options.email, // list of receivers
  subject: options.subject, // Subject line
  html: options.html, // plain text body
  text: options.text
};
transporter.sendMail(mailOptions, (error, info)=>{
  if(error){
console.log(error)
  }
  else{
    console.log("Email sent: "+ info.response)
  }
})

  
  } catch (error) {
    console.log(error)
  }
  


}

module.exports = sendEmail