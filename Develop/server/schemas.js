const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: User
  }

  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(authors: [String]!, description: String!, title: String!, bookId: String!, image: String, link: String): User
    removeBook(bookId: String!): User
  }
`;

const resolvers = {
    Query: {
      users: async () => {
        // assuming you have a User model and you're using mongoose
        return await User.find({});
      },
    },
    Mutation: {
      addUser: async (_, args) => {
        // again assuming User is your model
        const user = new User(args);
        await user.save();
        return user;
      },
    },
  };
  

module.exports = typeDefs;
