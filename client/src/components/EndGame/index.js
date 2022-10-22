import React from 'react';
import css from './../../pages/Home.module.css';
import Button from "react-bootstrap/Button";
import { Navigate } from 'react-router-dom';
import { Link } from "react-router-dom";



const EndGame = ({
    score
}) => {


    return (
        <div className='text-center'>
            <h1>Game Over!</h1>
            <h4>Well done, you scored {score} points.</h4>
            <Link to='/'>
                Return to Home
            </Link>
        </div>
    )


}

export default EndGame;