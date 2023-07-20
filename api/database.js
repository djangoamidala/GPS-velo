const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ridebike', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données établie avec succès.');
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données :', err);
  });
module.exports = sequelize;
