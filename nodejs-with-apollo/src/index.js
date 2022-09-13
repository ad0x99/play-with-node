import { GraphQLServer } from 'graphql-yoga';
import { typeDefs } from './types/index';
import { resolvers } from './resolvers/index';

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log(`Server is running on http://localhost:4000`);
});
