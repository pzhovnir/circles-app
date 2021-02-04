const express = require('express');
const Auth = require('../../controllers/auth');
const { SignUpForm, SignInForm } = require('../../middlewares/forms');

const router = express.Router();

router.post('/sign-up', [...SignUpForm], Auth.SignUp);

router.post('/sign-in', [...SignInForm], Auth.SignIn);

module.exports = router;
