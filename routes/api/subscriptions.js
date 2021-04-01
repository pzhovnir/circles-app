const express = require('express');
const SubscriptionController = require('../../controllers/SubscriptionController');
const { createSubscriptionForm } = require('../../utils/validators/subscription');

const router = express.Router();

router.post('/', [...createSubscriptionForm], SubscriptionController.create);

router.post('/:id/confirm', [], SubscriptionController.confirm);
router.post('/:id/unconfirm', [], SubscriptionController.unconfirm);

router.get('/incoming', [], SubscriptionController.getIncoming);
router.get('/outgoing', [], SubscriptionController.getOutgoing);

router.delete('/:id', [], SubscriptionController.delete);

module.exports = router;
