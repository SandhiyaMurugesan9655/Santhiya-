
// Handles scheduling messages
exports.scheduleMessage = async (req, res) => {
    try {
        const { email, message, scheduledFor } = req.body;
        if (!email || !message || !scheduledFor) {
            return res.status(400).json({ message: 'email, message, and scheduledFor are required.' });
        }
        const User = require('../models/User');
        const ScheduledMessage = require('../models/ScheduledMessage');

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const scheduledMessage = await ScheduledMessage.create({
            message,
            user: user._id,
            scheduledFor: new Date(scheduledFor),
        });

        res.json({ message: 'Message scheduled successfully!', scheduledMessage });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
