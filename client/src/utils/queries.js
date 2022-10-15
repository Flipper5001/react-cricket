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


