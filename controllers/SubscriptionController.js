const { successResponse, failedResponse } = require('../utils/response');

const toggleConfirmSubscription = (confirmed = false) => async ({ params, body, Models, Session }, res) => {
    const { Subscription } = Models;
    const { id } = params;

    try {
        await Subscription.update({
            confirmed: Number(confirmed),
        }, {
            where: { id }
        })

        res.json(successResponse({ id }));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
}

const createSubscription = async ({ params, body, Models, Session }, res) => {
    const { Subscription } = Models;
    const { id: userId } = Session;
    const { providerId = null } = body;

    try {
        const subscription = await Subscription.create({
            userId,
            providerId,
        })

        res.json(successResponse(subscription));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
}

const getSubscriptions = (incoming = false) => async ({ params, body, Models, Session }, res) => {
    const { User, Subscription } = Models;
    const { id: userId } = Session;

    try {
        const subscriptions = await Subscription.findAll({
            where: { [incoming ? 'providerId' : 'userId']: userId },
            include: [User]
        });

        res.json(successResponse(subscriptions));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
}

const deleteSubscription = async ({ params, Models }, res) => {
    const { Subscription } = Models;
    const { id: subscriptionId } = params;

    try {
        await Subscription.destroy({ where: { id: subscriptionId }});

        res.json(successResponse({ id: subscriptionId }));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
};

module.exports = {
    create: createSubscription,
    getIncoming: getSubscriptions(true),
    getOutgoing: getSubscriptions(),
    confirm: toggleConfirmSubscription( true),
    unconfirm: toggleConfirmSubscription(),
    delete: deleteSubscription
}
