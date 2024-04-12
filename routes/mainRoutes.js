const express = require('express');
const { renderLayout } = require('../controllers/mainControllers');

const router = express.Router();

router.get('/', renderLayout);

module.exports = router;
