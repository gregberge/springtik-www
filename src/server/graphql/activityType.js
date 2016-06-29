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
import {formatPath} from '~/modules/activity/path';

const ACTIVITY_ATTRIBUTES = Object.keys(Activity.jsonSchema.properties);

const PositionType = new GraphQLObjectType({
  name: 'Position',
  fields: {
    lat: {type: GraphQLFloat},
    lng: {type: GraphQLFloat},
  },
});

const PictureType = new GraphQLObjectType({
  name: 'Picture',
  fields: {
    publicId: {type: GraphQLString},
  },
});

const fieldsFromInfo = info =>
  info.fieldASTs[0].selectionSet.selections.map(({name: {value}}) => value);

const buildActivityQuery = fields => {
  const eagerFields = [];

  if (fields.includes('position')) {
    eagerFields.push('location');
  }

  if (fields.includes('cover')) {
    eagerFields.push('pictures');
  }

  return Activity.query()
    .select(
      fields
        .concat(['id', 'slug'])
        .map(field => field === 'position' ? 'locationId' : field)
        .filter(field => ACTIVITY_ATTRIBUTES.includes(field))
        .concat(['categoryId'])
    )
    .eager(`[${eagerFields.join(',')}]`);
};

const formatActivity = activity => {
  activity.link = `/activities/${formatPath(activity)}`;

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
    slug: {type: GraphQLString},
    description: {type: GraphQLString},
    website: {type: GraphQLString},
    phoneNumber: {type: GraphQLString},
    text: {type: GraphQLString},
    link: {type: GraphQLString},
    position: {type: PositionType},
    cover: {
      type: PictureType,
      resolve(source) {
        return {
          publicId: source.pictures[0] ? source.pictures[0].publicId : 'default-activity-cover',
        };
      },
    },
    siblings: {
      type: new GraphQLList(ActivityType),
      resolve(source, params, context, info) {
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
