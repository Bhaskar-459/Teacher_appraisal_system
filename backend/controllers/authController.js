const User = require('../models/User');

exports.login = async (req, res) => {
    const { username, password, role, institutionId } = req.body;

    try {
        const user = await User.findOne({ username, institutionId, role });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Respond with user details including the role
        res.status(200).json({ 
            message: 'Login successful', 
            user: {
                id : user._id,
                username: user.username,
                role: user.role,
                institutionId: user.institutionId
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};


exports.register = async (req, res) => {
    const { institutionId, username, password, role } = req.body;

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Create new user
        const newUser = new User({
            username,
            password,  // Consider hashing the password in a real application
            role,
            institutionId
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};
