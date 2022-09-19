import { UserMutation } from './User/user.resolver';
import { CommentService } from './Comment/comment.service';
import { PostMutation } from './Post/post.resolver';

const Mutation = { ...UserMutation, ...PostMutation, ...CommentService };

export { Mutation };
