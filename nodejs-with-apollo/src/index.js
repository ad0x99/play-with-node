import { GraphQLServer, PubSub } from 'graphql-yoga';
import { typeDefs } from './types/index';
import resolvers from './modules/index';
import models from './fake-data';

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: {
    models,
    pubsub,
  },
});

server.start(() => {
  console.log(`Server is running on http://localhost:4000`);
});
