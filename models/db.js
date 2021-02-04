const fs = require('fs');
const Sequelize = require("sequelize");

module.exports = ({ database, host, user, password, dialect, pool }) => {
  const db = {};
  const sequelize = new Sequelize(
    database, user, password, { host, dialect, pool, operatorsAliases: false }
  );

  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  db.models = fs.readdirSync(__dirname)
    .filter(file => file.match(/model/))
    .reduce((obj, file) => {
        const arr = file.split('.');
        const modelName = arr[0].charAt(0).toUpperCase() + arr[0].slice(1);
        obj[modelName] = require('./'+file)(sequelize, Sequelize);
        return obj;
    }, {});

  Object.values(db.models)
    .forEach(Model => {
        if (Model.associate) Model.associate(db.models);
    });

  db.ROLES = ["user", "admin", "moderator"];

  return sequelize.sync({ force: true })
    .then(() => db);
}