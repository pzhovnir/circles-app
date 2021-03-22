const express = require('express');

const PortfolioController = require('../../controllers/PortfolioController');
const WorkplaceController = require('../../controllers/WorkplaceController');
const CourseController = require('../../controllers/CourseController');

const { createProfileForm } = require('../../utils/validators/profile');
const { createWorkspaceForm } = require('../../utils/validators/workspace');
const { createCourseForm } = require('../../utils/validators/course');

const router = express.Router();

router.post('/', [...createProfileForm], PortfolioController.createPortfolio);
router.get('/', [], PortfolioController.getPortfolios);
router.put('/:id', [...createProfileForm], PortfolioController.updatePortfolio);
router.get('/:id', [], PortfolioController.getPortfolio);
router.delete('/:id', [], PortfolioController.deletePortfolio);

router.post('/:id/workplaces', [...createWorkspaceForm], WorkplaceController.addWorkplace);
router.get('/:id/workplaces', [], WorkplaceController.getWorkplaces);
router.delete('/:id/workplaces/:workspaceId', [], WorkplaceController.deleteWorkplace);

router.post('/:id/courses', [...createCourseForm], CourseController.addCourse)
router.get('/:id/courses', [], CourseController.getCourses)
router.delete('/:id/courses/:courseId', [], WorkplaceController.deleteWorkplace);

module.exports = router;
