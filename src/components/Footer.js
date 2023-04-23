import React from 'react';

import { BottomNavigation, Avatar, Box, Button, Container, IconButton, Toolbar, Tooltip, Typography } from '@mui/material/';

const Footer = () => {

    return (
        <BottomNavigation 
        sx={{color: 'inherit'}}
        >
            <Container>
                <Toolbar>
                <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 650,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            @2023
          </Typography>

                </Toolbar>
            </Container>
        </BottomNavigation>
    );
}

export default Footer;