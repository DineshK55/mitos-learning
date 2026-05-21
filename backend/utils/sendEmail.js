const axios = require("axios");

// =====================================================
// SEND EMAIL FUNCTION
// =====================================================

const sendEmail = async (

  to,
  subject,
  htmlContent

) => {

  try {

    const response =
      await axios.post(

        "https://api.brevo.com/v3/smtp/email",

        {

          sender: {

            name: "Mitos Learning",

            email:
              "noreply@mitoslearning.shop",
          },

          to: [
            {
              email: to,
            },
          ],

          subject,

          htmlContent,
        },

        {

          headers: {

            "api-key":
              process.env.BREVO_API_KEY,

            "Content-Type":
              "application/json",
          },
        }
      );

    console.log(
      "EMAIL SENT SUCCESSFULLY"
    );

    return response.data;

  } catch (error) {

    console.log(
      "EMAIL ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};

module.exports = sendEmail;