const express = require('express');

const video = require('./video');
const tag = require('./tag');
const videoTagAssociation = require('./video-tag-association');

const router = express.Router();
// Public routes
router.use('/video', video);
router.use('/tag', tag);
router.use('/video-tag-association', videoTagAssociation);

module.exports = router;
