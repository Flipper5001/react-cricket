import React from 'react';
import { useQuery } from '@apollo/client';


import { QUERY_TEAMS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_TEAMS);
  const thoughts = data?.thoughts || [];

  return (
    <main>
      <div className="flex-row justify-center my-auto align-center">
        <div
          className="col-12 col-md-10 mb-3 p-3 text-center container"
        >
          Highscores
          
        </div>
      </div>
    </main>
  );
};

export default Home;
