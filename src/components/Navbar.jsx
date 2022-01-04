import React from 'react';
import {AppBar,Toolbar,Typography,IconButton,MenuIcon} from '@mui/material';
import dltkashlogo from './dltkashlogo.png';
import './navbar.css'

function Navbar() {
    return (
        <AppBar position="static">
                <Toolbar variant="dense" className='customnavbar-container'>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <img src={dltkashlogo} alt='logo' />
                    </IconButton>
                    <Typography variant="h6">
                        Login
                    </Typography>
                    <p>Register</p>
                </Toolbar>
        </AppBar>
    )
}

export default Navbar
