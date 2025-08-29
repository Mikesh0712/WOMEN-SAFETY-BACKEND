// This file sets up the routes for the SOS functionality in the application.

const express = require('express');
const router = express.Router();
const sosController = require('../controllers/sosController');

// Route to handle SOS requests
router.post('/send-sos', sosController.sendSOS);

module.exports = router;