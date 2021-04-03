const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const Skill = sequelize.define("skills", {
        name: {
            type: Sequelize.STRING
        },
    });

    Skill.associate = ({ User, Portfolio }) => {
        Skill.belongsTo(User, { foreignKey: 'addedBy' });
    }

    return Skill;
};
