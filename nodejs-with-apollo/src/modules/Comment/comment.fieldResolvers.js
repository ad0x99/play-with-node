const CommentFieldResolvers = {
  author(parent, args, { models }, info) {
    return models.user.findUnique({ where: { id: parent.author } });
  },

  post(parent, args, { models }, info) {
    return models.post.findUnique({ where: { id: parent.post } });
  },
};

export { CommentFieldResolvers };
