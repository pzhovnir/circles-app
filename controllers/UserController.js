const { Op } = require('sequelize');

const { successResponse, failedResponse } = require('../utils/response');

const getUsers = async ({ query, Models }, res) => {
    const { User } = Models;
    const { limit = 20, offset = 0, q = '' } = query;

    try {
        const users = await User.findAll({
            where: {
                [Op.or]: [
                    {
                        username: {
                            [Op.substring]: `%${q}%`
                        }
                    },
                    {
                        email: {
                            [Op.substring]: `%${q}%`
                        }
                    },
                ],
            },
            limit,
            offset
        });
        return res.send(successResponse(users));
    } catch (err) {
        return res.status(500).send(failedResponse({ message: err.message }));
    }
}

const getMe = async ({ query, Models, Session }, res) => {
    const { User } = Models;
    const { id: userId } = Session;

    try {
        const me = await User.findOne({
            where: { id: userId }
        });
        return res.send(successResponse(me));
    } catch (err) {
        return res.status(500).send(failedResponse({ message: err.message }));
    }
}
module.exports = {
    getUsers,
    getMe,
};
