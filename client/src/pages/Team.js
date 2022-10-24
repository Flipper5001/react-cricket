import React from "react";
import { Navigate, useParams } from "react-router-dom";
import TeamForm from "../components/TeamForm";
import css from "./Team.module.css";
import Auth from "../utils/auth";
import australiaImage from "../assets/australia.png";
import newzealandImage from "../assets/newzealand.png";
import southafricaImage from "../assets/southafrica.png";
import englandImage from "../assets/england.png";
import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
const Team = () => {

  const { username } = useParams();
  const { loading, data, refetch} = useQuery(QUERY_ME)

  // const team = {
  //   _id: data?.me.team._id,
  let teamName;
  let players;

  if(data?.me.team !== null){
    teamName = data?.me.team.teamName 
    players = data?.me.team.players 
  }

  // }
  // const TeamSelect = async () => {
  //   try {
  //     const getTeam = await refetch();
  //     const team = {
  //       _id: getTeam.data.me.team._id,
  //       teamName: getTeam.data.me.team.teamName,
  //       players: getTeam.data.me.team.players
  //     }
      
  //     return 
      
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  


  
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

  if(loading){
    return (
      <div className={css.interface}>
        <div className={css.homeHeader}>
          <h2 className={css.logoHeader}>Getting Ready!</h2>
        </div>
      </div>
    )
  }

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

      <div className="flex-column justify-center mb-3">
        <h2 className={css.header}>
          Your Team
        </h2>
        <div className="mx-auto">
          <div className={css.section}>
            {teamName !== undefined && (
              <TeamForm teamName={teamName} players={players}/>
            )}
            {teamName === undefined && (
              <TeamForm />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
