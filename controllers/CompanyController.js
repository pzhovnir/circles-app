const { successResponse, failedResponse } = require('../utils/response');

const createCompany = async ({ body, Models, Session }, res) => {
    const { name, description, location } = body;
    const { id: userId } = Session;
    const { Company } = Models;

    try {
        const company = await Company.create({
            name,
            description,
            location,
            addedBy: userId,
        });

        res.json(successResponse(company));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
};

const updateCompany = async ({ body, params, Models }, res) => {
    const { name, description, location } = body;
    const { id } = params;
    const { Company } = Models;

    try {
        await Company.update({
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

const getCompanies = async ({ body, Models, Session }, res) => {
    const { id: userId } = Session;
    const { Company } = Models;

    try {
        const companies = await Company.findAll( {
            where: { userId }
        },);

        res.json(successResponse(companies));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
};

const getCompany = async ({ params, Models }, res) => {
    const { Company } = Models;
    const { id } = params;

    try {
        const company = await Company.findOne({
            where: { id }
        });

        res.json(successResponse(company));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
};

const deleteCompany = async ({ params, Models }, res) => {
    const { Company } = Models;
    const { id } = params;

    try {
        await Company.destroy({
            where: { id }
        });

        res.json(successResponse({ id }));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
};


module.exports = {
    createCompany,
    updateCompany,
    getCompany,
    getCompanies,
    deleteCompany,
}