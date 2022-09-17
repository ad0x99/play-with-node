const users = [
  { id: '123', name: 'John', email: '123@example.com', age: 23 },
  { id: '234', name: 'Anna', email: 'anna123@example.com', age: 18 },
  { id: '456', name: 'Minnie', email: 'minnie123@example.com' },
  { id: '678', name: 'Sara', email: 'sara123@example.com' },
];

const me = { id: '123', name: 'John', email: '123@example.com', age: 23 };

const post = {
  id: '123',
  title: 'How to build graphql with nodejs',
  body: '123@example.com',
  published: false,
};

const posts = [
  {
    id: '123',
    title: 'How to build graphql with nodejs',
    body: '123@example.com',
    published: false,
    author: '123',
  },
  {
    id: '234',
    title: 'How to setup your vscode',
    body: '123@example.com',
    published: false,
    author: '234',
  },
  {
    id: '456',
    title: 'CI/CD with Jenkins',
    body: '123@example.com',
    published: true,
    author: '456',
  },
];

const comments = [
  {
    id: '1',
    text: 'Hello, how are you?',
    author: '123',
    post: '123',
  },
  {
    id: '2',
    text: 'This is really great post',
    author: '234',
    post: '234',
  },
  {
    id: '3',
    text: 'Keep going bro',
    author: '456',
    post: '456',
  },
  {
    id: '4',
    text: 'It helps me so much. Thanks for sharing',
    author: '678',
    post: '456',
  },
];

const models = {
  users,
  me,
  post,
  posts,
  comments,
};

export default models;
