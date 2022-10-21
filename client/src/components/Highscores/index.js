import React, { useState } from 'react';
import { QUERY_TOP_5_SCORES, QUERY_ME } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import css from './../../pages/Home.module.css';



const Highscores = ({
    scores
}) => {
    console.log("SCORES FROM COMPONENT: ",scores)

    if(!scores.length){
        return <h1>No scores</h1>
    }

    return (
        <div className='text-center'>
                <div className='d-flex align-items-center justify-content-center row m-auto'>
                    <div className='col-4'><h4>User</h4></div>
                    <div className='col-4'><h4>Team</h4></div>
                    <div className='col-4'><h4>Score</h4></div>

                </div>
                {scores && scores.map((score) => (
                <div>
                    <hr className={css.scoreHr}></hr>
                    <div key={score._id} className="col-12 my-1 py-1">
                        <div className='d-flex align-items-center align-middle row m-auto'>
                            
                            <div className='col-4'><p className='my-auto'>{score.user.username}</p></div>
                            <div className='col-4'><p className='my-auto'>{score.team.teamName}</p></div>
                            <div className='col-4'><p className='my-auto'>{score.score}</p></div>
                        </div>
                    </div>
                
                </div>    
                ))}
                <hr className={css.scoreHr}></hr>
        </div>
    );
}

    



;

export default Highscores;
