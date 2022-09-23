const { PrismaClient } = require('@prisma/client');

const models = new PrismaClient();

const dbConnect = () => {
  return models
    .$connect()
    .then(() => console.log('🚀 Connected to database'))
    .catch((e) => {
      console.log(e);
    });
};

module.exports = { models, dbConnect };
