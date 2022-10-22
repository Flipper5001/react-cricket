import React from 'react';
import { Navigate } from 'react-router-dom';
import css from './Play.module.css';
import auth from '../utils/auth';

const Play = () => {

  // when user is not logged in , kick out
  if (!auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  const hr = {
    marginTop: "10px",
    marginBottom: "10px"
  }

  return (
    <div className='flex-row mb-3'>
      <div className={css.scoreboard}>
        <div className={css.interface}>
          <div className={css.homeHeader}>
            <div className='flex-row align-center'>
                <h2 className={css.teamName} style={{paddingLeft: "10px"}}>Dummy Team Name</h2>
            </div>
          </div>
          <div className={css.homeHeader} style={{marginTop: "5px"}}>
            <div className='flex-row align-center'>
              <div className='col-9'>
                <div className='flex-row'>
                  <h2 className={css.teamName} style={{paddingRight: "10px"}}>Over</h2>
                  <h2 className={css.teamName} >0.5</h2>
                </div>
              </div>
              <div className='col-3' style={{paddingRight: "5px"}}>
                <div className={css.scoreCombo}>
                    <h2 className={css.teamName}>0</h2>
                    <h2 className={css.teamName}>|</h2>
                    <h2 className={css.teamName}>244</h2>
                </div>
              </div>
            </div>
          </div>
          <div className='flex-row align-center mt-2'>
            <div className='col-9'>
              <p className={css.scoreboardFont}>Dummy Data Batter 1</p>
            </div>
            <div className='col-3'>
              <p className={css.scoreboardFont} style={{textAlign: "end"}}>211</p>
            </div>
          </div>
          <hr style={hr}/>
          <div className='flex-row align-center'>
            <div className='col-9'>
              <p className={css.scoreboardFont}>Dummy Data Batter 2</p>
            </div>
            <div className='col-3'>
              <p className={css.scoreboardFont} style={{textAlign: "end"}}>11</p>
            </div>
          </div>
          <hr style={hr}/>
          <div className='flex-row align-center pb-2'>
            <div className='col-9'>
              <p className={css.scoreboardFont}>Dummy Data Bowler Current</p>
            </div>
            <div className='col-3'>
              <div className={css.scoreCombo}>
                <p style={{fontWeight: 500, marginBottom: 0}}>0</p>
                <p style={{fontWeight: 500, marginBottom: 0}}>|</p>
                <p style={{fontWeight: 500, marginBottom: 0}}>141</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Play;
