import BaseModel from './BaseModel';
import Category from './Category';

export default class Activity extends BaseModel {
  static tableName = 'activities';

  static jsonSchema = {
    ...BaseModel.jsonSchema,
    required: ['name', 'address', 'zipcode', 'city', 'status'],

    properties: {
      ...BaseModel.jsonSchema.properties,
      name: {type: 'string', minLength: 1, maxLength: 255},
      status: {type: 'string', enum: ['review', 'published']},
      description: {type: 'string', maxLength: 180},
      address: {type: 'string', minLength: 1, maxLength: 255},
      zipcode: {type: 'string', minLength: 1, maxLength: 5, pattern: /^\d+$/},
      city: {type: 'string', minLength: 1, maxLength: 50},
      text: {type: 'string'},
      categoryId: {type: ['string', 'null']}
    }
  };

  static get relationMappings() {
    return {
      parent: {
        relation: BaseModel.OneToOneRelation,
        modelClass: Category,
        join: {
          from: 'activities.categoryId',
          to: 'categories.id'
        }
      }
    };
  }
}
