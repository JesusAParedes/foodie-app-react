import React from 'react';
import { Link } from 'react-router-dom';

import { AppBar, Button, Container, IconButton, Toolbar,  Typography } from '@mui/material/';

import AccountCircle from '@mui/icons-material/AccountCircle';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import LunchDiningTwoToneIcon from '@mui/icons-material/LunchDiningTwoTone';

const navTheme = createTheme({
  palette: {
    primary: {
      main: '#40A34A',
    }}});

const NavBar = () => {

    return (
      <ThemeProvider theme={navTheme}>
        <AppBar color='primary'>
            <Container>
                <Toolbar>
                <LunchDiningTwoToneIcon fontSize="large" />
                <Typography
            variant="h5"
            noWrap
            component="a"
            href="/foodie-app-react"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Foodies
          </Typography>
          
          <IconButton
          size="large"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          >
          <AccountCircle />
          </IconButton>
          <Button color="inherit">
            <Link to='/foodie-app-react' 
            style={{textDecoration: 'none', color: 'white'}}>
              LOGOUT</Link>
            </Button>
                </Toolbar>
            </Container>
        </AppBar>
        </ThemeProvider>
    );
}

export default NavBar;