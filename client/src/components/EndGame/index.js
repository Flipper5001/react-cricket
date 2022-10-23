import React from 'react';
import { Link } from "react-router-dom";
import Auth from '../../utils/auth';
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME } from '../../utils/queries';
import { ADD_SCORE } from '../../utils/mutations';

const EndGame = (props) => {
    
    const { loading, data } = useQuery(QUERY_ME);
    const userId = data?.me._id;
    const teamId = data?.me.team._id

    const [AddNewScore, { error }] = useMutation(ADD_SCORE);
    console.log(data)


    // TODO: CSS Styling for page
    // TODO: save highscore to user
    // TODO: move repeated styles into components and create new css that contains just those styles
    // TODO: clean up code and delete any reference to 18

    
    return (
        <div className='text-center'> 
            <h1>Game Over!</h1>
            <h4>Well done, you scored {props.score} points.</h4>
            <div className='flex-column'>
                <Link to='/'>
                    Return to Home
                </Link>
                <Link to={"/team/" + Auth.getUser().username}>
                    Play again
                </Link>
            </div>
        </div>
    )
}

export default EndGame;