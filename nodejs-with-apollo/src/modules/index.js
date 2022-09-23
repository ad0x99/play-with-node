import { Query } from './Query';
import { Mutation } from './Mutation';
import { UserFieldResolvers } from './User/user.fieldResolvers';
import { PostFieldResolvers } from './Post/post.fieldResolvers';
import { CommentFieldResolvers } from './Comment/comment.fieldResolvers';
import { Subscription } from './Subscription';

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User: UserFieldResolvers,
  Post: PostFieldResolvers,
  Comment: CommentFieldResolvers,
};

export default resolvers;
