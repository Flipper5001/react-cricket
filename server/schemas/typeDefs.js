const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    team_id: Team
  }

  type Score {
    _id: ID
    user_id: User!
    team_id: User
    score: Int
  }

  type Team {
    _id: ID
    teamName: String
    playerName: [String]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    teams: [Team]
    # user(username: String!): User
    # thoughts(username: String): [Thought]
    # thought(thoughtId: ID!): Thought
    # me: User
  }

  # type Mutation {
    # addUser(username: String!, email: String!, password: String!): Auth
    # login(email: String!, password: String!): Auth
    # addThought(thoughtText: String!): Thought
    # addComment(thoughtId: ID!, commentText: String!): Thought
    # removeThought(thoughtId: ID!): Thought
    # removeComment(thoughtId: ID!, commentId: ID!): Thought
  # }
`;

module.exports = typeDefs;
