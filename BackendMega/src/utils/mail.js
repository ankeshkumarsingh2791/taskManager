import Mailgen from "mailgen";
import nodemailer from "nodemailer";

 export const sendMail = async (options) => {

console.log(options.body,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.MAILTRAP_SMTP_USER,
        pass: process.env.MAILTRAP_SMTP_PASSWORD

    }
  })

   const mail = {
    from: 'ankeshkumarsingh2791@gmail.com',
    to: options.email,
    subject: options.subject,
    text: options.body,
    // html: emailHTML
   };

   try {
    await transporter.sendMail(mail)
   } catch (error) {
    console.log(" failed to send email", error)
   }
};

 export const emailVerificationMailGenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: "Welcome to my application",
            action :{
                instructions: "Verify please",
                button: {
                    color: "#22BC66",
                    text: "Verify your email",
                    link: verificationUrl
                },
            },
            outro: "Need your help"

        }
    }
}

 export const forgetPasswordMailGenContent = (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: "Welcome to my application",
            action :{
                instructions: "Verify please",
                button: {
                    color: "#22BC66",
                    text: "reset password",
                    link: passwordResetUrl
                },
            },
            outro: "Need your help"

        }
    }
}



