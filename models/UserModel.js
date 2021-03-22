const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
    });

    User.associate = ({ Portfolio }) => {
        User.hasMany(Portfolio, { foreignKey: 'userId' });
    };
  
    return User;
};