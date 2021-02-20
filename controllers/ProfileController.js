const { successResponse, failedResponse } = require('../utils/response');

const createProfile = async ({ body, Models, Session }, res) => {
    const { title, description } = body;
    const { id: userId } = Session;
    const { Profile } = Models;

    try {
        const profile = await Profile.create({
            title,
            description,
            userId,
        });

        res.json(successResponse(profile));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
};

const updateProfile = async ({ body, params, Models }, res) => {
    const { title, description } = body;
    const { id } = params;
    const { Profile } = Models;

    try {
        await Profile.update({
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

const getProfiles = async ({ body, Models, Session }, res) => {
    const { id: userId } = Session;
    const { Profile, Workplace, Course } = Models;

    try {
        const profiles = await Profile.findAll( {
            where: { userId },
            include: [Workplace, Course]
        });

        res.json(successResponse(profiles));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
};

const getProfile = async ({ params, Models }, res) => {
    const { Profile } = Models;
    const { id } = params;

    try {
        const profile = await Profile.findOne({
            where: { id }
        });

        res.json(successResponse(profile));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
};

const deleteProfile = async ({ params, Models }, res) => {
    const { Profile } = Models;
    const { id } = params;

    try {
        await Profile.destroy({
            where: { id }
        });

        res.json(successResponse({ id }));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
};

module.exports = {
    createProfile,
    updateProfile,
    getProfile,
    getProfiles,
    deleteProfile,
}