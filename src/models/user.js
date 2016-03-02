import Sequelize from 'sequelize';
import Promise from 'bluebird';
import bcrypt from 'bcryptjs';

export default db => {
  const User = db.define('user', {
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  }, {
    paranoid: true,
    underscored: true,
    classMethods: {
      comparePassword(password, hash) {
        return Promise.promisify(bcrypt.compare.bind(bcrypt))(password, hash);
      },
      encryptPassword(password) {
        return Promise.promisify(bcrypt.hash.bind(bcrypt))(password, 8);
      }
    },
    instanceMethods: {
      encryptPassword(password) {
        return User.encryptPassword(password)
          .then(hash => {
            this.password = hash;
          });
      },
      comparePassword(password) {
        return User.comparePassword(password, this.password);
      }
    },
    hooks: {
      beforeCreate(user) {
        return user.encryptPassword(user.password);
      }
    },
    indexes: [
      {fields: ['email'], unique: true}
    ]
  });

  return User;
};
