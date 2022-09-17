import { Query } from './Query';
import { Mutation } from './Mutation';
import { User } from './User/user.fieldResolvers';
import { Post } from './Post/post.fieldResolvers';
import { Comment } from './Comment/comment.fieldResolvers';

const resolvers = { Query, Mutation, User, Post, Comment };

export default resolvers;
