const { successResponse, failedResponse } = require('../utils/response');

const addWorkplace = async ({ params, body, Models }, res) => {
    const { Workplace } = Models;
    const { id: profileId } = params;
    const { position, responsibility, startDate = null, endDate = null, companyId = null } = body;

    try {
        const workspace = await Workplace.create({
            position,
            responsibility,
            startDate,
            endDate,
            companyId,
            profileId,
        })

        res.json(successResponse(workspace));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
}

module.exports = {
    addWorkplace,
}