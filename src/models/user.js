import {Model} from 'objection';
import bcrypt from 'bcryptjs';

export default class User extends Model {
  static tableName = 'users';

  static jsonSchema = {
    type: 'object',
    required: ['email', 'password'],

    properties: {
      id: {type: 'integer'},
      email: {type: 'string', minLength: 1, maxLength: 255},
      password: {type: 'string', minLength: 1, maxLength: 255}
    }
  };

  validPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(isMatch);
      });
    });
  }

  cryptPassword() {
    return new Promise((resolve, reject) => {
      bcrypt.hash(this.plainTextPassword, 8, (err, password) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(password);
      });
    });
  }

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    return this.cryptPassword();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}
