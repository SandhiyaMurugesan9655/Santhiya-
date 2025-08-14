const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema({
    policy_number: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    carrier: { type: mongoose.Schema.Types.ObjectId, ref: 'PolicyCarrier', required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'PolicyCategory', required: true }
});

module.exports = mongoose.model('Policy', PolicySchema);
