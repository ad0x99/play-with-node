import { v4 as uuidv4 } from 'uuid';
import { throwNewError } from '../../helpers';
import { isAuthenticated } from '../../utils/authentication';
import { formatString } from '../../utils/formatter';

const users = async (parent, args, { models, request }, info) => {
  await isAuthenticated(request, models);

  const conditions = {};

  if (args.name) {
    conditions.name = { contains: args.name };
  }

  const users = await models.user.findMany({
    where: conditions,
    orderBy: { name: 'asc' },
  });
  return users;
};

// TODO: this will be updated in the upcoming features
const me = async (parent, args, { models }, info) => {
  const me = {
    id: '124adcb3-f243-4be7-9dd0-1dbbfb89ba8b',
    name: 'Anh Duc',
    email: 'anh.duc@gmail.com',
    age: 23,
  };
  return me;
};

const createUser = async (parent, args, { models, request }, info) => {
  await isAuthenticated(request, models);

  const isEmailExist = await models.user.findUnique({
    where: { email: args.data.email },
  });

  if (isEmailExist) {
    throwNewError('CustomAlreadyExisted', 'email');
  }

  const newUser = await models.user.create({
    data: {
      id: uuidv4(),
      email: formatString(args.data.email),
      ...args.data,
    },
  });
  return newUser;
};

const updateUser = async (parent, args, { models, request }, info) => {
  await isAuthenticated(request, models);

  const { id, email, name, age } = args.data;
  const data = {};

  const isUserExist = models.user.findUnique({ where: { id } });

  if (!isUserExist) {
    throwNewError('CustomNotFound', 'User');
  }

  if (email) {
    const isEmailExist = await models.user.findUnique({
      where: { email },
    });
    if (isEmailExist) {
      throwNewError('CustomAlreadyExisted', 'email');
    }

    data.email = email;
  }

  if (name) {
    data.name = name;
  }

  if (age) {
    data.age = age;
  }

  const user = await models.user.update({
    where: { id },
    data: { ...data, updatedAt: Date.now() },
  });
  return user;
};

const deleteUser = async (parent, { id }, { models, request }, info) => {
  await isAuthenticated(request, models);

  const isUserExist = await models.user.findUnique({ where: { id } });

  if (!isUserExist) {
    throwNewError('CustomNotFound', 'User');
  }

  await Promise.all([
    models.user.delete({ where: { id } }),
    models.post.deleteMany({ where: { author: id } }),
    models.comment.deleteMany({ where: { author: id } }),
  ]);

  return isUserExist;
};

export { createUser, updateUser, deleteUser, users, me };
