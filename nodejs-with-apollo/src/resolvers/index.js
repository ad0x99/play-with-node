import { me, post, posts, users } from '../fake-data';
import { formatSearchString } from '../utils/formatter';

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
  },

  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
  },

  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id;
      });
    },
  },
};

export { resolvers };
