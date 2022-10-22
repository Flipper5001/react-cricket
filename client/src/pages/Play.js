import React from 'react';
import { Navigate } from 'react-router-dom';
import auth from '../utils/auth';
import Game from '../components/Game/Game';
import EndGame from "../components/EndGame";

const Play = () => {

  // IDEAS

    // All variables shown on screen could be changed to state variables, and the functions are only used to get the numbers in order to add to the state variables
    // e.g. 
    // handleCurrentScore  = () => {
    //  const newScore = game.drive()
    //  const totalScore = currentScore + newScore
    //
    //
    //}
    // We pass in the old game on every function
 
    // const [currentScore, setCurrentScore] = useState('');
    // const [ball, setBall] = useState(0);

    
  // when user is not logged in , kick out
  if (!auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  const game = new Game();

  // const hr = {
  //   marginTop: "10px",
  //   marginBottom: "10px"
  // }

  return (
    <>
    <Game></Game>
    {/* <div className='d-flex justify-center mb-3'> */}
      {/* <div className={css.scoreboard}>
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
                  <h2 className={css.teamName} >{game.over}</h2>
                  <h2 className={css.teamName} >.</h2>
                  <h2 className={css.teamName} >{game.ball}</h2>
                </div>
              </div>
              <div className='col-3' style={{paddingRight: "5px"}}>
                <div className={css.scoreCombo}>
                    <h2 className={css.teamName} style={{paddingRight: "5px"}}>{game.totalWickets}</h2>
                    <h2 className={css.teamName} >|</h2>
                    <h2 className={css.teamName} style={{paddingLeft: "5px"}}>{game.totalScore}</h2>
                </div>
              </div>
            </div>
          </div>
          <div className='flex-row align-center mt-2'>
            <div className='col-9'>
              <div className='flex-row'>
                <p className={css.scoreboardFont}>Dummy Data Batter 1</p>
                <img src={bat} className={css.icon} style={{maxWidth: "20px"}} alt="bat_icon"></img>
              </div>
            </div>
            <div className='col-3'>
              <p className={css.scoreboardFont} style={{textAlign: "end"}}>{game.batter1}</p>
            </div>
          </div>
          <hr style={hr}/>
          <div className='flex-row align-center'>
            <div className='col-9'>
            <div className='flex-row'>
                <p className={css.scoreboardFont}>Dummy Data Batter 2</p>    */}
                {/* <img src={bat} className={css.icon} style={{maxWidth: "20px"}}></img>      show when odd number is rolled and players swap        */}
              {/* </div>
            </div>
            <div className='col-3'>
              <p className={css.scoreboardFont} style={{textAlign: "end"}}>{game.batter2}</p>
            </div>
          </div>
          <hr style={hr}/>
          <div className='flex-row align-center pb-2'>
            <div className='col-9'>
              <div className='flex-row'>
                <p className={css.scoreboardFont}>Dummy Data Bowler Current</p>
                <img src={ball} className={css.icon} style={{maxWidth: "15px"}} alt="ball_icon"></img>
              </div>
            </div>
            <div className='col-3'>
              <div className={css.scoreCombo}>
                <p style={{fontWeight: 500, marginBottom: 0, paddingRight: "5px"}}>{game.bowlerWickets}</p>
                <p style={{fontWeight: 500, marginBottom: 0}}>|</p>
                <p style={{fontWeight: 500, marginBottom: 0, paddingLeft: "5px"}}>{game.bowlerRuns}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className={css.animations}>

    </div>

    
    <div className={css.playground}>
      <div className={css.choices}>
        <button type='button' className={css.choiceButton} onClick={() => {game.block()}}>Block</button>
        <button type='button' className={css.choiceButton} onClick={() => {game.drive()}}>Drive</button>
        <button type='button' className={css.choiceButton} onClick={() => {game.random()}}>Random</button>
        <button type='button' className={css.choiceButton} onClick={() => {game.scoop()}}>Scoop</button>
        <button type='button' className={css.choiceButton} onClick={() => {game.swing()}}>Big Swing</button>
      </div>
    </div> */}

    
  </>
  );
};

export default Play;
