const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

async function signup(req, res) {
    const { username, email, password } = req.body;

    try {
        const alreadyExist = await User.findOne({ email });
        if (alreadyExist) {
            return res.status(400).json({ error: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        return res.status(500).json({ error: "Registration failed", details: error.message });
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email:email });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email},
            jwtSecret,
            { expiresIn: '1h' }
        );

        return res.status(200).json({ message: "Login successful", token, user });
    } catch (error) {
        return res.status(500).json({ error: "Login failed", details: error.message });
    }
}

async function verify(req,res){
        try {
            const user = await User.findById(req.user.id).select('-password'); // Exclude password field
    
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
    
            res.status(200).json({ user });
        } catch (error) {
            res.status(500).json({ error: 'Error fetching user', details: error.message });
        }
}

module.exports = { login, signup,verify };
