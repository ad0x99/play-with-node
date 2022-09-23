import { UserMutation } from './User/user.resolver';
import { PostMutation } from './Post/post.resolver';
import { CommentMutation } from './Comment/comment.resolver';
import { AuthMutation } from './Authentication/auth.resolver';

const Mutation = {
  ...AuthMutation,
  ...UserMutation,
  ...PostMutation,
  ...CommentMutation,
};

export { Mutation };
