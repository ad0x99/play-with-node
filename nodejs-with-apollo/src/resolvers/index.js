import { formatSearchString } from '../utils/formatter';
import { v4 as uuidv4 } from 'uuid';

const resolvers = {
  Query: {
    users: (parent, args, { models }, info) => {
      const users = models.users;

      if (args.name) {
        return users.filter((user) =>
          formatSearchString(user.name).includes(formatSearchString(args.name))
        );
      }

      return users;
    },

    me: (parent, args, { models }, info) => {
      return models.me;
    },

    post: (parent, args, { models }, info) => {
      return models.post;
    },

    posts: (parent, args, { models }, info) => {
      const posts = models.posts;

      if (args.title) {
        const isTitleMatch = posts.filter((post) =>
          formatSearchString(post.title).includes(
            formatSearchString(args.title)
          )
        );
        const isBodyMatch = posts.filter((post) =>
          formatSearchString(post.body).includes(formatSearchString(args.title))
        );

        return isTitleMatch.length ? isTitleMatch : isBodyMatch;
      }

      return posts;
    },

    comments: (parent, args, { models }, info) => {
      return models.comments;
    },
  },

  Mutation: {
    createUser(parent, args, { models }, info) {
      const users = models.users;

      const isEmailExists = users.find((user) =>
        formatSearchString(user.email).includes(
          formatSearchString(args.data.email)
        )
      );

      if (isEmailExists) {
        throw new Error('Email is already existed');
      }

      const newUser = {
        id: uuidv4(),
        ...args.data,
      };
      users.push(newUser);

      return newUser;
    },

    deleteUser(parent, args, { models }, info) {
      const users = models.users;
      const posts = models.posts;
      const comments = models.comments;
      const userIndex = users.findIndex((user) => user.id === args.id);
      const postIndex = posts.findIndex((post) => post.author === args.id);
      const commentIndex = comments.findIndex(
        (comment) => comment.author === args.id
      );

      if (userIndex === -1) {
        throw new Error('User not found');
      }

      if (postIndex !== -1) {
        posts.splice(postIndex, 1);
      }

      if (commentIndex !== -1) {
        comments.splice(commentIndex, 1);
      }

      const deletedUser = users.splice(userIndex, 1)[0];

      return deletedUser;
    },

    createPost(parent, args, { models }, info) {
      const users = models.users;
      const isUserExists = users.find((user) => user.id === args.data.author);

      if (!isUserExists) {
        throw new Error('Author does not exist');
      }

      const newPost = {
        id: uuidv4(),
        ...args.data,
      };
      models.posts.push(newPost);

      return newPost;
    },

    deletePost(parent, args, { models }, info) {
      const posts = models.posts;
      const comments = models.comments;
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

      const deletedPost = posts.splice(postIndex, 1)[0];
      return deletedPost;
    },

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
  },

  Post: {
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
  },

  User: {
    posts(parent, args, { models }, info) {
      return models.posts.filter((post) => {
        return post.author === parent.id;
      });
    },

    comments(parent, args, { models }, info) {
      return models.comments.filter((comment) => {
        return comment.author === parent.id;
      });
    },
  },

  Comment: {
    author(parent, args, { models }, info) {
      return models.users.find((user) => {
        return user.id === parent.author;
      });
    },

    post(parent, args, { models }, info) {
      return models.posts.find((post) => {
        return post.id === parent.post;
      });
    },
  },
};

export { resolvers };
