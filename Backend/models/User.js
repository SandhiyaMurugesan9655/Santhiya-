const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    dob: { type: Date, required: true },
    address: { type: String },
    phone_number: { type: String, required: true },
    state: { type: String },
    zip_code: { type: String },
    email: { type: String, required: true, unique: true },
    gender: { type: String },
    userType: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);
