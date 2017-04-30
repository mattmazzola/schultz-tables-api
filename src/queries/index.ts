const graphql = require('graphql');
import users from './users';

export const query = new graphql.GraphQLObjectType({
  name: 'Query',
  description: "Root of all queries for Schultz Tables API",
  fields: () => ({
    users
  })
});
