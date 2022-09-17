import { comments, me, post, posts, users } from '../fake-data';
import { formatSearchString } from '../utils/formatter';
import { v4 as uuidv4 } from 'uuid';

const resolvers = {
  Query: {
    users: (parent, args, ctx, info) => {
      if (args.name) {
        return users.filter((user) =>
          formatSearchString(user.name).includes(formatSearchString(args.name))
        );
      }

      return users;
    },

    me: () => {
      return me;
    },

    post: () => {
      return post;
    },

    posts: (parent, args, ctx, info) => {
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

    comments: (parent, args, ctx, info) => {
      return comments;
    },
  },

  Mutation: {
    createUser(parent, args, ctx, info) {
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

    deleteUser(parent, args, ctx, info) {
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

    createPost(parent, args, ctx, info) {
      const isUserExists = users.find((user) => user.id === args.data.author);

      if (!isUserExists) {
        throw new Error('Author does not exist');
      }

      const newPost = {
        id: uuidv4(),
        ...args.data,
      };
      posts.push(newPost);

      return newPost;
    },

    deletePost(parent, args, ctx, info) {
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

    createComment(parent, args, ctx, info) {
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
  },

  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },

    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.post === parent.id;
      });
    },
  },

  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id;
      });
    },

    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.author === parent.id;
      });
    },
  },

  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },

    post(parent, args, ctx, info) {
      return posts.find((post) => {
        return post.id === parent.post;
      });
    },
  },
};

export { resolvers };
