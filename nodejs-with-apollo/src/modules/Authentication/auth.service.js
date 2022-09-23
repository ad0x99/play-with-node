import bcrypt from 'bcrypt';
import { AUTHENTICATION_ERROR } from '../../CONST/error';
import { throwNewError } from '../../helpers';
import { generateJwtToken, hashPassword } from '../../utils/authentication';

const login = async (parent, args, { models }) => {
  const { email, password } = args.input;

  const user = await models.user.findUnique({
    where: { email: email },
    select: { id: true, name: true, email: true, password: true },
  });

  if (!user) {
    throwNewError('CustomNotFound', 'User');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throwNewError(AUTHENTICATION_ERROR.InvalidAuthentication);
  }

  const token = await generateJwtToken({ id: user.id, email });

  return { ...user, token };
};

const register = async (parent, args, { models, request }) => {
  const { name, email, password } = args.input;

  const isEmailExist = await models.user.findUnique({ where: { email } });
  const hashedPassword = await hashPassword(password);

  if (isEmailExist) {
    throwNewError('CustomAlreadyExisted', 'email');
  }

  const newUser = await models.user.create({
    data: { name, email, password: hashedPassword },
  });

  return newUser;
};

export { register, login };
