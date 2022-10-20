import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_BY_NAME } from '../utils/queries';

import Auth from '../utils/auth';

const Team = () => {
  const { username } = useParams();

  // If there is no `TeamId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { data } = useQuery(
    username ? QUERY_BY_NAME : QUERY_ME,
    {
      variables: { username: username },
    }
  );

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_Team` query
  const user = data?.me || data?.user || {};

  // Use React Router's `<Redirect />` component to redirect to personal Team page if username is yours
  if (Auth.loggedIn() && Auth.User().data.username === username) {
    return <Navigate to="/:username" />;
  }

  if (!user?.username) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          {/* Viewing {userParam ? `${user.username}'s` : 'your'} Team. */}
        </h2>

        <div className="col-12 col-md-10 mb-5">

        
        </div>
      </div>
    </div>
  );
};

export default Team;
