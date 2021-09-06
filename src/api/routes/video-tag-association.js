const express = require('express');
const {
  list, create, remove,
} = require('../controllers/video-tag-association');

const router = express.Router();

router
  .route('/')
  .get(list);

router
  .route('/')
  .post(create);

router
  .route('/:id')
  .delete(remove);

module.exports = router;
