const { successResponse, failedResponse } = require('../utils/response');

const addWorkplace = async ({ params, body, Models }, res) => {
    const { Workplace } = Models;
    const { id: portfolioId } = params;
    const { position, responsibility, startDate = null, endDate = null, companyId = null } = body;

    try {
        const workspace = await Workplace.create({
            position,
            responsibility,
            startDate,
            endDate,
            companyId,
            portfolioId,
        })

        res.json(successResponse(workspace));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
}

const getWorkplaces = async ({ params, body, Models }, res) => {
    const { Company, Workplace } = Models;
    const { id: portfolioId } = params;

    try {
        const workplaces = await Workplace.findAll({
            where: { portfolioId },
            include: [Company]
        });

        res.json(successResponse(workplaces));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
}

const deleteWorkplace = async ({ params, Models }, res) => {
    const { Workplace } = Models;
    const { workspaceId } = params;

    try {
        await Workplace.destroy({ where: { id: workspaceId }});

        res.json(successResponse({ id: workspaceId }));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
};

module.exports = {
    addWorkplace,
    getWorkplaces,
    deleteWorkplace,
}
