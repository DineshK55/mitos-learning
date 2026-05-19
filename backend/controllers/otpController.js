// controllers/otpController.js
const bcrypt = require("bcryptjs");

const db = require("../config/db");

const generateOTP = require("../utils/generateOTP");

const sendEmail = require("../utils/sendEmail");


// Send OTP Controller
const sendOTP = async (req, res) => {

    try {

        const { email } = req.body;


        // Check Email
        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }


        // Find User
        const [users] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );


        // User Not Found
        if (users.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }


        // Generate OTP
        const otp = generateOTP();


        // OTP Expire Time (5 Minutes)
        const otpExpire = Date.now() + 5 * 60 * 1000;


        // Save OTP In Database
        await db.query(
            "UPDATE users SET otp = ?, otp_expire = ? WHERE email = ?",
            [otp, otpExpire, email]
        );


        // Email HTML
        const htmlContent = `
            <h2>Mitos Learning OTP Verification</h2>

            <p>Your OTP code is:</p>

            <h1>${otp}</h1>

            <p>This OTP will expire in 5 minutes.</p>
        `;


        // Send Email
        await sendEmail(
            email,
            "OTP Verification",
            htmlContent
        );


        res.status(200).json({
            message: "OTP sent successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};


// Verify OTP Controller
const verifyOTP = async (req, res) => {

    try {

        const { email, otp } = req.body;


        // Check Email & OTP
        if (!email || !otp) {

            return res.status(400).json({
                message: "Email and OTP are required"
            });
        }


        // Find User
        const [users] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );


        // User Not Found
        if (users.length === 0) {

            return res.status(404).json({
                message: "User not found"
            });
        }


        const user = users[0];


        // Check OTP
        if (user.otp !== otp) {

            return res.status(400).json({
                message: "Invalid OTP"
            });
        }


        // Check OTP Expiry
        if (Date.now() > user.otp_expire) {

            return res.status(400).json({
                message: "OTP expired"
            });
        }


        // Verify User
        await db.query(
            `
            UPDATE users
            SET is_verified = ?, otp = NULL, otp_expire = NULL
            WHERE email = ?
            `,
            [true, email]
        );


        res.status(200).json({
            message: "OTP verified successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Forgot Password OTP Controller
const forgotPasswordOTP = async (req, res) => {

    try {

        const { email } = req.body;


        // Check Email
        if (!email) {

            return res.status(400).json({
                message: "Email is required"
            });
        }


        // Find User
        const [users] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );


        // User Not Found
        if (users.length === 0) {

            return res.status(404).json({
                message: "User not found"
            });
        }


        // Generate OTP
        const otp = generateOTP();


        // OTP Expiry
        const otpExpire = Date.now() + 5 * 60 * 1000;


        // Save OTP
        await db.query(
            "UPDATE users SET otp = ?, otp_expire = ? WHERE email = ?",
            [otp, otpExpire, email]
        );


        // Email Content
        const htmlContent = `
            <h2>Password Reset OTP</h2>

            <p>Your password reset OTP is:</p>

            <h1>${otp}</h1>

            <p>This OTP will expire in 5 minutes.</p>
        `;


        // Send Email
        await sendEmail(
            email,
            "Reset Password OTP",
            htmlContent
        );


        res.status(200).json({
            message: "Reset OTP sent successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};


// Reset Password Controller
const resetPassword = async (req, res) => {

    try {

        const { email, newPassword } = req.body;


        // Check Fields
        if (!email || !newPassword) {

            return res.status(400).json({
                message: "Email and new password are required"
            });
        }


        // Find User
        const [users] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );


        // User Not Found
        if (users.length === 0) {

            return res.status(404).json({
                message: "User not found"
            });
        }


        // Hash New Password
        const hashedPassword = await bcrypt.hash(newPassword, 10);


        // Update Password
        await db.query(
            `
            UPDATE users
            SET password = ?, otp = NULL, otp_expire = NULL
            WHERE email = ?
            `,
            [hashedPassword, email]
        );


        res.status(200).json({
            message: "Password reset successful"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports = {
    sendOTP,
    verifyOTP,
    forgotPasswordOTP,
    resetPassword
};