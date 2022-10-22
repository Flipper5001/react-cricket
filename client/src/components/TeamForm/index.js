import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { ADD_TEAM, SET_USER_TEAM } from "../../utils/mutations";
import { Navigate } from "react-router-dom";

const TeamForm = () => {
  const [playerList, setplayerlist] = useState([{ player: "" }]);
  const [teamName, setTeamName] = useState('')

  const handleTeamName = (event) => {
    const {name, value} = event.target;

    setTeamName(value)
  }

  const fullTeam = playerList.length == 11;

  const handlePlayerChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...playerList];
    list[index][name] = value;
    setplayerlist(list);
  };

  const handlePlayerRemove = (index) => {
    const list = [...playerList];
    list.splice(index, 1);
    setplayerlist(list);
  };

  const handlePlayerAdd = () => {
    setplayerlist([...playerList, { player: "" }]);
  };

  const { loading, data } = useQuery(QUERY_ME);
  const userId = data?.me._id;

  const [addNewTeam, { error }] = useMutation(ADD_TEAM);
  const [setUserTeam, { fault }] = useMutation(SET_USER_TEAM);

  const handleTeamSubmit = async (event) => {
    event.preventDefault()
    let players = playerList.map((a) => a.player);

    try {
      const teamData = await addNewTeam({
        variables: { teamName, players },
      })

      const team = teamData.data?.addNewTeam._id
      const userTeam = await setUserTeam({
        variables: { team, userId}
      })

      
    } catch (err) {
      console.error(err);
    }
    
    return <Navigate to="/play" />;
  };

  return (
    <form className="App" autoComplete="off" onSubmit={handleTeamSubmit}>
      <div className="d-flex row">
        <div className="col-6">
          <div className="form-field">
            <div>
                <input name="teamName" type="text" onChange={handleTeamName}>
                </input>
            </div>
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
              <button type="submit">
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
