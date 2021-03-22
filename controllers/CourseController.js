const { successResponse, failedResponse } = require('../utils/response');

const addCourse = async ({ params, body, Models }, res) => {
    const { Course } = Models;
    const { id: portfolioId } = params;
    const { name, description, startDate = null, endDate = null, universityId = null } = body;

    try {
        const workspace = await Course.create({
            name,
            description,
            startDate,
            endDate,
            universityId,
            portfolioId,
        })

        res.json(successResponse(workspace));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
}

const getCourses = async ({ params, body, Models }, res) => {
    const { University, Course } = Models;
    const { id: portfolioId } = params;

    try {
        const courses = await Course.findAll({
            where: { portfolioId },
            include: [University]
        });

        res.json(successResponse(courses));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
}

const deleteCourse = async ({ params, Models }, res) => {
    const { Course } = Models;
    const { courseId } = params;

    try {
        await Course.destroy({ where: { id: courseId }});

        res.json(successResponse({ id: courseId }));
    } catch (err) {
        res.json(failedResponse (err.message));
    }
};

module.exports = {
    addCourse,
    getCourses,
    deleteCourse,
}
