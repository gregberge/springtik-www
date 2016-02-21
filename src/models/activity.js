import Sequelize from 'sequelize';

export default db => db.define('activity', {
  name: {
    type: Sequelize.STRING
  }
}, {
  paranoid: true,
  underscored: true
});
