const express = require('express');
const router = express.Router();
const { saveMetric } = require('../controllers/metricsController');

router.post('/metrics', saveMetric);

module.exports = router;
