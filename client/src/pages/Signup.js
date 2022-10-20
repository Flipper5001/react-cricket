import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_BY_NAME } from '../utils/queries';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import css from './Home.module.css';
import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

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
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  // If there is no `TeamId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  if (Auth.loggedIn()) {
    const username = Auth.getUser().username;
    return <Navigate to={"/team/" + username} />;
  }

  return (
    <div className={css.interface}>
      <div className={css.homeHeader}>
        <h2 className={css.logoHeader}>SIGN UP</h2>
      </div>
      <div className="h-80 text-center py-4 px-5">
        {data ? (
          <p>
            Success! You may now head{' '}
            <Link to="/">back to the homepage.</Link>
          </p>
        ) : (
          <Form className={css.inputForm} onSubmit={handleFormSubmit}>
            <Form.Group className={css.formGroup}>
              <i className="fa fa-user-circle fa-2xl pr-1" style={{width: '40px'}} aria-hidden="true"></i>
              <Form.Control type="text" name="username" id='username' placeholder='Username' value={formState.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group className={css.formGroup}>
              <i class="fa fa-envelope fa-2xl pr-1" style={{width: '40px'}} aria-hidden="true"></i>
              <Form.Control type="email" name="email" id='email' placeholder='Email' value={formState.email} onChange={handleChange} />
            </Form.Group>
            <Form.Group className={css.formGroup}>
              <i class="fa fa-unlock fa-2xl pr-1" style={{width: '40px'}} aria-hidden="true"></i>
              <Form.Control type="password" name="password" id='password' placeholder='Password' value={formState.password} onChange={handleChange} />
            </Form.Group>
            <div className='row justify-center'>
              <Button variant="primary" type="submit" style={{ cursor: 'pointer' }} className={css.interactiveButton}>
                Sign up
              </Button>
            </div>
            <div className={css.formReturn}>
            <p className='mr-1 my-0'>Return to</p>
            <Link to="/login" className={css.linkText}>
              Login
            </Link>
          </div>
          </Form>
        )}
        {error && (
          <div className="my-3 p-3 bg-danger text-white">
            {error.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;

{/* <form className="py-4 px-5" onSubmit={handleFormSubmit}>
  <div className="form-outline mb-4">
      <input type="text" name="username" id="form2Example1" className="form-control" value={formState.name} onChange={handleChange}/>
      <label className="form-label" for="form2Example1">Username</label>
  </div> */}
  {/* <div className="form-outline mb-4">
      <input type="email" name="email" id="form2Example1" className="form-control" value={formState.email} onChange={handleChange}/>
      <label className="form-label" for="form2Example1">Email address</label>
  </div> */}
  {/* <div className="form-outline mb-4">
      <input type="password" id="form2Example2" className="form-control" name="password" value={formState.password} onChange={handleChange}/>
      <label className="form-label" for="form2Example2">Password</label>
  </div> */}
  {/* <button type="submit" style={{ cursor: 'pointer' }} className="btn btn-primary btn-block mb-2">Sign in</button>
</form> */}