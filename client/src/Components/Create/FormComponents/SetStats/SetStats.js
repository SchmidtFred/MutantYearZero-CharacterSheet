import React from 'react';
import { Grid, Typography } from "@mui/material";
import SetAttributes from './Attributes/SetAttributes';
import SetSkills from './Skills/SetSkills';

export default function SetStats({ attributeArray, skillArray }) {

    return (
        <Grid container direction="column" alignContent="center" p={10} spacing={2}>
            <Grid item mb={2}>
                <Typography variant="h5" textAlign="center">Stats</Typography>
            </Grid>
            <Grid item mb={2}>
                <SetAttributes attributeArray={attributeArray} />
            </Grid>
            <Grid item>
                <SetSkills skillArray={skillArray} />
            </Grid>
        </Grid>
    )
}