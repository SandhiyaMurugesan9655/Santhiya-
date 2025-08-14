const mongoose = require('mongoose');

const PolicyCarrierSchema = new mongoose.Schema({
    company_name: { type: String, required: true }
});

module.exports = mongoose.model('PolicyCarrier', PolicyCarrierSchema);
