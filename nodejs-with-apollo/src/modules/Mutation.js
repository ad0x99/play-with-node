import { UserService } from './User/user.service';
import { PostService } from './Post/post.service';
import { commentService as CommentService } from './Comment/comment.service';

const Mutation = { ...UserService, ...PostService, ...CommentService };

export { Mutation };
