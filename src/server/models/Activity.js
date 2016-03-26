import BaseModel from './BaseModel';

export default class Activity extends BaseModel {
  static tableName = 'activities';

  static jsonSchema = {
    ...BaseModel.jsonSchema,
    required: ['name'],

    properties: {
      ...BaseModel.jsonSchema.properties,
      name: {type: 'string', minLength: 1, maxLength: 255},
      description: {type: 'string'}
    }
  };
}
