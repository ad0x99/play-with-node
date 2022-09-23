import { v4 as uuidv4 } from 'uuid';
import { SUBSCRIPTION_TYPE } from '../../CONST/subscription';
import { throwNewError } from '../../helpers';
import { isAuthenticated } from '../../utils/authentication';

const getOnePost = async (parent, { id }, { models, request }, info) => {
  await isAuthenticated(request, models);

  return models.post.findUnique({ where: { id } });
};

const getPosts = async (parent, args, { models, request }, info) => {
  await isAuthenticated(request, models);

  const conditions = {};

  if (args.title) {
    conditions.OR = [
      { title: { contains: args.title } },
      { body: { contains: args.title } },
    ];
  }

  const posts = await models.post.findMany({ where: conditions });
  return posts;
};

const createPost = async (parent, args, { models, pubsub, request }, info) => {
  await isAuthenticated(request, models);

  const isUserExists = await models.user.findUnique({
    where: { id: args.data.author },
  });

  if (!isUserExists) {
    throwNewError('CustomNotFound', 'Author');
  }

  const post = await models.post.create({
    data: { id: uuidv4(), ...args.data },
  });

  if (args.data.published) {
    pubsub.publish('post', {
      post: { mutation: SUBSCRIPTION_TYPE.CREATED, data: post },
    });
  }

  return post;
};

const updatePost = async (parent, args, { models, pubsub, request }, info) => {
  await isAuthenticated(request, models);

  const { id, title, body, published } = args.data;
  const currentPost = await models.post.findUnique({ where: { id } });
  const conditions = {};

  if (!currentPost) {
    throwNewError('CustomNotFound', 'Post');
  }

  if (title) {
    conditions.title = title;
  }

  if (body) {
    conditions.body = body;
  }

  if (typeof published === 'boolean') {
    conditions.published = published;
  }

  if (currentPost.published && !published) {
    pubsub.publish('post', {
      post: { mutation: SUBSCRIPTION_TYPE.DELETED, data: currentPost },
    });
  } else if (!currentPost.published && published) {
    pubsub.publish('post', {
      post: { mutation: SUBSCRIPTION_TYPE.CREATED, data: currentPost },
    });
  } else {
    pubsub.publish('post', {
      post: { mutation: SUBSCRIPTION_TYPE.UPDATED, data: currentPost },
    });
  }

  const post = await models.post.update({
    where: { id },
    data: { ...conditions, updatedAt: Date.now() },
  });

  return post;
};

const deletePost = async (
  parent,
  { id },
  { models, pubsub, request },
  info
) => {
  await isAuthenticated(request, models);

  const isPostExist = await models.post.findUnique({ where: { id } });

  if (!isPostExist) {
    throwNewError('CustomNotExist', 'post');
  }

  if (isPostExist.published) {
    pubsub.publish('post', {
      post: { mutation: SUBSCRIPTION_TYPE.DELETED, data: isPostExist },
    });
  }

  const [post] = await Promise.all([
    models.post.delete({ where: { id } }),
    models.comment.deleteMany({ where: { postId: id } }),
  ]);

  return post;
};

const PostSubscription = {
  post: {
    async subscribe(_, args, { pubsub }, info) {
      return pubsub.asyncIterator('post');
    },
  },
};

export {
  getOnePost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
  PostSubscription,
};
