'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      id: 1,
      created_at: new Date(),
      updated_at: new Date(),
      email: 'admin@springtik.fr',
      password: '$2a$08$eUqe.Sic2FQOUIOo8XWrDOpiZE4rukM9oI27GtZv/SdMKIUIFiN/e'
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {}, {primaryKeyAttributes: []});
  }
};
