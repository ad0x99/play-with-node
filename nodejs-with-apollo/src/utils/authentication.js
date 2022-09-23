// @ts-nocheck
import { AuthenticationError } from 'apollo-server-core';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { throwNewError } from '../helpers';

const generateJwtToken = ({ ...args }) => {
  const token = jwt.sign({ args }, process.env.SECRET_TOKEN, {
    expiresIn: process.env.EXPIRES_IN,
  });
  return token;
};

const verifyToken = (token) => {
  if (token) {
    const verifiedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    return verifiedToken;
  }
  return;
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(+process.env.SALT_NUMBER);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

const isAuthenticated = async (req, models, next) => {
  const token =
    req.request && req.request.headers.authorization
      ? req.request.headers.authorization.split(' ')[1]
      : null;

  if (!token) {
    throwNewError('CustomNotAuthenticated', 'user');
  }

  const tokenVerified = verifyToken(token);
  if (!tokenVerified) {
    throwNewError('CustomNotAuthenticated', 'user');
  }

  const user = await models.user.findUnique({
    where: { id: tokenVerified.args.id },
  });
  if (!user) {
    throwNewError('CustomNotAuthenticated', 'user');
  }

  return true;
};

export { isAuthenticated, generateJwtToken, hashPassword };
