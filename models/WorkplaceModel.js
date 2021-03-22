const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const Workplace = sequelize.define('workplaces', {
        position: {
            type: Sequelize.STRING
        },
        responsibility: {
            type: Sequelize.STRING
        },
        startDate: {
            type: Sequelize.DATE,
        },
        endDate: {
            type: Sequelize.DATE
        }
    });

    Workplace.associate = ({ Portfolio, Company }) => {
        Workplace.belongsTo(Portfolio);
        Workplace.belongsTo(Company, { foreignKey: 'companyId' });
    };

    return Workplace;
};