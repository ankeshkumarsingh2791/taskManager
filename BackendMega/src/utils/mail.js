import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendMail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://mailgen.js/",
    },
  });

  var emailText = mailGenerator.generatePlaintext(options.mailGenContent)
  var emailHTML = mailGenerator.generate(options.mailGenContent)

  const transporter = nodemailer.createTransport({
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
    text: emailText,
    html: emailHTML
   };

   try {
    await transporter.sendMail(mail)
   } catch (error) {
    console.log(" failed to send email", error)
   }
};

const emailVerificationMailGenContent = (username, verificationUrl) => {
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

const forgetPasswordMailGenContent = (username, passwordResetUrl) => {
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



