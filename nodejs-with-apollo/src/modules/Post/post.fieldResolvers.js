const Post = {
  author(parent, args, { models }, info) {
    return models.users.find((user) => {
      return user.id === parent.author;
    });
  },

  comments(parent, args, { models }, info) {
    return models.comments.filter((comment) => {
      return comment.post === parent.id;
    });
  },
};

export { Post };
