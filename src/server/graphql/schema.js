import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql/type';
import ApiError from '~/modules/ApiError';
import {
  FETCH_NOT_FOUND,
} from '~/modules/apiErrors';

import activityType from './activityType';
import Activity from '~/server/models/Activity';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      activity: {
        type: activityType,
        args: {
          id: {type: GraphQLString},
        },
        resolve(source, {id}, context, info) {
          return Activity.query()
            .select(info.fieldASTs[0].selectionSet.selections.map(({name: {value}}) => value))
            .where({id})
            .then(([res]) => {
              if (!res)
                throw new ApiError('Result not found', FETCH_NOT_FOUND, 404);

              return res;
            });
        },
      },
    },
  }),
});
