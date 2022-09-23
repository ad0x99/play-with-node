import dotenv from 'dotenv';
import cors from 'cors';
import { GraphQLServer, PubSub } from 'graphql-yoga';
import { typeDefs } from './types/index';
import resolvers from './modules/index';
import { dbConnect, models } from './db/index';

const main = async () => {
  dotenv.config();
  const pubsub = new PubSub();
  await dbConnect();
  const config = {
    port: 4000,
    cors: { credentials: true, origin: process.env.ORIGIN_URL },
  };

  const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: (request) => {
      return {
        request,
        models,
        pubsub,
      };
    },
  });

  server.express.use(cors());

  server.start(({ ...config }) => {
    console.log(`🚀 Server is running on http://localhost:${config.port}`);
  });
};

main();
