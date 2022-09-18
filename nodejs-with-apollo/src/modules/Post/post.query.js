import { formatString } from '../../utils/formatter';

const PostQuery = {
  post: (parent, args, { models }, info) => {
    return models.post;
  },

  posts: (parent, args, { models }, info) => {
    const { posts } = models;

    if (args.title) {
      const isTitleMatch = posts.filter((post) =>
        formatString(post.title).includes(formatString(args.title))
      );
      const isBodyMatch = posts.filter((post) =>
        formatString(post.body).includes(formatString(args.title))
      );

      return isTitleMatch.length ? isTitleMatch : isBodyMatch;
    }

    return posts;
  },
};

export { PostQuery };
