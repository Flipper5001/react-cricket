import React from 'react';
import { Link } from "react-router-dom";

const EndGame = (props) => {
    
    // TODO: CSS Styling for page
    // TODO: save highscore to user
    // TODO: link / button to refresh the page to play again
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
                <Link to='/play'>
                    Play again
                </Link>
            </div>
        </div>
    )
}

export default EndGame;