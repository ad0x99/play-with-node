import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from './comment.service';

const CommentQuery = { comments: getComments };

const CommentMutation = { createComment, updateComment, deleteComment };

export { CommentQuery, CommentMutation };
