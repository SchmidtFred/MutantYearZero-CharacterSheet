import React, { useState } from 'react'
import { Grid, Typography, Button, Dialog, DialogTitle } from "@mui/material";

export default function FinishCharacter({ saveCharacter }) {
    const [open, setOpen] = useState(false);



    return (
        <Grid container direction="column" alignItems="center" p={10} spacing={2}>
            <Grid item mb={2}>
                <Typography textAlign="center" variant="h4">Finish Character</Typography>
            </Grid>
            <Grid item textAlign="center" mb={2}>
                <Button variant="outlined" onClick={() => {
                    if (!open) {
                        setOpen(true);
                    }}}
                >
                    Finish Character
                </Button>
            </Grid>
            <Dialog onClose={() => setOpen(false)} open={open}>
                <DialogTitle>Confirm Saving Character</DialogTitle>
                <Typography variant="body1">Starting Talents, Skills, Attributes, and Mutations are not allowed to be changed after this according to the rules.</Typography>
                <Button variant="outlined" onClick={() => saveCharacter()}>Save</Button>
            </Dialog>
        </Grid>
    )
}