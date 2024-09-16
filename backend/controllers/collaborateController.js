const Collaborate = require('../models/Collaborate');

exports.collaborateController = async (req, res) => {
    // get the teacherId1, teacherId2, topic, and status from the request body
    const { teacherId1, teacherId2, topic } = req.body;

    try {
        // Create a new collaboration
        const newCollaboration = new Collaborate({
            teacherId1,
            teacherId2,
            topic,
        });

        await newCollaboration.save();
        res.status(201).json({ message: 'Collaboration started successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error starting collaboration', error });
    }
}
