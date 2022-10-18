import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import css from './Home.module.css';


import Auth from "../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

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

    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <div className={css.interface}>
      <div className="my-4 text-center">
        <h2 className={css.logoHeader}>HOWZAT!</h2>
      </div>
      <div className="flex-row justify-center mb-4">
        <div className={css.formContainer}>
              <Form className={css.inputForm} onSubmit={handleFormSubmit}>
                <h4 className={css.logoHeader}> Log in </h4>  
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  {/* <Form.Label>Email address</Form.Label> */}
                  <Form.Control type="email" className="form-control mb-3" placeholder='Email' onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  {/* <Form.Label>Password</Form.Label> */}
                  <Form.Control type="password" className="form-control mb-3" placeholder='Password' onChange={handleChange}/>
                </Form.Group>
                <Button variant="primary" type="submit" style={{ cursor: 'pointer' }} className="btn btn-primary btn-block mb-2">
                Log in
              </Button>
              </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
