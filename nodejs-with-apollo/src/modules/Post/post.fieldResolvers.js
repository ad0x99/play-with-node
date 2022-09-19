const PostFieldResolvers = {
  author(parent, args, { models }, info) {
    return models.user.findMany({ where: { id: parent.author } });
  },

  comments(parent, args, { models }, info) {
    return models.comment.findMany({ where: { post: parent.id } });
  },
};

export { PostFieldResolvers };
