require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/db');

const uploadRoutes = require('./routes/upload');
const searchRoutes = require('./routes/search');
const aggregateRoutes = require('./routes/aggregate');
const scheduleRoutes = require('./routes/schedule');


require('./services/messageScheduler');

require('./utils/cpuMonitor');

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

app.get('/test-error', (req, res, next) => {
    throw new Error('This is a test error for PM2 error log');
});

[uploadRoutes, searchRoutes, aggregateRoutes, scheduleRoutes].forEach(route => app.use(route));

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
});
