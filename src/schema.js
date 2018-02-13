import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `
    type User {
       _id: String!
       username: String!
       password: String!
   }
   type Query {
        me: String!
   }
    type Mutation{
        login(username: String!, password: String!): String!
        signup(username: String!, password: String!): String!
    }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };