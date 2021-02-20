const express = require('express');
const AuthController = require('../../controllers/AuthController');
const { signUpForm, signInForm } = require('../../utils/validators/auth');

const router = express.Router();

router.post('/sign-up', [...signUpForm], AuthController.SignUp);

router.post('/sign-in', [...signInForm], AuthController.SignIn);

module.exports = router;
