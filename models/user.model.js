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
      }
    });

    User.associate = ({ Role }) => {
        User.belongsToMany(Role, {
            through: "user_roles",
            foreignKey: "userId",
            otherKey: "roleId"
        });
    };
  
    return User;
};