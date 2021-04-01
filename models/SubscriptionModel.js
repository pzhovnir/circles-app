const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const Subscription = sequelize.define('subscriptions', {
      confirmed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
    });

    Subscription.associate = ({ User }) => {
        Subscription.belongsTo(User, { foreignKey: 'providerId' });
    };
  
    return Subscription;
};
