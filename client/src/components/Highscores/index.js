import React, { useState } from 'react';
import { QUERY_TOP_5_SCORES, QUERY_ME } from '../../utils/queries';
import { useQuery } from '@apollo/client';


const Highscores = () => {

    const { loading, data } = useQuery(QUERY_TOP_5_SCORES);
    // const scores = data.topFiveScores;
    console.log('this is the DATA WOW', data)
    function getTop5(data){
        for (let i = 0; i < data.length; i++) {
            const user = data[i];

            return (
                <div>
                    <p>{user.username}</p>
                    <p>{user.score}</p>
                </div>
            );
        }
    }

    if(loading){
        return (
            <div>
                ...loading...
            </div>
        )
    }

    return (
        <div>
            {getTop5()}
            {/* {data && data.map((score) => (
                <div key={score._id} className="col-12 mb-3 pb-3">
                <span>{score.score}</span>
                </div>
            ))} */}
        </div>
    );
};

export default Highscores;
