const UserFieldResolvers = {
  posts(parent, args, { models }, info) {
    return models.post.findMany({ where: { author: parent.id } });
  },

  comments(parent, args, { models }, info) {
    return models.comment.findMany({ where: { author: parent.id } });
  },
};

export { UserFieldResolvers };
