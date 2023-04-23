import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container } from "@mui/material";
import cookie from 'cookie';


const Login = () => {
  const navigate = useNavigate();
    
    return (
        <div className="App">
      <header className="App-header">
        <Container>
            <form className="login">
            <TextField
            name="username"
            label="Username"
            type="text" />
            <TextField
            name="password"
            label="Password"
            type="password" />
            <Button
            type="submit"
            className="login-button"
            variant="contained"
            color="primary" >
                Login
            </Button>
            </form>
            
        </Container>
      </header>
    </div>
    )
}

export default Login;