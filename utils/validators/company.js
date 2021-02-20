const { check, validationResult } = require('express-validator');
const { failedResponse } = require('../response');

const nameName = check('name')
    .not()
    .isEmpty()
    .withMessage('Name shouldn\'t be empty')
    .isLength({ min: 3 })
    .withMessage('Min length 3 symbols');


const checkDescription = check('description')
    .not()
    .isEmpty()
    .isLength({ max: 255 })
    .withMessage('Max length 255 symbols');

const checkLocation = check('location')
    .not()
    .isEmpty()
    .isLength({ max: 100 })
    .withMessage('Max length 100 symbols');

const errorsReporting = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422)
            .json(failedResponse(errors.array()));
    }
    next();
}

module.exports = {
    createCompanyForm: [
        nameName,
        checkDescription,
        checkLocation,
        errorsReporting,
    ],
};