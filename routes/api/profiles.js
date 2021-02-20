const express = require('express');

const ProfileController = require('../../controllers/ProfileController');
const WorkplaceController = require('../../controllers/WorkplaceController');

const { createProfileForm } = require('../../utils/validators/profile');
const { createWorkspaceForm } = require('../../utils/validators/workspace');


const router = express.Router();


router.post('/', [...createProfileForm], ProfileController.createProfile);
router.get('/', [], ProfileController.getProfiles);

router.put('/:id', [...createProfileForm], ProfileController.updateProfile);
router.get('/:id', [], ProfileController.getProfile);
router.delete('/:id', [], ProfileController.deleteProfile);

router.post('/:id/workplaces', [...createWorkspaceForm], WorkplaceController.addWorkplace);

module.exports = router;
