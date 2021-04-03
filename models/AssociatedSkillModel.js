const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const AssociatedSkill = sequelize.define("associated_skills", {
        expLevel: {
            type: Sequelize.ENUM,
            values: ['low', 'middle', 'high']
        },
    });

    AssociatedSkill.associate = ({ Portfolio, Skill }) => {
        AssociatedSkill.belongsTo(Portfolio);
        AssociatedSkill.belongsTo(Skill, { foreignKey: 'skillId' });
    }
    return AssociatedSkill;
};
