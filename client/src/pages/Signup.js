import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
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

  return (
    <div className={css.interface}>
      <div className="my-4 text-center">
        <h2 className={css.logoHeader}>HOWZAT!</h2>
      </div>
      <div className="flex-row justify-center mb-4">
        <div className={css.formContainer}>
          {data ? (
            <p>
              Success! You may now head{' '}
              <Link to="/">back to the homepage.</Link>
            </p>
          ) : (
            <Form className={css.inputForm} onSubmit={handleFormSubmit}>
              <h4 className={css.logoHeader}> Sign Up </h4>
              <Form.Group>
                {/* <Form.Label className='form-label' for='username'>Username</Form.Label> */}
                <Form.Control type="text" name="username" id='username' className="form-control mb-3" placeholder='Username' value={formState.name} onChange={handleChange} />
              </Form.Group>
              <Form.Group>
                {/* <Form.Label className='form-label' for='email'>Email</Form.Label> */}
                <Form.Control type="email" name="email" id='email' className="form-control mb-3" placeholder='Email' value={formState.email} onChange={handleChange} />
                {/* <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text> */}
              </Form.Group>
              <Form.Group>
                {/* <Form.Label className='form-label' for='password'>Password</Form.Label> */}
                <Form.Control type="password" name="password" id='password' className="form-control mb-3" placeholder='Password' value={formState.password} onChange={handleChange} />
              </Form.Group>
              <Button variant="primary" type="submit" style={{ cursor: 'pointer' }} className="btn btn-primary btn-block mb-2">
                Sign up
              </Button>
            </Form>
          )}
          {error && (
            <div className="my-3 p-3 bg-danger text-white">
              {error.message}
            </div>
          )}
        </div>
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