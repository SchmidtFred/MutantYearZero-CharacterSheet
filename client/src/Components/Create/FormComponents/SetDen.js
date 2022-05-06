import React from 'react';
import { Divider, Grid, TextField, Typography } from "@mui/material";


export default function SetDen({ denArray }) {
    const [
        denDescription,
        denStash,
        setDenDescription,
        setDenStash
    ] = denArray;

    return (
        <>
        <Grid container direction="column" alignItems="center" p={10} spacing={2}>
            <Grid item mb={2}>
                <Typography textAlign="center" variant="h4">Your Den</Typography>
            </Grid>
            <Grid item textAlign="center" mb={2}>
                <Typography variant="body1">Refer to the core rule book for suggestions</Typography>
            </Grid>

            <Divider variant="middle" flexItem />

            <Grid item container justifyContent="space-between" alignItems="center" wrap='nowrap' mb={2}>
                <TextField
                    defaultValue={denDescription}
                    onBlur={(e) => setDenDescription(e.target.value)}
                    label="Den Description"
                    sx={{width: "100%"}}
                    multiline
                    rows={2}
                />
			</Grid>

            <Divider variant="middle" flexItem />

            <Grid item container justifyContent="space-between" alignItems="center" wrap='nowrap' mb={2}>
                <TextField
                    defaultValue={denStash}
                    onBlur={(e) => setDenStash(e.target.value)}
                    label="Den Stash"
                    sx={{width: "100%"}}
                    multiline
                    rows={2}
                />
			</Grid>

            <Divider variant="middle" flexItem />
        </Grid>
        </>
    )
}