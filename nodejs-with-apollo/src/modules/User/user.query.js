import { formatSearchString } from '../../utils/formatter';

const UserQuery = {
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
};

export { UserQuery };
