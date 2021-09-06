const express = require('express');
const {
  list, listByTag, create, update, remove,
} = require('../controllers/video');

const router = express.Router();

router
  .route('/')
  .get(list);

router
  .route('/listByTag')
  .get(listByTag);

router
  .route('/')
  .post(create);

router
  .route('/:id')
  .put(update);

router
  .route('/:id')
  .delete(remove);

module.exports = router;
