import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
} from 'graphql';

const PositionType = new GraphQLObjectType({
  name: 'Position',
  fields: {
    lat: {type: GraphQLFloat},
    lng: {type: GraphQLFloat},
  },
});

export default new GraphQLObjectType({
  name: 'Activity',
  fields: {
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    text: {type: GraphQLString},
    position: {type: PositionType},
  },
});
