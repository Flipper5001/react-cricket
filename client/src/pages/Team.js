import React from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_BY_NAME } from '../utils/queries';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import css from './Team.module.css';
import Auth from '../utils/auth';
import australiaImage from '../assets/australia.png';
import newzealandImage from '../assets/newzealand.png';
import southafricaImage from '../assets/southafrica.png';
import englandImage from '../assets/england.png';

const Team = () => {
  const { username } = useParams();

  // If there is no `TeamId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { data } = useQuery(
    username ? QUERY_BY_NAME : QUERY_ME,
    {
      variables: { username: username },
    }
  );

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_Team` query
  const user = data?.me || data?.user || {};

  // when user is not logged in , kick out
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  // when user is logged in but vist the team with wrong username, redirect to the correct team page
  if(Auth.getUser().username !== username){
    return <Navigate to={"/team/" + Auth.getUser().username}/>
  }

  const australia = {
    backgroundImage: `url(${australiaImage})`,
  }
  const newzealand = {
    backgroundImage: `url(${newzealandImage})`,
  }
  const southafrica = {
    backgroundImage: `url(${southafricaImage})`,
  }
  const england = {
    backgroundImage: `url(${englandImage})`,
  }

  const teamSelect = () => {

  }

  return (
    <div className={css.interface}>
      <div className={css.homeHeader}>
        <h2 className={css.logoHeader}>HOWZAT!</h2>
      </div>
      <div className={css.section}>
        <div className={css.flagSection}>
          <div>
            <button className={css.flag} style={australia} onClick={teamSelect} id="australia"></button>
            <button className={css.flag} style={newzealand} onClick={teamSelect} id="newzealand"></button>
          </div>
          <div>
            <button className={css.flag} style={southafrica} onClick={teamSelect} id="southafrica"></button>
            <button className={css.flag} style={england} onClick={teamSelect} id="england"></button>
          </div>
        </div>
      </div>
      <div className="flex-row justify-center mb-3">
        <h2 className={css.header} id={css.mobileHeader}>Your Team</h2>
        <Form className={css.teamlist}>
            <Form.Group className={css.formGroup}>
              <i className="fa fa-user-circle fa-2xl pr-1" style={{width: '40px'}} aria-hidden="true"></i>
            	<Form.Control />
            </Form.Group>
        <div className={css.formReturn}> 
          <Button variant="primary" type="submit" style={{ cursor: 'pointer' }} className={css.logoutButton} to="">
            Start!
          </Button>
        </div>
        </Form>
      </div>
    </div>
  );
};

export default Team;
