const CommentQuery = {
  comments: (parent, args, { models }, info) => {
    return models.comments;
  },
};

export { CommentQuery };
