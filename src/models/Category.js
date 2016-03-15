import BaseModel from '~/modules/BaseModel';

export default class Category extends BaseModel {
  static tableName = 'categories';

  static jsonSchema = {
    ...BaseModel.jsonSchema,
    required: ['name', 'level'],

    properties: {
      ...BaseModel.jsonSchema.properties,
      level: {type: 'number'},
      name: {type: 'string', minLength: 1, maxLength: 255}
    }
  };
}
