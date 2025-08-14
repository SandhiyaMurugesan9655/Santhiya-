const cron = require('node-cron');
const ScheduledMessage = require('../models/ScheduledMessage');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

cron.schedule('* * * * *', async () => {
    const now = new Date();
    const messages = await ScheduledMessage.find({
        sent: false,
        scheduledFor: { $lte: now }
    }).populate('user');

    for (const msg of messages) {
        try {
            await sendEmail(msg.user.email, 'Scheduled Message', msg.message);
            msg.sent = true;
            await msg.save();
            console.log(`Email sent to ${msg.user.email}`);
        } catch (err) {
            console.error(`Failed to send email to ${msg.user.email}:`, err.message);
        }
    }
});
