const express = require('express');
const UniversityController = require('../../controllers/UniversityController');
const { createUniversityForm } = require('../../utils/validators/university');

const router = express.Router();

router.post('/', [...createUniversityForm], UniversityController.createUniversity);

router.put('/:id', [...createUniversityForm], UniversityController.updateUniversity);

router.get('/', [], UniversityController.getUniversities);

router.get('/:id', [], UniversityController.getUniversity);

router.delete('/:id', [], UniversityController.deleteUniversity);

module.exports = router;
