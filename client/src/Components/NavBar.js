import React, { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { AppBar, Box, Toolbar, Link, IconButton, Typography, Stack, Divider } from '@mui/material';
import { logout } from "../Modules/authManager";

export default function NavBar({ isLoggedIn }) {

    return (
        <Box sx={{ flexGrow: 1}}>
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2}} >
                        MYZ Sheets
                    </IconButton>
                        {isLoggedIn ?
                        <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} sx={{ width: "100%", justifyContent: 'flex-start'}} spacing={2}>
                            <Typography variant="h6" component="div">
                                <Link component={RRNavLink} color="inherit" to="/">
                                    Home
                                </Link>
                            </Typography>
                            <Typography variant="h6" component="div">
                                <Link component={RRNavLink} color="inherit" to="/create/character">
                                    New Character
                                </Link>
                            </Typography>
                            <Link sx={{ width: '75%', textAlign: 'right'}} component="button" color="inherit" onClick={() => logout()}>Logout</Link>
                        </Stack> :
                        null
                        }
                </Toolbar>
            </AppBar>
        </Box>
    )
}