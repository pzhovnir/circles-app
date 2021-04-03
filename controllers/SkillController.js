const { successResponse, failedResponse } = require('../utils/response');
const { Op } = require('sequelize');

const createSkill = async ({ params, body, Models }, res) => {
    const { Skill } = Models;
    const { name } = body;

    try {
        const skill = await Skill.create({ name });

        res.json(successResponse(skill));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
}

const findSkills = async ({ body, query, Models }, res) => {
    const { Skill } = Models;
    const { limit = 20, offset = 0, q = '' } = query;

    try {
        const skills = await Skill.findAll({
            where: {
                name: {
                    [Op.substring]: `%${q}%`
                }
            },
            limit,
            offset,
        });

        res.json(successResponse(skills));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
}

const getPortfolioSkills = async ({ params, Models }, res) => {
    const { AssociatedSkill, Skill } = Models;
    const { id: portfolioId } = params;

    try {
        const skills = await AssociatedSkill.findAll({
            where: { portfolioId },
            include: [Skill]
        });

        res.json(successResponse(skills));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
}

const setPortfolioSkill = async ({ params, body, Models }, res) => {
    const { AssociatedSkill } = Models;
    const { skillId, expLevel } = body;
    const { id: portfolioId } = params;

    try {

        const count = await AssociatedSkill.count({ where: { portfolioId, skillId }});
        if (count) throw new Error('The same skill can\'t be associated twice');

        const associatedSkill = await AssociatedSkill.create({
            portfolioId,
            skillId,
            expLevel,
        });

        res.json(successResponse(associatedSkill));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
}

const unsetPortfolioSkill = async ({ params, Models }, res) => {
    const { AssociatedSkill } = Models;
    const { id: portfolioId, skillId } = params;

    try {
        await AssociatedSkill.destroy({
            where: {
                portfolioId,
                skillId
            }
        });

        res.json(successResponse({ skillId }));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
}

const deleteSkill = async ({ params, Models }, res) => {
    const { Skill } = Models;
    const { skillId } = params;

    try {
        await Skill.destroy({ where: { id: skillId }});

        res.json(successResponse({ id: skillId }));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
};

module.exports = {
    createSkill,
    findSkills,
    getPortfolioSkills,
    setPortfolioSkill,
    unsetPortfolioSkill,
    deleteSkill,
}
