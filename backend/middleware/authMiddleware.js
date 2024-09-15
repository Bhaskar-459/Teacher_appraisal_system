const User = require('../models/User');

exports.authMiddleware = async (req, res, next) => {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
};
