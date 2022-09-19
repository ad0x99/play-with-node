const typeDefs = `
  type Query {
    users(name: String): [User!]! 
    posts(title: String): [Post!]!
    me: User!
    post(id: ID!): Post!
    comments: [Comment!]!
  }

  type Mutation {
    createUser(data: CreateUserInput): User!
    updateUser(data: UpdateUserInput): User!
    deleteUser(id: ID!): User!

    createPost(data: CreatePostInput): Post!
    updatePost(data: UpdatePostInput): Post!
    deletePost(id: ID!): Post!

    createComment(data: CreateCommentInput): Comment!
    updateComment(data: UpdateCommentInput): Comment!
    deleteComment(id: ID!): Comment!
  }

  type Subscription {
    post: PostSubscriptionPayload!
    comment(postId: ID!): CommentSubscriptionPayload!
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }

  input UpdateUserInput {
    id: ID!
    name: String
    email: String
    age: Int
  }

  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean!
    author: ID!
  }

  input UpdatePostInput {
    id: ID!
    title: String
    body: String
    published: Boolean
  }

  input CreateCommentInput {
    text: String!
    author: ID!
    post: ID!
  }

  input UpdateCommentInput {
    id: ID!
    text: String
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }

  type PostSubscriptionPayload {
    mutation: String!
    data: Post!
  }

  type CommentSubscriptionPayload {
    mutation: String!
    data: Comment!
  }
`;

export { typeDefs };
