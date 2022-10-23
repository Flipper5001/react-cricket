import React from 'react';
import { Navigate } from 'react-router-dom';
import auth from '../utils/auth';
import Game from '../components/Game';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

const Play = () => {

  const { loading, data, refetch } = useQuery(QUERY_ME)

  // const TeamSelect = async () => {
  //   try {
  //     const getTeam = await refetch();
  //     return {
  //       teamName: getTeam.data.me.team.teamName,
  //       players: getTeam.data.me.team.players
  //     } 

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  
  if (!auth.loggedIn()) {
    return <Navigate to="/login" />;
  }
  new Game()

  return (
    <>
    <Game/>
    </>
  );
};

export default Play;
