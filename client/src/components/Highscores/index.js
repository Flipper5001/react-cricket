import React from "react";
import css from "./../../pages/Home.module.css";
import { QUERY_ME } from "../../utils/queries";
import { useQuery } from "@apollo/client";

// TODO: display logged in user highscore if they have played and have a score in DB

const Highscores = ({ scores }) => {

  const { loading, data } = useQuery(QUERY_ME);
  let loggedInUser = true;

  if(data === undefined) {
    loggedInUser = false
  } 

   if (!scores.length) {
    return <h1>No current highscores</h1>;
  }

  return (
    <div className="text-center">
      <div className={css.highscoresHeader}>
        <div className="col-4">
          <h4 className={css.logoHeader}>User</h4>
        </div>
        <div className="col-4">
          <h4 className={css.logoHeader}>Team</h4>
        </div>
        <div className="col-4">
          <h4 className={css.logoHeader}>Score</h4>
        </div>
      </div>
      {scores &&
        scores.map((score) => (
          <div key={score._id}>
            <div className="col-12 my-1 py-1">
              <div className="d-flex align-items-center align-middle row m-auto">
                <div className="col-4">
                  <p className="my-auto">{score.user.username}</p>
                </div>
                <div className="col-4">
                  <p className="my-auto">{score.team.teamName}</p>
                </div>
                <div className="col-4">
                  <p className="my-auto">{score.score}</p>
                </div>
              </div>
            </div>
            <hr className={css.scoreHr}></hr>
          </div>
        ))}
      <div>
        <div className="col-12">
            {loading ? (
                <p className="my-auto">Loading...</p>
            ): (
                loggedInUser && 
                <p className="my-auto">Your highscore: {data.me.highscore}</p>
                // 
            )}

        </div>
      </div>
    </div>
  );
};

export default Highscores;
