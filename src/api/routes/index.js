const express = require('express');

const video = require('./video');

const router = express.Router();
// Public routes
router.use('/video', video);

module.exports = router;
