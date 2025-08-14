const mongoose = require('mongoose');

const ScheduledMessageSchema = new mongoose.Schema({
    message: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    scheduledFor: { type: Date, required: true },
    sent: { type: Boolean, default: false }
});

module.exports = mongoose.model('ScheduledMessage', ScheduledMessageSchema);
