import React, { useRef } from 'react';
import { Link } from "react-router-dom";
import Auth from '../../utils/auth';
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME } from '../../utils/queries';
import { ADD_SCORE } from '../../utils/mutations';
import css from './EndGame.module.css';
import  Button  from 'react-bootstrap/Button';

const EndGame = (props) => {
    
    const { loading, data , refetch} = useQuery(QUERY_ME);
    const score = props.score
    const user = data?.me;
    // const teamId = data?.me.team._id
    const [AddNewScore, { error }] = useMutation(ADD_SCORE);
    const buttonRef = useRef(null);


    const handleSaveScore = async () => {
        buttonRef.current.disabled = true
        try {
            const newUser = await refetch();
            const userId = newUser.data.me._id
            const teamId = newUser.data.me.team._id
            const scoreData = await AddNewScore({
                variables: {userId, teamId, score}
            })

            console.log({scoreData})
        } catch(err) {
            console.log(err)
        }
        buttonRef.current.value = "Score saved!"
    }

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
                        <Button onClick={handleSaveScore} className={css.interactiveButton} ref={buttonRef}>
                            Save your score
                        </Button>
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