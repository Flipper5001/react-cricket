import React, { useEffect, useState } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import {
  QUERY_ME,
  QUERY_BY_NAME,
  QUERY_TEAMS,
  QUERY_TEAM,
} from "../../utils/queries";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import css from "./../../pages/Team.module.css";
import auth from "../../utils/auth";

const TeamForm = () => {
  const [playerList, setplayerList] = useState([{ player: "" }]);

  const fullTeam = playerList.length == 11;

  const handlePlayerChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...playerList];
    list[index][name] = value;
    setplayerList(list);
  };

  const handlePlayerRemove = (index) => {
    const list = [...playerList];
    list.splice(index, 1);
    setplayerList(list);
  };

  const handlePlayerAdd = () => {
    setplayerList([...playerList, { player: "" }]);
  };

  const handleTeamSubmit = (event) => {
    event.preventDefault()
    let players = playerList.map((a) => a.player);
    
    console.log(players);
  };

  return (
    <form className="App" autoComplete="off">
      <div className="d-flex row">
        <div className="col-6">
          <div className="form-field">
            <label htmlFor="player">Choose 11 Players</label>
            {playerList.map((singlePlayer, index) => (
              <>
                <div key={index} className="services">
                  <div className="first-division">
                    <input
                      name="player"
                      type="text"
                      id="player"
                      value={singlePlayer.player}
                      onChange={(e) => handlePlayerChange(e, index)}
                      required
                    />
                    {playerList.length - 1 === index && playerList.length < 11 && (
                      <button
                        type="button"
                        onClick={handlePlayerAdd}
                        className="add-btn"
                      >
                        <span>Add a player</span>
                      </button>
                    )}
                  </div>
                  <div className="second-division">
                    {playerList.length !== 1 && (
                      <button
                        type="button"
                        onClick={() => handlePlayerRemove(index)}
                        className="remove-btn"
                      >
                        <span>Remove</span>
                      </button>
                    )}
                  </div>
                </div>
              </>
            ))}
          </div>
          <div>
            {playerList.length >= 11 && (
              <button type="submit" onSubmit={handleTeamSubmit}>
                Submit Team!
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default TeamForm;
