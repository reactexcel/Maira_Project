const nodemailer = require("nodemailer");
 const jwt = require('jsonwebtoken')
 require('dotenv').config() ;


module.exports.sendMail = async (token)=>{
  try{
     let verify = jwt.verify(token, process.env.SECRET_KEY)
     if(!verify){
      throw Error(err)
     }

   //  let pwdResetUrl = `http://116.202.210.102:8000/user/reset-pwd/${token}`
   let  pwdResetUrl = `http://localhost:5173/create-password`
  
  

     const transporter = nodemailer.createTransport({
      service : "gmail",
      auth: {
          user: process.env.user ,
          pass: process.env.pass
      }
  });
    
    const info = await transporter.sendMail({
      from: process.env.user, 
      to: verify.email, 
      subject: "PASSWORD RESET LINK",  
      text: `This is a Password reset Link`, 
      html: `<a href = ${pwdResetUrl}> Please verify this link to reset password </a> `, 
    });
      return info.messageId
  }
  catch(err){
    console.error('Error sending email:', err);
     throw err
  }
}
