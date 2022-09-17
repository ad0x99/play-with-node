import { UserQuery } from './User/user.query';
import { PostQuery } from './Post/post.query';
import { CommentQuery } from './Comment/comment.query';

const Query = { ...UserQuery, ...PostQuery, ...CommentQuery };

export { Query };
