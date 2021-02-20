const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const University = sequelize.define('universities', {
        name: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.STRING
        },
    });

    University.associate = ({ User }) => {
        University.belongsTo(User, { foreignKey: 'addedBy' });
    }

    return University;
};