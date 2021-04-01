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

    User.associate = ({ Portfolio, Subscription }) => {
        User.hasMany(Portfolio, { foreignKey: 'userId' });
        User.hasMany(Subscription, { foreignKey: 'userId' });
    };
  
    return User;
};
