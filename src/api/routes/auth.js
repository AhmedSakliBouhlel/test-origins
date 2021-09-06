const express = require('express');
const {
  login, logout, refresh, signup,
} = require('../controllers/auth');

const router = express.Router();

router
  .route('/')
  .post(login);

router
  .route('/logout')
  .post(logout);

router
  .route('/refresh')
  .post(refresh);

router
  .route('/signup')
  .post(signup);
module.exports = router;
