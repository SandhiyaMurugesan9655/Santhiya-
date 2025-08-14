
const path = require('path');
const { Worker } = require('worker_threads');

exports.uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }
    const filePath = req.file.path;
    const worker = new Worker(path.join(__dirname, '../workers/fileProcessor.js'), {
        workerData: { filePath }
    });


    worker.on('message', async (msg) => {
        if (msg.success) {
            try {
                const User = require('../models/User');
                const Policy = require('../models/Policy');
                const PolicyCarrier = require('../models/PolicyCarrier');
                const PolicyCategory = require('../models/PolicyCategory');

                let inserted = 0;
                for (const row of msg.data) {
                    let user = await User.findOne({ email: row.email });
                    if (!user) {
                        user = await User.create({
                            first_name: row.first_name,
                            dob: row.dob,
                            address: row.address,
                            phone_number: row.phone_number,
                            state: row.state,
                            zip_code: row.zip_code,
                            email: row.email,
                            gender: row.gender,
                            userType: row.userType
                        });
                    }

                    let carrier = await PolicyCarrier.findOne({ company_name: row.company_name });
                    if (!carrier) {
                        carrier = await PolicyCarrier.create({ company_name: row.company_name });
                    }

                    let category = await PolicyCategory.findOne({ category_name: row.category_name });
                    if (!category) {
                        category = await PolicyCategory.create({ category_name: row.category_name });
                    }

                    let policy = await Policy.findOne({ policy_number: row.policy_number });
                    if (!policy) {
                        await Policy.create({
                            policy_number: row.policy_number,
                            start_date: row.start_date,
                            end_date: row.end_date,
                            user: user._id,
                            carrier: carrier._id,
                            category: category._id
                        });
                        inserted++;
                    }
                }
                res.json({ message: 'File processed and data inserted!', records: inserted });
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        } else {
            res.status(500).json({ message: msg.error });
        }
    });

    worker.on('error', (err) => {
        res.status(500).json({ message: err.message });
    });

    worker.on('exit', (code) => {
        if (code !== 0) {
            console.error(`Worker stopped with exit code ${code}`);
        }
    });
};
