const resolvers = {
  Query: {
    me: () => {
      const user = {
        id: '123',
        name: 'John',
        email: '123@example.com',
        age: 23,
      };
      return user;
    },

    post: () => {
      const post = {
        id: '123',
        title: 'How to build graphql with nodejs',
        body: '123@example.com',
        published: false,
      };
      return post;
    },
  },
};

export { resolvers };
