const User = {
  posts(parent, args, { models }, info) {
    return models.posts.filter((post) => {
      return post.author === parent.id;
    });
  },

  comments(parent, args, { models }, info) {
    return models.comments.filter((comment) => {
      return comment.author === parent.id;
    });
  },
};

export { User };
