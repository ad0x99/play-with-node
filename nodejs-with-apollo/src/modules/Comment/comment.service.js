import { v4 as uuidv4 } from 'uuid';
import { throwNewError } from '../../helpers';

const CommentService = {
  createComment(_, args, { models, pubsub }, info) {
    const { posts, users, comments } = models;
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
    pubsub.publish(`comment ${args.data.post}`, { comment: newComment });

    return newComment;
  },

  updateComment(_, args, { models }, info) {
    const { id, text } = args.data;
    const comment = models.comments.find((comment) => comment.id === id);

    if (!comment) {
      throwNewError('CustomNotFound', 'Comment');
    }

    if (text) {
      comment.text = text;
    }

    return comment;
  },

  deleteComment(_, args, { models }, info) {
    const { comments } = models;

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

const CommentSubscription = {
  comment: {
    subscribe(_, args, { models, pubsub }, info) {
      const post = models.posts.find(
        (post) => post.id === args.postId && post.published === true
      );

      if (!post) {
        throwNewError('CustomNotFound', 'Post');
      }

      return pubsub.asyncIterator(`comment ${args.postId}`);
    },
  },
};

export { CommentService, CommentSubscription };
