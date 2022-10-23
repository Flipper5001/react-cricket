import React from 'react';
import { Link } from "react-router-dom";
import Auth from '../../utils/auth';
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME } from '../../utils/queries';
import { ADD_SCORE } from '../../utils/mutations';
import css from './EndGame.module.css';

const EndGame = (props) => {
    
    const { data } = useQuery(QUERY_ME);
    const user = data?.me._id;
    const team = data?.me.team._id;
    const finalScore = props.score;

    const [AddNewScore] = useMutation(ADD_SCORE);

    const newHighscore = async (score) => {
        try {
            console.log(user)
            console.log(team)
            console.log(typeof score, score)
            
            const { data } = await AddNewScore({
                variables: { user, team, score },
            })
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    // TODO: save highscore to user
    // TODO: move repeated styles into components and create new css that contains just those styles
    // TODO: clean up code and delete any reference to 18

    return (
        <div className={css.interface}>
            <div className={css.homeHeader}>
                <h2 className={css.logoHeader}>HOWZAT!</h2>
            </div>
            <div className='text-center mt-3'> 
                <h1 className={css.header}>Game Over!</h1>
                <h4 className={css.results}>Well done, you scored {props.score} runs.</h4>
                <div className='flex-column justify-center'>
                    <div className='mx-auto my-4'>
                        <button className={css.interactiveButton} onClick={() => {AddNewScore(finalScore)}}>
                            Save score
                        </button>
                        <Link to='/' className={css.interactiveButton}>
                            Return to Home
                        </Link>
                        <Link to={"/team/" + Auth.getUser().username} className={css.interactiveButton}>
                            Play again
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EndGame;