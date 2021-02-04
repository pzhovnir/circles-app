const { check, validationResult } = require('express-validator');
const { failedResponse } = require('../utils/response');

const checkEmail = check('email')
    .not()
    .isEmpty()
    .withMessage('Email shouldn\'t be empty')
    .normalizeEmail()
    .isEmail()
    .withMessage('It should be a right email');

const checkName = check('username')
    .not()
    .isEmpty()
    .withMessage('Name shouldn\'t be empty')
    .isLength({ min: 3 })
    .withMessage('Min length 3 symbols')

const checkPassword = check('password')
    .not()
    .isEmpty()
    .withMessage('Password shouldn\'t be empty')
    .isLength({ min: 8 })
    .withMessage('Password min length is 8 symbols')
    .matches('[0-9]')
    .withMessage('Password must contain numbers')
    .matches('[A-Z]')
    .withMessage('Password must contain capital letters')
    .trim()
    .escape();

const checkPasswordConfirmation = check('passwordConfirmation')
    .exists()
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Password confirmation must be equal to the password field');


const errorsReporting = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422)
            .json(failedResponse(errors.array()));
    }
    next();
}

module.exports = {
    SignUpForm: [
        checkEmail,
        checkName,
        checkPassword,
        checkPasswordConfirmation,
        errorsReporting,
    ],
    SignInForm: [
        checkEmail,
        checkPassword,
        errorsReporting,
    ],
};