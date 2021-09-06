const express = require('express');

const video = require('./video');
const tag = require('./tag');
const videoTagAssociation = require('./video-tag-association');
const auth = require('./auth');

const router = express.Router();
// Public routes
router.use('/auth', auth);
router.use('/video', video);
router.use('/tag', tag);
router.use('/video-tag-association', videoTagAssociation);

module.exports = router;
