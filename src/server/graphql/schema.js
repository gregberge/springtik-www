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
          const fields = info.fieldASTs[0].selectionSet.selections.map(({name: {value}}) => value);

          return Activity.query()
            .select(
              fields
                .map(field => field === 'position' ? 'locationId' : field)
            )
            .eager(
              fields.includes('position') ? 'location' : null
            )
            .where({id})
            .then(([res]) => {
              if (!res)
                throw new ApiError('Result not found', FETCH_NOT_FOUND, 404);

              if (res.location) {
                res.position = res.location.geometry.location;
              }

              return res;
            });
        },
      },
    },
  }),
});
