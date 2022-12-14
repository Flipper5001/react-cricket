import React from 'react';
import { Link } from 'react-router-dom';
import Highscores from '../components/Highscores';
import css from './Home.module.css';
import { useQuery } from '@apollo/client';
import auth from '../utils/auth';
import { QUERY_TOP_5_SCORES } from '../utils/queries';

const Home = () => {
  function renderGameButton(){
    return (
    <div className='row justify-center pb-3'>
      <Link className={css.interactiveButton} to={"/team/" + auth.getUser().username}>
        Let's Play!
      </Link>
    </div>
    )
  }

  const { loading, data } = useQuery(QUERY_TOP_5_SCORES);
  const scores = data?.topFiveScores || [];
  
  return (
    <div className={css.interface}>
      <div className={css.homeHeader}>
        <h2 className={css.logoHeader}>HOWZAT!</h2>
      </div>
      <div className="h-80 text-center py-4 px-5">
        <h4 className={css.header}> Highscores </h4>
        </div>
        <div className="col-12 mb-3">
          {loading ? (
            <h4 className={css.header}>Loading...</h4>
          ) : (
            <Highscores
              scores={scores}
              title="Highscores"
            />
          )}
        {auth.loggedIn() ? (
          renderGameButton()
        ) : (
        <div className='row justify-center'>
          <Link className={css.interactiveButton} to="/login">
            Login
          </Link>
          <div className={css.formReturn}>
            <p className='mr-1 my-0'>New to the game?</p>
            <Link to="/signup" className={css.linkText}>
              Signup now
            </Link>
          </div>
        </div>
        )}
      </div>
    </div>


  );
};

export default Home;
