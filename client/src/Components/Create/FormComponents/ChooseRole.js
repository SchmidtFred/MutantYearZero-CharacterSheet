import React, { useState } from 'react';
import { Grid, Typography, Button, Stack, Divider } from '@mui/material';

export default function ChooseRole({ roles, selectRole }) {
    const [selectedId, setSelected] = useState(0);

    const handleRoleSelection = (id) => {
        setSelected(id);
        selectRole(roles.find(r => r.id === id));
    };

    return (
        <Stack m={1} divider={<Divider variant="middle" flexItem />}>
        {roles.map(role => {
            return ( <Grid container key={role.id} direction="column" border={selectedId === role.Id ? "1px solid red" : ""} mb={2}>
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
    )   
}