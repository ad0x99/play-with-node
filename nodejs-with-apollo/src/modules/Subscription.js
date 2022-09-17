import { CommentSubscription } from './Comment/comment.service';
import { PostSubscription } from './Post/post.service';

const Subscription = { ...CommentSubscription, ...PostSubscription };

export { Subscription };
