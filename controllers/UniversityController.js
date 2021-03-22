const { successResponse, failedResponse } = require('../utils/response');

const createUniversity = async ({ body, Models, Session }, res) => {
    const { name, location } = body;
    const { id: userId } = Session;
    const { University } = Models;

    try {
        const u = await University.create({
            name,
            location,
            addedBy: userId,
        });

        res.json(successResponse(u));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
};

const updateUniversity = async ({ body, params, Models }, res) => {
    const { name, description, location } = body;
    const { id } = params;
    const { University } = Models;

    try {
        await University.update({
            name,
            description,
            location,
        }, {
            where: { id }
        });

        res.json(successResponse({ id }));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
};

const getUniversities = async ({ body, Models, Session }, res) => {
    const { id: userId } = Session;
    const { University } = Models;

    try {
        const universities = await University.findAll( {
            where: { addedBy: userId }
        },);

        res.json(successResponse(universities));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
};

const getUniversity = async ({ params, Models }, res) => {
    const { University } = Models;
    const { id } = params;

    try {
        const u = await University.findOne({
            where: { id }
        });

        res.json(successResponse(u));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
};

const deleteUniversity = async ({ params, Models }, res) => {
    const { University } = Models;
    const { id } = params;

    try {
        await University.destroy({
            where: { id }
        });

        res.json(successResponse({ id }));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
};


module.exports = {
    createUniversity,
    updateUniversity,
    getUniversity,
    getUniversities,
    deleteUniversity,
}
