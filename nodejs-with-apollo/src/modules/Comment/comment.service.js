import { v4 as uuidv4 } from 'uuid';
import { throwNewError } from '../../helpers';
import { SUBSCRIPTION_TYPE } from '../../CONST/subscription';
import { isAuthenticated } from '../../utils/authentication';

const getComments = async (parent, { data }, { models, request }, info) => {
  await isAuthenticated(request, models);

  const conditions = { published: true };

  if (data && data.author) {
    conditions.author = data.author;
  }

  if (data && data.post) {
    conditions.post = data.post;
  }

  const comments = await models.comment.findMany({ where: conditions });

  return comments;
};

const createComment = async (_, args, { models, pubsub, request }, info) => {
  const user = await isAuthenticated(request, models);

  const isUserExists = await models.user.findUnique({
    where: { id: user.id },
  });
  const isPostExists = await models.post.findMany({
    where: { id: args.data.post, published: true },
  });

  if (!isUserExists) {
    throwNewError('CustomNotExist', 'author');
  }

  if (!isPostExists.length) {
    throwNewError('CustomNotExist', 'post');
  }

  const data = {
    id: uuidv4(),
    text: args.data.text,
    author: user.id,
    post: args.data.post,
  };

  const comment = await models.comment.create({
    data,
  });

  pubsub.publish(`comment ${args.data.post}`, {
    comment: { mutation: SUBSCRIPTION_TYPE.CREATED, data: comment },
  });

  return comment;
};

const updateComment = async (_, args, { models, pubsub, request }, info) => {
  const user = await isAuthenticated(request, models);

  const { id, text } = args.data;
  const isCommentExist = models.comment.findUnique({
    where: { id, author: user.id },
  });
  const data = { updatedAt: Date.now() };

  if (!isCommentExist) {
    throwNewError('CustomNotExist', 'comment');
  }

  if (text) {
    data.text = text;
  }

  const comment = await models.comment.update({
    where: { id, author: user.id },
    data,
  });

  pubsub.publish(`comment ${comment.post}`, {
    comment: { mutation: SUBSCRIPTION_TYPE.UPDATED, data: comment },
  });

  return comment;
};

const deleteComment = async (_, { id }, { models, pubsub, request }, info) => {
  const user = await isAuthenticated(request, models);

  const isCommentExist = models.comment.findUnique({
    where: { id, user: user.id },
  });

  if (!isCommentExist) {
    throwNewError('CustomNotExist', 'comment');
  }

  const comment = await models.comment.delete({ where: { id, user: user.id } });

  pubsub.publish(`comment ${comment.post}`, {
    comment: { mutation: SUBSCRIPTION_TYPE.DELETED, data: comment },
  });

  return comment;
};

const CommentSubscription = {
  comment: {
    subscribe(_, { postId }, { models, pubsub }, info) {
      const post = models.post.findUnique({
        where: { id: postId, published: true },
      });

      if (!post) {
        throwNewError('CustomNotFound', 'Post');
      }

      return pubsub.asyncIterator(`comment ${postId}`);
    },
  },
};

export {
  getComments,
  createComment,
  updateComment,
  deleteComment,
  CommentSubscription,
};
