import { UserMutation } from './User/user.resolver';
import { PostService } from './Post/post.service';
import { CommentService } from './Comment/comment.service';

const Mutation = { ...UserMutation, ...PostService, ...CommentService };

export { Mutation };
