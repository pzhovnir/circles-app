const connect = require('../models/db');

module.exports = (config) => {
  let db = null;

  connect(config)
    .then((connection) => {
      console.log("Connected to DB \n");
      db = connection;
    }, err => {
      console.log("Can't connect to DB \n", err);
    })

  return (req, res, next) => {
    req.models = db.models;
    next();
  };
};