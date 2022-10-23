import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { ADD_TEAM, SET_USER_TEAM } from "../../utils/mutations";
import { useNavigate } from "react-router-dom";
import css from './TeamForm.module.css';

const TeamForm = (props) => {
  const navigate = useNavigate();

  const [playerList, setplayerlist] = useState([{ player: "" }]);
  const [teamName, setTeamName] = useState('')
  console.log(props)

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

  const HandleTeamSubmit = async (event) => {
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

      console.log({userTeam})
      
      return teamData

    } catch (err) {
      console.error(err);
    }
    
    navigate('/play')

  };

  return (
    <form className={css.app} autoComplete="off" onSubmit={HandleTeamSubmit}>
      <div className="d-flex row text-center">
        <div className={css.formField}>
          <div className="mb-4">
            <input className={css.inputField} name="teamName" type="text" value={props.teamName} onChange={handleTeamName}>
            </input>
          </div>
          <label htmlFor="player" style={{marginBottom: '10px'}}>Choose 11 Players</label>
          {props !== null && 
          props.players.map((player, index) => (
            <div key={index} className={css.services}>
                <div className={css.firstDivision}>
                  <input
                    className={css.inputField}
                    name="player"
                    type="text"
                    id="player"
                    value={player}
                    onChange={(e) => handlePlayerChange(e, index)}
                    required
                    />
                </div>
                <div className={css.secondDivision}>
                  {props.players.length !== 1 && (
                    <button
                    type="button"
                    onClick={() => handlePlayerRemove(index)}
                    className={css.removeButton}
                    >
                      <span>Remove</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          }
          {props === null && playerList.map((singlePlayer, index) => (
            <div key={index} className={css.services}>
                <div className={css.firstDivision}>
                  <input
                    className={css.inputField}
                    name="player"
                    type="text"
                    id="player"
                    value={singlePlayer.player}
                    onChange={(e) => handlePlayerChange(e, index)}
                    required
                    />
                </div>
                <div className={css.secondDivision}>
                  {playerList.length !== 1 && (
                    <button
                    type="button"
                    onClick={() => handlePlayerRemove(index)}
                    className={css.removeButton}
                    >
                      <span>Remove</span>
                    </button>
                  )}
                </div>
              </div>
          ))}
        </div>
        <div>
        {props !== null && props.players.map((player, index) => (
          <div>
            {props.players.length - 1 === index && props.players.length < 11 && (
              <button
              type="button"
              onClick={handlePlayerAdd}
              className={css.addButton}
              >
                <span>Add a player</span>
              </button>
            )}
          </div>
        ))}
        {props === null && playerList.map((singlePlayer, index) => (
          <div>
            {playerList.length - 1 === index && playerList.length < 11 && (
              <button
              type="button"
              onClick={handlePlayerAdd}
              className={css.addButton}
              >
                <span>Add a player</span>
              </button>
            )}
          </div>
        ))}
          {props !== null && props.players.length >= 11 && (
            <button type="submit" className={css.addButton}>
              Submit Team!
            </button>
          )}
          {props === null && playerList.length >= 11 && (
            <button type="submit" className={css.addButton}>
              Submit Team!
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default TeamForm;
