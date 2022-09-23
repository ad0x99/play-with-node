import { users, me, createUser, updateUser, deleteUser } from './user.service';

const UserQuery = {
  users: users,
  me,
};

const UserMutation = {
  createUser,
  updateUser,
  deleteUser,
};

export { UserQuery, UserMutation };
