import {Model} from 'objection';

export default class Activity extends Model {
  static tableName = 'activities';

  static jsonSchema = {
    type: 'object',
    required: ['name'],

    properties: {
      id: {type: 'integer'},
      name: {type: 'string', minLength: 1, maxLength: 255},
      description: {type: 'string'}
    }
  };

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    return this.cryptPassword();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}
