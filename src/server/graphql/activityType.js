import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
  GraphQLList,
} from 'graphql';
import Activity from '~/server/models/Activity';
import ApiError from '~/modules/ApiError';
import {
  FETCH_NOT_FOUND,
} from '~/modules/apiErrors';

const ACTIVITY_ATTRIBUTES = Object.keys(Activity.jsonSchema.properties);

const PositionType = new GraphQLObjectType({
  name: 'Position',
  fields: {
    lat: {type: GraphQLFloat},
    lng: {type: GraphQLFloat},
  },
});

const fieldsFromInfo = info =>
  info.fieldASTs[0].selectionSet.selections.map(({name: {value}}) => value);

const buildActivityQuery = fields => {
  return Activity.query()
    .select(
      fields
        .map(field => field === 'position' ? 'locationId' : field)
        .filter(field => ACTIVITY_ATTRIBUTES.includes(field))
        .concat(['categoryId'])
    )
    .eager(
      fields.includes('position') ? 'location' : null
    );
};

const formatActivity = activity => {
  if (activity.location) {
    activity.position = activity.location.geometry.location;
  }

  return activity;
};

export const resolve = (source, {id}, context, info) => {
  return buildActivityQuery(fieldsFromInfo(info))
    .where({id})
    .then(([activity]) => {
      if (!activity)
        throw new ApiError('Result not found', FETCH_NOT_FOUND, 404);

      return formatActivity(activity);
    });
};

const ActivityType = new GraphQLObjectType({
  name: 'Activity',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    text: {type: GraphQLString},
    position: {type: PositionType},
    siblings: {
      type: new GraphQLList(ActivityType),
      resolve: (source, params, context, info) => {
        return buildActivityQuery(fieldsFromInfo(info))
          .where({categoryId: source.categoryId})
          .orderByRaw('random()')
          .limit(2)
          .then(res => res.map(formatActivity));
      },
    },
  }),
});

export default ActivityType;
