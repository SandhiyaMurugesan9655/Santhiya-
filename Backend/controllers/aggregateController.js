
exports.aggregatePolicies = async (req, res) => {
    try {
        const User = require('../models/User');
        const Policy = require('../models/Policy');

        const aggregation = await Policy.aggregate([
            {
                $group: {
                    _id: "$user",
                    policyCount: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: "$user" },
            {
                $project: {
                    _id: 0,
                    user: {
                        first_name: "$user.first_name",
                        email: "$user.email",
                        userType: "$user.userType"
                    },
                    policyCount: 1
                }
            }
        ]);

        res.json({ users: aggregation });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
