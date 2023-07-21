const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DIALECT
});

sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données établie avec succès.');
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données :', err);
  });

module.exports = sequelize;
