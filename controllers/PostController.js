const { Op } = require("sequelize");
const { successResponse, failedResponse } = require('../utils/response');

const getPosts = async ({ query, Models, Session }, res) => {
    const { Post, User, Subscription } = Models;
    const { id: userId } = Session;
    const { limit = 20, offset = 0 } = query;

    try {
        const subscriptions = await Subscription.findAll({
            where: {
                userId,
                confirmed: true,
            },
            attributes: ['providerId']
        });

        const providerIds = [userId, ...(subscriptions.map((s) => s.providerId))];
        const posts = await Post.findAll({
            where: {
                userId: {
                    [Op.in]: providerIds
                },
            },
            include: [
                { model: User },
            ],
            limit,
            offset,
            order: [['createdAt', 'desc']]
        })

        return res.send(successResponse(posts));
    } catch (err) {
        return res.status(500).send(failedResponse({ message: err.message }));
    }
}

const createPost = async ({ body, Models, Session }, res) => {
    const { title, description } = body;
    const { id: userId } = Session;
    const { Post } = Models;

    try {
        const post = await Post.create({
            title,
            description,
            userId,
        });

        res.json(successResponse(post));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
};

module.exports = {
    getPosts,
    createPost,
};
