import { v4 as uuidv4 } from 'uuid';

const PostService = {
  createPost(parent, args, { models }, info) {
    const users = models.users;
    const isUserExists = users.find((user) => user.id === args.data.author);

    if (!isUserExists) {
      throw new Error('Author does not exist');
    }

    const newPost = {
      id: uuidv4(),
      ...args.data,
    };
    models.posts.push(newPost);

    return newPost;
  },

  deletePost(parent, args, { models }, info) {
    const posts = models.posts;
    const comments = models.comments;
    const postIndex = posts.findIndex((post) => post.id === args.id);
    const commentIndex = comments.findIndex(
      (comment) => comment.post === args.id
    );

    if (postIndex === -1) {
      throw new Error('Post does not exist');
    }

    if (commentIndex !== -1) {
      comments.splice(commentIndex, 1);
    }

    const deletedPost = posts.splice(postIndex, 1)[0];
    return deletedPost;
  },
};

export { PostService };
