import { formatSearchString } from '../../utils/formatter';

const PostQuery = {
  post: (parent, args, { models }, info) => {
    return models.post;
  },

  posts: (parent, args, { models }, info) => {
    const { posts } = models;

    if (args.title) {
      const isTitleMatch = posts.filter((post) =>
        formatSearchString(post.title).includes(formatSearchString(args.title))
      );
      const isBodyMatch = posts.filter((post) =>
        formatSearchString(post.body).includes(formatSearchString(args.title))
      );

      return isTitleMatch.length ? isTitleMatch : isBodyMatch;
    }

    return posts;
  },
};

export { PostQuery };
