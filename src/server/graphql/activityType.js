import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'Activity',
  fields: {
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
  },
});
