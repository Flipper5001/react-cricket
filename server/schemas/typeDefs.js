const { gql } = require("apollo-server-express");

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
    topFiveScores: [Score],
    user(userId: ID!): User,
    userByName(username: String!): User,
    me: User
  }
  type Mutation {
    addNewScore(user: ID!, team: ID!, score: String!): Score,
    login(email: String!, password: String!): Auth,
    addUser(username: String!, email: String!, password: String!): Auth,
    addNewTeam(teamName: String!, players: [String]!): Team,
    changeTeam(players: [String]!, teamId: ID!): Team,
    setUserTeam(team: ID!, userId: ID!): User,
  }
`;

module.exports = typeDefs;
