const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const Company = sequelize.define('companies', {
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.STRING
        },
    });

    Company.associate = ({ User }) => {
        Company.belongsTo(User, { foreignKey: 'addedBy' });
    }

    return Company;
};