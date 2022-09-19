import {
  getOnePost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from './post.service';

const PostQuery = { post: getOnePost, posts: getPosts };

const PostMutation = { createPost, updatePost, deletePost };

export { PostQuery, PostMutation };
