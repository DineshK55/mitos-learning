const nodemailer = require("nodemailer");

// =====================================================
// BREVO TRANSPORTER
// =====================================================

const transporter = nodemailer.createTransport({

  host:
    process.env.EMAIL_HOST,

  port:
    process.env.EMAIL_PORT,

  secure: false,

  requireTLS: true,

  auth: {

    user:
      process.env.EMAIL_USER,

    pass:
      process.env.EMAIL_PASS,
  },

  connectionTimeout: 10000,

  greetingTimeout: 10000,

  socketTimeout: 10000,
});

// =====================================================
// SEND EMAIL FUNCTION
// =====================================================

const sendEmail = async (

  to,
  subject,
  htmlContent

) => {

  try {

    // =====================================================
    // MAIL OPTIONS
    // =====================================================

    const mailOptions = {

      from:
        process.env.EMAIL_FROM,

      to,

      subject,

      html:
        htmlContent,
    };

    // =====================================================
    // DEBUG LOGS
    // =====================================================

    console.log(
      "EMAIL USER:",
      process.env.EMAIL_USER
    );

    console.log(
      "EMAIL FROM:",
      process.env.EMAIL_FROM
    );

    // =====================================================
    // SEND MAIL
    // =====================================================

    const info =
      await transporter.sendMail(
        mailOptions
      );

    console.log(
      "EMAIL SENT:",
      info.messageId
    );

    return info;

  } catch (error) {

    console.log(
      "EMAIL ERROR:",
      error
    );

    throw error;
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = sendEmail;