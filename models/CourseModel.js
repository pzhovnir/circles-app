const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const Course = sequelize.define("courses", {
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        startDate: {
            type: Sequelize.DATE,
        },
        endDate: {
            type: Sequelize.DATE,
        }
    });

    Course.associate = ({ University, Portfolio }) => {
        Course.belongsTo(Portfolio);
        Course.belongsTo(University, { foreignKey: 'universityId' });
    }

    return Course;
};