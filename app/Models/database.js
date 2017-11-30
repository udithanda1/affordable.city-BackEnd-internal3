const config = require('../config');
const Sequelize = require('sequelize');
const useTransaction = require('sequelize-transactions');
const fs = require('fs');
const path = require('path');

const db = {};

const sequelize = new Sequelize(
  config.user.dbname,
  config.user.user,
  config.user.password,
  config.mysql
);
useTransaction(sequelize);

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'database.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
