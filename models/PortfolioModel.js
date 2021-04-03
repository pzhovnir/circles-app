const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const Portfolio = sequelize.define('portfolios', {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });

    Portfolio.associate = ({ Workplace, Course, AssociatedSkill }) => {
        Portfolio.hasMany(Workplace);
        Portfolio.hasMany(Course);
        Portfolio.hasMany(AssociatedSkill);
    };
  
    return Portfolio;
};
