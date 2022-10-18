import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


import Auth from "../utils/auth";

const styles = {
  inputForm : {
    backgroundColor: "white",
  },
  formContainer : {
    borderRadius: "5px",
    border: "2px solid black"
  },
  
}
 const logoHeader = {
    fontFamily: 'Rammetto One',
    fontWeight: "bold"


}

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


    <main>
      <div className="row justify-content-center col 4 align-items-center my-4">
                <div className="text-center mt-5">
                    <h2 className={logoHeader}>HOWZAT!</h2>
                </div>
            </div>
      <div className="flex-row justify-center mb-4">
        <div className={styles.formContainer}>
          <div className="row justify-content-center h-80 align-items-center ">
              <div className="d-flex  text-center align-items-center col-12 justify-content-center p-4">

                  <Form className={styles.inputForm}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" />
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                </div>
              </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
