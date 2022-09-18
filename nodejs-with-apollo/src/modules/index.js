import { Query } from './Query';
import { Mutation } from './Mutation';
import { User } from './User/user.fieldResolvers';
import { Post } from './Post/post.fieldResolvers';
import { Comment } from './Comment/comment.fieldResolvers';
import { Subscription } from './Subscription';

const resolvers = { Query, Mutation, Subscription, User, Post, Comment };

export default resolvers;
