import { v4 as uuidv4 } from 'uuid';

const commentService = {
  createComment(parent, args, { models }, info) {
    const posts = models.posts;
    const users = models.users;
    const comments = models.comments;
    const isUserExists = users.find((user) => user.id === args.data.author);
    const isPostExists = posts.find(
      (post) => post.id === args.data.post && post.published === true
    );

    if (!isUserExists) {
      throw new Error('Author does not exist');
    }

    if (!isPostExists) {
      throw new Error('Post does not exist');
    }

    const newComment = {
      id: uuidv4(),
      ...args.data,
    };
    comments.push(newComment);

    return newComment;
  },

  deleteComment(parent, args, { models }, info) {
    const comments = models.comments;

    const commentIndex = comments.findIndex(
      (comment) => comment.id === args.id
    );

    if (commentIndex === -1) {
      throw new Error('Post does not exist');
    }

    const deletedComment = comments.splice(commentIndex, 1)[0];
    return deletedComment;
  },
};

export { commentService };
