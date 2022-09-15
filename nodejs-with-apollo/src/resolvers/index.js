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
        formatSearchString(user.email).includes(formatSearchString(args.email))
      );

      if (isEmailExists) {
        throw new Error('Email is already existed');
      }

      const newUser = {
        id: uuidv4(),
        name: args.name,
        email: args.email,
        age: args.age,
      };
      users.push(newUser);

      return newUser;
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
