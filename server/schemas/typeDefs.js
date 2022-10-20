const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    team: Team
    highscore: Int
  }

  type Score {
    _id: ID
    user: User
    team: Team
    score: Int
  }

  type Team {
    _id: ID
    teamName: String
    players: [String]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User],
    teams: [Team],
    team(teamId: ID!): Team,
    scores: [Score],
    user(userId: ID!): User
    # team(teamName: String): Team
    # user(username: String!): User
    # thoughts(username: String): [Thought]
    # thought(thoughtId: ID!): Thought
    # me: User
  }
  type Mutation {
    addNewScore(user: ID!, team: ID!, score: String!): Score,
    login(email: String!, password: String!): Auth,
    addUser(username: String!, email: String!, password: String!): Auth,
    addNewTeam(teamName: String!, players: [String]!): Team,
    changeTeam(players: [String]!, teamId: ID!): Team,
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
