const express = require('express');
const router = express.Router();

const AuthController = require('../../controllers/auth.controller');

router.post(
  '/sign-in',
  [],
  AuthController.SignIn
);

router.post(
  '/sign-up',
  [],
  AuthController.SignUp
);

module.exports = router;
