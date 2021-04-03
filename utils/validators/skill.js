const { check, validationResult } = require('express-validator');
const { failedResponse } = require('../response');

const checkId = check('skillId')
    .not()
    .isEmpty()
    .withMessage('skillId shouldn\'t be empty');

const checkName = check('name')
    .not()
    .isEmpty()
    .withMessage('Name shouldn\'t be empty')
    .isLength({ min: 2 })
    .withMessage('Min length 2 symbols');

const checkExpLevel = check('expLevel')
    .not()
    .isEmpty()
    .withMessage('expLevel shouldn\'t be empty')
    .isIn(['low', 'middle', 'high'])
    .withMessage('Allowed values: \'low\', \'middle\', \'high\'');

const errorsReporting = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422)
            .json(failedResponse(errors.array()));
    }
    next();
}

module.exports = {
    createSkillForm: [
        checkName,
        errorsReporting,
    ],
    createAssociatedSkillForm: [
        checkId,
        checkExpLevel,
        errorsReporting,
    ]
};
