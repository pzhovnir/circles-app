const express = require('express');
const authCheck = require('../../middlewares/authCheck');

const auth = require('./auth');
const companies = require('./companies');
const profiles = require('./profiles');

const authGuard = authCheck();
const router = express.Router();

router.use('/auth', auth);
router.use('/companies', [authGuard], companies)
router.use('/profiles', [authGuard], profiles);

module.exports = router;