const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

    host: process.env.EMAIL_HOST,

    port: process.env.EMAIL_PORT,

    secure: false,

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }

});

const sendEmail = async (

    to,
    subject,
    htmlContent

) => {

    try {

        const mailOptions = {

            from: process.env.EMAIL_FROM,

            to,

            subject,

            html: htmlContent

        };

        const info = await transporter.sendMail(mailOptions);

        console.log("EMAIL SENT SUCCESS:", info.messageId);

    } catch (error) {

        console.log("EMAIL ERROR:", error);

        throw error;

    }

};

module.exports = sendEmail;