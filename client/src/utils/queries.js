import { gql } from '@apollo/client';

// Query Team by ID
export const QUERY_TEAM = gql`
  query team($_id: ID!) {
    team(_id: $_id) {
      _id
      teamName
      players
    }
  }
`;

// Query for all teams
export const QUERY_TEAMS = gql`
  query getTeams {
    team {
      _id
      teamName
      players
    }
  }

`;

export const QUERY_USER = gql`
  query User($userId: ID!) {
  user(userId: $userId) {
    username
    email
    team {
      teamName
      players
      _id
    }
  }
}

`;

export const QUERY_SCORES = gql`
  query getAllScores {
  scores {
    score
    user {
      username
    }
    team {
      teamName
      players
      _id
    }
  }
}
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      team {
        teamName
        players
        _id
      }
      highscore
    }
  }
`;

export const QUERY_BY_NAME = gql`
  query UserByName($username: String!) {
  userByName(username: $username) {
    email
    _id
    username
    team {
      teamName
      players
    }
    highscore
  }
}
`;

export const QUERY_TOP_5_SCORES = gql `
  query TopFiveScores {
  topFiveScores {
    score
    team {
      teamName
    }
    user {
      username
    }
  }
}

`