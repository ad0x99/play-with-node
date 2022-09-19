import { UserMutation } from './User/user.resolver';
import { PostMutation } from './Post/post.resolver';
import { CommentMutation } from './Comment/comment.resolver';

const Mutation = { ...UserMutation, ...PostMutation, ...CommentMutation };

export { Mutation };
