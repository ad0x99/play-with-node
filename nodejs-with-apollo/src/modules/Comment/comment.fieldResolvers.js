const Comment = {
  author(parent, args, { models }, info) {
    return models.users.find((user) => {
      return user.id === parent.author;
    });
  },

  post(parent, args, { models }, info) {
    return models.posts.find((post) => {
      return post.id === parent.post;
    });
  },
};

export { Comment };
