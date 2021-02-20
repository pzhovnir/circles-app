const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const Profile = sequelize.define('profiles', {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });

    Profile.associate = ({ Workplace, Course, Skill }) => {
        Profile.hasMany(Workplace);
        Profile.hasMany(Course);
        Profile.belongsToMany(Skill, { through: 'profiles_skills' });
    };
  
    return Profile;
};