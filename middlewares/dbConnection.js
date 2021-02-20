const connectToDB = require('../models/db');

module.exports = (config) => {
  let db = null;

  connectToDB(config)
    .then((connection) => {
      console.log("Connected to DB \n");
      db = connection;
    }, err => {
      console.log("Can't connect to DB \n", err);
    })

  return (req, res, next) => {
    req.Models = db.models;
    next();
  };
};