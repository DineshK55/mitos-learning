const jwt = require("jsonwebtoken");
const db = require("../config/db");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            student_class,
            state,
            password
        } = req.body;


        // Check Existing Email
        const [existingUser] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );


        // Email Already Exists
        if (existingUser.length > 0) {

            return res.status(400).json({
                message: "Email already registered"
            });
        }


        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);


        // Insert User
        const sql = `
            INSERT INTO users 
            (name, email, phone, student_class, state, password)
            VALUES (?, ?, ?, ?, ?, ?)
        `;


        await db.query(
            sql,
            [
                name,
                email,
                phone,
                student_class,
                state,
                hashedPassword
            ]
        );


        res.status(201).json({
            message: "User Registered Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Registration Failed"
        });
    }
};

const loginUser = async (req, res) => {

    try {

        console.log("Login API Called");

        const { email, password } = req.body;

        console.log(email);

        // Find User
        const [result] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        console.log(result);

        // User Not Found
        if (result.length === 0) {

            return res.status(404).json({
                message: "User Not Found"
            });
        }

        const user = result[0];

        console.log("User Found");

        // Compare Password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        console.log(isMatch);

        // Invalid Password
        if (!isMatch) {

            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        // Generate JWT
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        console.log("Login Success");

        res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Get Profile
const getProfile = (req, res) => {
    res.status(200).json({
        message: "Protected Profile Data",
        user: req.user
    });
};

module.exports = {
    registerUser,
    loginUser,
    getProfile
};