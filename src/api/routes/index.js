const express = require('express');

const video = require('./video');
const tag = require('./tag');

const router = express.Router();
// Public routes
router.use('/video', video);
router.use('/tag', tag);

module.exports = router;
