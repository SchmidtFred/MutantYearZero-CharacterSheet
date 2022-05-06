import React from 'react';
import { Grid, Typography, Button, Stack, Divider } from '@mui/material';

export default function ChooseRole({ roles, selectedRole, selectRole }) {

    const handleRoleSelection = (id) => {
        selectRole(roles.find(r => r.id === id));
    };

    return (
        <Grid container>
            <Grid item  mb={2} mt={4}>
                <Typography variant="h4" textAlign="center">Choose Your Role</Typography>
            </Grid>
            <Grid item>
                <Stack m={1} divider={<Divider variant="middle" flexItem />}>
                {roles.map(role => {
                    return ( <Grid container key={role.id} direction="column" border={ selectedRole.id === role.id ? "1px solid red" : ""} mb={2}>
                            <Grid item>
                                <Typography variant="h6">{role.name}</Typography>
                                <Typography variant="subtitle1">Key Attribute: {role.keyAttribute}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1">{role.description}</Typography> 
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" onClick={() => handleRoleSelection(role.id)}>
                                    Select {role.name}
                                </Button>
                            </Grid>
                        </Grid>
                    )
                })}
                </Stack>
            </Grid>
        </Grid>
    )   
}