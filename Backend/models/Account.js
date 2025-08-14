const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    account_name: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Account', AccountSchema);
