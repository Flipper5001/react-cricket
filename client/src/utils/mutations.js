import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
  
  }
}
`;

export const ADD_SCORE = gql`
  mutation AddNewScore($userId: ID!, $teamId: ID!, $score: String!) {
  addNewScore(userId: $userId, teamId: $teamId, score: $score) {
    score
  }
}
`;

export const ADD_TEAM = gql`
  mutation AddNewTeam($teamName: String!, $players: [String]!) {
  addNewTeam(teamName: $teamName, players: $players) {
    teamName
    players
  }
}
`;

export const CHANGE_TEAM = gql `
mutation ChangeTeam($players: [String]!, $teamId: ID!) {
  changeTeam(players: $players, teamId: $teamId) {
    teamName
    players
  }
}
`;

