import { v4 as uuidv4 } from 'uuid';
import { throwNewError } from '../../helpers';
import { formatSearchString } from '../../utils/formatter';

const UserService = {
  createUser(parent, args, { models }, info) {
    const users = models.users;

    const isEmailExists = users.find((user) =>
      formatSearchString(user.email).includes(
        formatSearchString(args.data.email)
      )
    );

    if (isEmailExists) {
      throwNewError('CustomAlreadyExisted', 'email');
    }

    const newUser = {
      id: uuidv4(),
      ...args.data,
    };
    users.push(newUser);

    return newUser;
  },

  updateUser(parent, args, { models }, info) {
    const { id, email, name, age } = args.data;

    const user = models.users.find((user) => user.id === id);

    if (!user) {
      throwNewError('CustomNotFound', 'User');
    }

    if (email && email.length) {
      const isEmailExisted = models.users.some((user) => user.email === email);

      if (isEmailExisted) {
        throwNewError('CustomAlreadyExisted', 'email');
      }

      user.email = email;
    }

    if (name && name.length) {
      user.name = name;
    }

    if (age) {
      user.age = age;
    }

    return user;
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
      throwNewError('CustomNotFound', 'User');
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
};

export { UserService };
