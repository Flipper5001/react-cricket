import React from 'react';
import { Navigate } from 'react-router-dom';
import auth from '../utils/auth';
import Game from '../components/Game';

const Play = () => {

  if (!auth.loggedIn()) {
    return <Navigate to="/login" />;
  }





  new Game();

  return (
    <>
    <Game />
    </>
  );
};

export default Play;
