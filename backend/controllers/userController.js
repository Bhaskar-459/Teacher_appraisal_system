const User = require('../models/User');
// get all users

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    }
    catch (error) {
        res.status(500).json({ message: 'Error getting users', error });
    }
}
