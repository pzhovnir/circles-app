const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const Role = sequelize.define("roles", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    });


    Role.associate = ({ User }) => {
        Role.belongsToMany(User, {
            through: "user_roles",
            foreignKey: "roleId",
            otherKey: "userId"
          });
    };
  
    return Role;
  };