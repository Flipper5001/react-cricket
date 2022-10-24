import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { ADD_TEAM, SET_USER_TEAM } from "../../utils/mutations";
import { useNavigate } from "react-router-dom";
import css from './TeamForm.module.css';

const TeamForm = (props) => {
  const navigate = useNavigate();

  const [playerList, setplayerlist] = useState(props.players || [{ player: "" }]);
  const [teamName, setTeamName] = useState(props.teamName || '')

  // if props arent empty, set playerlist to props
    // 

  const handleTeamName = (event) => {


    const {name, value} = event.target;



    setTeamName(value)

  }

  const propBool = Object.keys(props).length !== 0
  console.log(props)

  console.log(playerList)

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

  const propPlayers = props.players

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
      
      navigate('/play')


      return teamData

    } catch (err) {
      console.error(err);
    }
    console.log('hello')
    
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
      
          {propBool && 
          props.players.map((player, index) => (
            <div key={index} className={css.services}>
                <div className={css.firstDivision}>
                  <input
                    className={css.inputField}
                    name="player"
                    type="text"
                    id="player"
                    defaultValue={player}
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
          
          {!propBool && playerList.map((singlePlayer, index) => (
            <div key={index} className={css.services}>
                <div className={css.firstDivision}>
                  <input
                    className={css.inputField}
                    name="player"
                    type="text"
                    id="player"
                    defaultValue={singlePlayer.player}
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
        {/* {props !== null && props.players.map((player, index) => (
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
        ))} */}
        {!propBool && playerList.map((singlePlayer, index) => (
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
          {propBool && props.players.length >= 11 && (
            <button type="submit" onClick={HandleTeamSubmit} className={css.addButton}>
              Submit Team!
            </button>
          )}
          {!propBool && playerList.length >= 11 && (
            <button type="submit" onClick={HandleTeamSubmit} className={css.addButton}>
              Submit Team!
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default TeamForm;
