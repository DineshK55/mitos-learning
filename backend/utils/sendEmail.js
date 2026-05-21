const nodemailer = require("nodemailer");

// =====================================================
// BREVO TRANSPORTER
// =====================================================

const transporter = nodemailer.createTransport({

  host:
    process.env.EMAIL_HOST,

  port:
    465,

  secure: true,

  auth: {

    user:
      process.env.EMAIL_USER,

    pass:
      process.env.EMAIL_PASS,
  },
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