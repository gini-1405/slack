import React, { useState } from "react";
import "../Auth.css";
import {
  Grid,
  Form,
  Segment,
  Header,
  Icon,
  Button,
  Message,
} from "semantic-ui-react";

import firebase from "firebase/compat/app";

import { Link } from "react-router-dom";

const Login = () => {
  /********************************************************************************* */

  let user = {
    email: "",

    password: "",
  };

  let errors = [];

  /********************************************************************************** */

  const [userState, setUserState] = useState(user);

  const [errorState, setErrorState] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);

  /************************************************************************************ */

  const handleInput = (event) => {
    let target = event.target;

    setUserState((currentState) => {
      let currentUser = { ...currentState };

      currentUser[target.name] = target.value;

      return currentUser;
    });
  };

  /******************************************************************************** */

  const checkForm = () => {
    if (isFormEmpty()) {
      setErrorState((prevErrors) => [
        ...prevErrors,

        { message: "Please fill in all fields" },
      ]);

      return false;
    }

    return true;
  };

  /********************************************************************* */
  const isFormEmpty = () => {
    return !userState.password.length || !userState.email.length;
  };
  /******************************************************************************** */

  const onSubmit = () => {
    setErrorState([]);
    if (checkForm()) {
      setIsLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(userState.email, userState.password)
        .then((user) => {
          setIsLoading(false);
          console.log(user);
        })
        .catch((serverError) => {
          setIsLoading(false);
          setErrorState((error) => {
            return [...error, serverError];
          });
        });
    }
  };

  /********************************************************************************* */

  const formatErrors = () => {
    return errorState.map((error, index) => <p key={index}>{error.message}</p>);
  };

  /***************************************************************************************/
  return (
    <Grid verticalAlign="middle" textAlign="center" className="grid-form">
      <Grid.Column style={{ maxWidth: "500px" }}>
        <Header icon as="h2">
          <Icon name="slack" />
          Login
        </Header>
        <Form onSubmit={onSubmit}>
          <Segment stacked>
            <Form.Input
              name="email"
              value={userState.email}
              icon="mail"
              iconPosition="left"
              onChange={handleInput}
              type="email"
              placeholder="User Email"
            />
            <Form.Input
              name="password"
              value={userState.password}
              icon="lock"
              iconPosition="left"
              onChange={handleInput}
              type="password"
              placeholder="User Password"
            />
          </Segment>
          <Button disabled={isLoading} loading={isLoading}>
            Submit
          </Button>
        </Form>
        {errorState.length > 0 && (
          <Message error>
            <h3>Errors</h3>
            {formatErrors()}
          </Message>
        )}
        <Message>
          Not an User ? <Link to="/register">Register</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};
export default Login;
