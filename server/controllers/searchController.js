
// Handles searching policy info by username
exports.searchByUsername = async (req, res) => {
    try {
        const { username } = req.query;
        if (!username) {
            return res.status(400).json({ message: 'Username is required.' });
        }
        const User = require('../models/User');
        const Policy = require('../models/Policy');
        const PolicyCarrier = require('../models/PolicyCarrier');
        const PolicyCategory = require('../models/PolicyCategory');

        // Find user by first_name (case-insensitive)
        const user = await User.findOne({ first_name: { $regex: `^${username}$`, $options: 'i' } });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Find policies for this user
        const policies = await Policy.find({ user: user._id })
            .populate('carrier', 'company_name')
            .populate('category', 'category_name');

        res.json({
            user: {
                first_name: user.first_name,
                dob: user.dob,
                address: user.address,
                phone_number: user.phone_number,
                state: user.state,
                zip_code: user.zip_code,
                email: user.email,
                gender: user.gender,
                userType: user.userType
            },
            policies: policies.map(p => ({
                policy_number: p.policy_number,
                start_date: p.start_date,
                end_date: p.end_date,
                company_name: p.carrier?.company_name,
                category_name: p.category?.category_name
            }))
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
