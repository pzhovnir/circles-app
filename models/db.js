const fs = require('fs');
const Sequelize = require("sequelize");

module.exports = ({ database, host, user, password, dialect, pool }) => {
  const db = {};
  const sequelize = new Sequelize(
    database, user, password, { host, dialect, pool, operatorsAliases: false }
  );

  db.sequelize = sequelize;
  db.models = fs.readdirSync(__dirname)
    .filter(file => file.match(/Model/))
    .reduce((obj, file) => {
        const modelName = file.split('.')[0].split('Model')[0];
        obj[modelName] = require('./'+file)(sequelize);
        return obj;
    }, {});

  Object.values(db.models)
    .forEach(Model => {
        if (Model.associate) Model.associate(db.models);
    });

  return sequelize.sync({ force: false })
    .then(() => db);
}