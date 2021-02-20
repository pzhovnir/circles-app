const { check, validationResult } = require('express-validator');
const { failedResponse } = require('../response');

const checkPosition = check('position')
    .not()
    .isEmpty()
    .withMessage('Position shouldn\'t be empty')
    .isLength({ min: 3 })
    .withMessage('Min length 3 symbols');


const checkResponsibility = check('responsibility')
    .not()
    .isEmpty()
    .withMessage('Responsibility shouldn\'t be empty')
    .isLength({ max: 100 })
    .withMessage('Max length 100 symbols')

const errorsReporting = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422)
            .json(failedResponse(errors.array()));
    }
    next();
}

module.exports = {
    createWorkspaceForm: [
        checkPosition,
        checkResponsibility,
        errorsReporting,
    ],
};