// =====================================================
// NODEMAILER
// =====================================================

const nodemailer = require("nodemailer");

// =====================================================
// CREATE TRANSPORTER
// =====================================================

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",

    port: 587,

    secure: false,

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// =====================================================
// SEND EMAIL FUNCTION
// =====================================================

const sendEmail = async (
    to,
    subject,
    htmlContent
) => {

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        html: htmlContent
    };

    await transporter.sendMail(mailOptions);
};

// =====================================================
// EXPORT
// =====================================================

module.exports = sendEmail;