import React, { useState } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_BY_NAME, QUERY_TEAMS, QUERY_TEAM } from "../utils/queries";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import css from "./Team.module.css";
import Auth from "../utils/auth";
import australiaImage from "../assets/australia.png";
import newzealandImage from "../assets/newzealand.png";
import southafricaImage from "../assets/southafrica.png";
import englandImage from "../assets/england.png";
import { ADD_TEAM, SET_USER_TEAM } from "../utils/mutations";



const Team = () => {
  const { username } = useParams();

  // If there is no `TeamId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { data } = useQuery(username ? QUERY_BY_NAME : QUERY_ME, {
    variables: { username: username },
  });

  const [players, setPlayer] = useState([]);
  

  const [addTeam, { error }] = useMutation(ADD_TEAM, {
    update(cache, { data: { addTeam } }) {
      try {
        const { teams } = cache.readQuery({ query: ADD_TEAM });

        cache.writeQuery({
          query: QUERY_TEAMS,
          data: { teams: [addTeam, ...teams] },
        });
      } catch (e) {
        console.error(e);
      }

      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeFragment({
        query: QUERY_ME,
        data: { me: { ...me, teams: [...me.team, addTeam] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // try {
    //   const { data } = await addTeam({
    //     variables: {
    //       teamName,
    //       players,
    //     },
    //   });
    // } catch (err) {
    //   console.error(err);
    // }
  };


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



  const TeamSelect = async (id) => {
    const {loading, data} = useQuery(QUERY_TEAM, {
      variables: {id}
    })


    console.log(data)

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
              onClick={TeamSelect('6347effea0eb2c9311397fcd')}
              id="australia"
            ></button>
            <button
              className={css.flag}
              style={newzealand}
              onClick={TeamSelect('6347effea0eb2c9311397fd3')}
              id="newzealand"
            ></button>
          </div>
          <div>
            <button
              className={css.flag}
              style={southafrica}
              onClick={TeamSelect('6347effea0eb2c9311397fd1')}
              id="southafrica"
            ></button>
            <button
              className={css.flag}
              style={england}
              onClick={TeamSelect('6347effea0eb2c9311397fcf')}
              id="england"
            ></button>
          </div>
        </div>
      </div>


      <div className="flex-row justify-center mb-3">
        <h2 className={css.header} id={css.mobileHeader}>
          Your Team
        </h2>
        <Form className={css.teamlist} onSubmit={handleFormSubmit}>
          <Form.Group className={css.formGroup}>
            <div className={css.teamNameInput}>

              <h4>Team Name:</h4>
            </div>

            <Form.Control />
          </Form.Group>
          <div className="d-flex row">
            <div className="col-6">
              <Form.Group className={css.formGroup}>
                <i
                  className="fa fa-user-circle fa-2xl pr-1"
                  style={{ width: "40px" }}
                  aria-hidden="true"
                ></i>

                <Form.Control />
              </Form.Group>
              <Form.Group className={css.formGroup}>
                <i
                  className="fa fa-user-circle fa-2xl pr-1"
                  style={{ width: "40px" }}
                  aria-hidden="true"
                ></i>

                <Form.Control />
              </Form.Group>
              <Form.Group className={css.formGroup}>
                <i
                  className="fa fa-user-circle fa-2xl pr-1"
                  style={{ width: "40px" }}
                  aria-hidden="true"
                ></i>

                <Form.Control />
              </Form.Group>
              <Form.Group className={css.formGroup}>
                <i
                  className="fa fa-user-circle fa-2xl pr-1"
                  style={{ width: "40px" }}
                  aria-hidden="true"
                ></i>

                <Form.Control />
              </Form.Group>
              <Form.Group className={css.formGroup}>
                <i
                  className="fa fa-user-circle fa-2xl pr-1"
                  style={{ width: "40px" }}
                  aria-hidden="true"
                ></i>

                <Form.Control />
              </Form.Group>
              <Form.Group className={css.formGroup}>
                <i
                  className="fa fa-user-circle fa-2xl pr-1"
                  style={{ width: "40px" }}
                  aria-hidden="true"
                ></i>

                <Form.Control />
              </Form.Group>
            </div>
            <div className="col-6">
              <Form.Group className={css.formGroup}>
                <i
                  className="fa fa-user-circle fa-2xl pr-1"
                  style={{ width: "40px" }}
                  aria-hidden="true"
                ></i>

                <Form.Control />
              </Form.Group>
              <Form.Group className={css.formGroup}>
                <i
                  className="fa fa-user-circle fa-2xl pr-1"
                  style={{ width: "40px" }}
                  aria-hidden="true"
                ></i>

                <Form.Control />
              </Form.Group>
              <Form.Group className={css.formGroup}>
                <i
                  className="fa fa-user-circle fa-2xl pr-1"
                  style={{ width: "40px" }}
                  aria-hidden="true"
                ></i>

                <Form.Control />
              </Form.Group>
              <Form.Group className={css.formGroup}>
                <i
                  className="fa fa-user-circle fa-2xl pr-1"
                  style={{ width: "40px" }}
                  aria-hidden="true"
                ></i>

                <Form.Control />
              </Form.Group>
              <Form.Group className={css.formGroup}>
                <i
                  className="fa fa-user-circle fa-2xl pr-1"
                  style={{ width: "40px" }}
                  aria-hidden="true"
                ></i>

                <Form.Control />
              </Form.Group>
            </div>
          </div>
          <div className={css.formReturn}>
            <Button
              variant="primary"
              type="submit"
              style={{ cursor: "pointer" }}
              className={css.logoutButton}
              to=""
            >
              Start!
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Team;
