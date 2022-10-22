import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import { Navigate } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import css from './Home.module.css';


import Auth from "../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  if (Auth.loggedIn()) {
    const username = Auth.getUser().username;
    return <Navigate to={"/team/" + username} />;
  }

  return (
    <div className={css.interface}>
      <div className={css.homeHeader}>
        <h2 className={css.logoHeader}>LOG IN</h2>
      </div>
      <div className="h-80 text-center py-4 px-5">
        <Form className={css.inputForm} onSubmit={handleFormSubmit}>
          <Form.Group className={css.formGroup} controlId="formBasicEmail">
            <i className="fa fa-user-circle fa-2xl pr-1" style={{width: '40px'}} aria-hidden="true"></i>
            <Form.Control type="email" name="email" placeholder="email" value={formState.email} onChange={handleChange}/>
          </Form.Group>
          <Form.Group className={css.formGroup} controlId="formBasicPassword">
            <i className="fa fa-unlock fa-2xl pr-1" style={{width: '40px'}} aria-hidden="true"></i>
            <Form.Control type="password" name="password"  placeholder="Password" value={formState.password} onChange={handleChange}/>
          </Form.Group>
          <div className='row justify-center'>
            <Button variant="primary" type="submit" style={{ cursor: 'pointer' }} className={css.interactiveButton}>
              Log in
            </Button>
          </div>
          <div className={css.formReturn}>
            <p className='mr-1 my-0'>New to the game?</p>
            <Link to="/signup" className={css.linkText}>
              Signup now
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
