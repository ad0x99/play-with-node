import { GraphQLServer } from 'graphql-yoga';
import { typeDefs } from './types/index';
import { resolvers } from './resolvers/index';
import models from './fake-data';

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: {
    models,
  },
});

server.start(() => {
  console.log(`Server is running on http://localhost:4000`);
});
