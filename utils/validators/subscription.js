const { check, validationResult } = require('express-validator');
const { failedResponse } = require('../response');

const checkProviderId = check('providerId')
    .not()
    .isEmpty()
    .withMessage('providerId shouldn\'t be empty');

const errorsReporting = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422)
            .json(failedResponse(errors.array()));
    }
    next();
}

module.exports = {
    createSubscriptionForm: [
        checkProviderId,
        errorsReporting,
    ],
};
