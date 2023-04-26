import React from "react";


import { TextField, Button, Container } from "@mui/material";

import '../stylings/Login.css'

const Login = (props) => {

  const { handleLogin, handleUser, user, newUser } = props;

    return (
      <div>
      <Container style={{display: "flex", alignItems: "flex-start"}}>
      <form 
          className="form"
          name= "login"
          onSubmit={handleLogin}>
              <TextField
              onChange={handleUser}
              value={user.username}
              name="username"
              label="Username"
              type="text"
              />
              <TextField
              onChange={handleUser}
              value={user.password}
              name="password"
              label="Password"
              type="password"
              />
                  <Button
                  type="submit"
                  className="homeButton"
                  variant="contained"
                  style={{backgroundColor: '#BF5BDD'}}
                  >Login
                  </Button>
              </form>
              </Container>
              </div>
    )
}

export default Login;