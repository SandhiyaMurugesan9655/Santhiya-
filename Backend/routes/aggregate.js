const express = require('express');
const router = express.Router();
const aggregateController = require('../controllers/aggregateController');

router.get('/policies/aggregate', aggregateController.aggregatePolicies);

module.exports = router;
