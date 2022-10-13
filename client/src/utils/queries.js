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

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
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
      thoughts {
        _id
        thoughtText
        thoughtAuthor
        createdAt
      }
    }
  }
`;
