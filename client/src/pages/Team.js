import React, { useEffect, useState } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import {
  QUERY_ME,
  QUERY_BY_NAME,
  QUERY_TEAMS,
  QUERY_TEAM,
} from "../utils/queries";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import css from "./Team.module.css";
import Auth from "../utils/auth";
import australiaImage from "../assets/australia.png";
import newzealandImage from "../assets/newzealand.png";
import southafricaImage from "../assets/southafrica.png";
import englandImage from "../assets/england.png";
import { ADD_TEAM, SET_USER_TEAM } from "../utils/mutations";
import TeamForm from "../components/TeamForm";

const Team = () => {

  const playerName = '';
  const { username } = useParams();

  // If there is no `TeamId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { data } = useQuery(username ? QUERY_BY_NAME : QUERY_ME, {
    variables: { username: username },
  });






  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_Team` query
  const user = data?.me || data?.user || {};

  // when user is not logged in , kick out
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  // when user is logged in but vist the team with wrong username, redirect to the correct team page
  if (Auth.getUser().username !== username) {
    return <Navigate to={"/team/" + Auth.getUser().username} />;
  }

  

  


  const australia = {
    backgroundImage: `url(${australiaImage})`,
  };
  const newzealand = {
    backgroundImage: `url(${newzealandImage})`,
  };
  const southafrica = {
    backgroundImage: `url(${southafricaImage})`,
  };
  const england = {
    backgroundImage: `url(${englandImage})`,
  };

  return (
    <div className={css.interface}>
      <div className={css.homeHeader}>
        <h2 className={css.logoHeader}>HOWZAT!</h2>
      </div>
      <div className={css.section}>
        <div className={css.flagSection}>
          <div>
            <button
              className={css.flag}
              style={australia}
              // onClick={TeamSelect("6347effea0eb2c9311397fcd")}
              id="australia"
            ></button>
            <button
              className={css.flag}
              style={newzealand}
              // onClick={TeamSelect("6347effea0eb2c9311397fd3")}
              id="newzealand"
            ></button>
          </div>
          <div>
            <button
              className={css.flag}
              style={southafrica}
              // onClick={TeamSelect("6347effea0eb2c9311397fd1")}
              id="southafrica"
            ></button>
            <button
              className={css.flag}
              style={england}
              // onClick={TeamSelect("6347effea0eb2c9311397fcf")}
              id="england"
            ></button>
          </div>
        </div>
      </div>

      <div className="flex-row justify-center mb-3">
        <h2 className={css.header} id={css.mobileHeader}>
          Your Team
        </h2>
        <TeamForm/>

      </div>
    </div>
  );
};

export default Team;
