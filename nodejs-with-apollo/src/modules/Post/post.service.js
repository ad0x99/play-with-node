import { v4 as uuidv4 } from 'uuid';
import { SUBSCRIPTION_TYPE } from '../../CONST/subscription';
import { throwNewError } from '../../helpers';

const PostService = {
  createPost(parent, args, { models, pubsub }, info) {
    const { users } = models;
    const isUserExists = users.find((user) => user.id === args.data.author);

    if (!isUserExists) {
      throw new Error('Author does not exist');
    }

    const newPost = {
      id: uuidv4(),
      ...args.data,
    };
    models.posts.push(newPost);

    if (args.data.published) {
      pubsub.publish('post', {
        post: { mutation: SUBSCRIPTION_TYPE.CREATED, data: newPost },
      });
    }

    return newPost;
  },

  updatePost(parent, args, { models, pubsub }, info) {
    const { id, title, body, published } = args.data;
    const post = models.posts.find((post) => post.id === id);
    const originalPost = { ...post };

    if (!post) {
      throwNewError('CustomNotFound', 'Post');
    }

    if (title) {
      post.title = title;
    }

    if (body) {
      post.body = body;
    }

    if (typeof published === 'boolean') {
      post.published = published;

      if (originalPost.published && !post.published) {
        pubsub.publish('post', {
          post: { mutation: SUBSCRIPTION_TYPE.DELETED, data: originalPost },
        });
      } else if (!originalPost.published && post.published) {
        pubsub.publish('post', {
          post: { mutation: SUBSCRIPTION_TYPE.CREATED, data: post },
        });
      }
    } else if (post.published) {
      pubsub.publish('post', {
        post: { mutation: SUBSCRIPTION_TYPE.UPDATED, data: post },
      });
    }

    return post;
  },

  deletePost(parent, args, { models, pubsub }, info) {
    const { posts, comments } = models;
    const postIndex = posts.findIndex((post) => post.id === args.id);
    const commentIndex = comments.findIndex(
      (comment) => comment.post === args.id
    );

    if (postIndex === -1) {
      throw new Error('Post does not exist');
    }

    if (commentIndex !== -1) {
      comments.splice(commentIndex, 1);
    }

    const [post] = posts.splice(postIndex, 1);

    if (post.published) {
      pubsub.publish('post', {
        post: { mutation: SUBSCRIPTION_TYPE.DELETED, data: post },
      });
    }

    return post;
  },
};

const PostSubscription = {
  post: {
    subscribe(_, args, { pubsub }, info) {
      return pubsub.asyncIterator('post');
    },
  },
};

export { PostService, PostSubscription };
