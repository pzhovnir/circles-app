const { successResponse, failedResponse } = require('../utils/response');

const createPortfolio = async ({ body, Models, Session }, res) => {
    const { title, description } = body;
    const { id: userId } = Session;
    const { Portfolio } = Models;

    try {
        const profile = await Portfolio.create({
            title,
            description,
            userId,
        });

        res.json(successResponse(profile));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
};

const updatePortfolio = async ({ body, params, Models }, res) => {
    const { title, description } = body;
    const { id } = params;
    const { Portfolio } = Models;

    try {
        await Portfolio.update({
            title,
            description,
        }, {
            where: { id }
        });

        res.json(successResponse({ id }));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
};

const getPortfolios = async ({ body, Models, Session }, res) => {
    const { id: userId } = Session;
    const { Portfolio, Workplace, Course, Company, University, AssociatedSkill, Skill } = Models;

    try {
        const profiles = await Portfolio.findAll( {
            where: { userId },
            include: [
                { model: Workplace, include: [Company] },
                { model: Course, include: [University] },
                { model: AssociatedSkill, include: [Skill]}
            ]
        });

        res.json(successResponse(profiles));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
};

const getPortfolio = async ({ params, Models }, res) => {
    const { Portfolio, Workplace, Course, Company, University, AssociatedSkill, Skill  } = Models;
    const { id } = params;

    try {
        const profile = await Portfolio.findOne({
            where: { id },
            include: [
                { model: Workplace, include: [Company] },
                { model: Course, include: [University] },
                { model: AssociatedSkill, include: [Skill]}
            ]
        });

        res.json(successResponse(profile));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
};

const deletePortfolio = async ({ params, Models }, res) => {
    const { Portfolio } = Models;
    const { id } = params;

    try {
        await Portfolio.destroy({
            where: { id }
        });

        res.json(successResponse({ id }));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
};

module.exports = {
    createPortfolio,
    updatePortfolio,
    getPortfolios,
    getPortfolio,
    deletePortfolio,
}
