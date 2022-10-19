import React from 'react';
import { Link } from 'react-router-dom';
import Highscores from '../components/Highscores';
import css from './Home.module.css';

const users = {
  user1: {
    username: "fkbje",
    highscore: 10
  }
}



const Home = () => {
  return (
    <div className={css.interface}>
      <div className="my-4 text-center">
        <h2 className={css.logoHeader}>HOWZAT!</h2>
      </div>
      <div className="h-80 text-center py-4 px-5">
        <div >
          <h4 className={css.logoHeader}> Highscores </h4>
        </div>
        <Highscores />
        <div className='row justify-center'>
          <div className='p-2'>
            <Link className="btn btn-primary btn-block mb-2" to="/login">
              Login
            </Link>
          </div>
          <div className='p-2'>
            <Link className="btn btn-primary btn-block mb-2" to="/signup">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
