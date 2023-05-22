import React from "react";

import { TextField, Button, Container } from "@mui/material";

import '../stylings/Login.css'

const SignUp = (props) => {

  const { handleCreateUser, handleNewAccount, newUser } = props;

    return (
      <div>
        <Container style={{display: "flex", alignItems: "flex-start"}}>      
          <form 
            className='form'
            name="createAccount"
            onSubmit={handleCreateUser}>
              <TextField
              onChange={handleNewAccount}
              value={newUser.first_name}
              name="first_name"
              label="First Name"
              type="text" 
              />
              <TextField
              onChange={handleNewAccount}
              value={newUser.last_name}
              name="last_name"
              label="Last Name"
              type="text" 
              />
              <TextField
              onChange={handleNewAccount}
              name="email"
              value={newUser.email}
              label="E-mail"
              type="text" 
              />
              <TextField
              onChange={handleNewAccount}
              name="Username"
              value={newUser.username}
              label="Username"
              type="text" 
              />
              <TextField
              onChange={handleNewAccount}
              name="Password"
              value={newUser.password}
              label="Password"
              type="password" 
              />
                <Button
                type="submit"
                className="homeButton"
                variant="contained"
                style={{backgroundColor: '#BF5BDD'}}
                >Create Account
                </Button>
          </form>
        </Container>
      </div>
    )
}

export default SignUp;