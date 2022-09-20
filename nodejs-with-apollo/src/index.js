import { GraphQLServer, PubSub } from 'graphql-yoga';
import { typeDefs } from './types/index';
import resolvers from './modules/index';
import { dbConnect, models } from './db/index';

const main = async () => {
  const pubsub = new PubSub();

  const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: {
      models,
      pubsub,
    },
  });

  await dbConnect();

  server.start(() => {
    console.log(`🚀 Server is running on http://localhost:4000`);
  });
};

main();
