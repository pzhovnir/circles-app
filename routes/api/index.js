const express = require('express');
const authCheck = require('../../middlewares/authCheck');

const auth = require('./auth');
const companies = require('./companies');
const universities = require('./universities');
const portfolios = require('./portfolios');

const authGuard = authCheck();
const router = express.Router();

router.use('/auth', auth);
router.use('/companies', [authGuard], companies);
router.use('/universities', [authGuard], universities)
router.use('/portfolios', [authGuard], portfolios);

module.exports = router;
