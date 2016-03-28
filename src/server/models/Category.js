import BaseModel from './BaseModel';

export default class Category extends BaseModel {
  static tableName = 'categories';

  static jsonSchema = {
    ...BaseModel.jsonSchema,
    required: ['name', 'level'],

    properties: {
      ...BaseModel.jsonSchema.properties,
      level: {type: 'number'},
      name: {type: 'string', minLength: 1, maxLength: 255},
      description: {type: 'string', maxLength: 180},
      keywords: {
        type: 'array',
        items: {type: 'string'},
        uniqueItems: true
      }
    }
  };
}
