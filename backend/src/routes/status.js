const express = require('express');
const { getStatus, getInfo } = require('../controllers/statusController');

const router = express.Router();

router.get('/status', getStatus);
router.get('/info', getInfo);

module.exports = router;