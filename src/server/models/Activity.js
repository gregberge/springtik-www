import BaseModel from './BaseModel';
import Category from './Category';

export default class Activity extends BaseModel {
  static tableName = 'activities';

  static jsonSchema = {
    ...BaseModel.jsonSchema,
    required: ['name'],

    properties: {
      ...BaseModel.jsonSchema.properties,
      name: {type: 'string', minLength: 1, maxLength: 255},
      description: {type: 'string', maxLength: 180},
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
