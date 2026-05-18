// utils/sendEmail.js

const nodemailer = require("nodemailer");


// Create Transporter
const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


// Send Email Function
const sendEmail = async (to, subject, htmlContent) => {

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        html: htmlContent
    };

    await transporter.sendMail(mailOptions);
};


module.exports = sendEmail;