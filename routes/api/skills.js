const express = require('express');
const SkillController = require('../../controllers/SkillController');
const { createSkillForm } = require('../../utils/validators/skill');

const router = express.Router();

router.post('/', [...createSkillForm], SkillController.createSkill);
router.get('/', [], SkillController.findSkills);

module.exports = router;
