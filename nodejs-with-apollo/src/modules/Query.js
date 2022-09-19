import { UserQuery } from './User/user.resolver';
import { CommentQuery } from './Comment/comment.query';
import { PostQuery } from './Post/post.resolver';

const Query = { ...UserQuery, ...PostQuery, ...CommentQuery };

export { Query };
