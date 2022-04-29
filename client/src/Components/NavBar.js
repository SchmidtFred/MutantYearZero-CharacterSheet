import React, { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { AppBar, Box, Toolbar, Link, Button, IconButton, Typography } from '@mui/material';
import { logout } from "../Modules/authManager";

export default function NavBar({ isLoggedIn }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <Box sx={{ flexGrow: 1}}>
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2}} >
                        MYZ Sheets
                    </IconButton>
                    {isLoggedIn ?
                    <>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link component="button" color="inherit" to="/">
                                Home
                            </Link>
                        </Typography>
                        <Link component="button" color="inherit" onClick={() => logout()}>Logout</Link>
                    </> : 
                    null
                    }
                </Toolbar>
            </AppBar>
        </Box>
    )
}