import { UserQuery } from './User/user.resolver';
import { PostQuery } from './Post/post.resolver';
import { CommentQuery } from './Comment/comment.resolver';

const Query = { ...UserQuery, ...PostQuery, ...CommentQuery };

export { Query };
