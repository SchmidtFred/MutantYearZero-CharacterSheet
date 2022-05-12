import React, { useState } from 'react'
import { Grid, Typography, Button, Dialog, DialogTitle, Box } from "@mui/material";
import { theme } from '../../Theme';

export default function FinishCharacter({ saveCharacter }) {
    const [open, setOpen] = useState(false);



    return (
        <Box p={10}>
            <Grid container direction="column" alignItems="center" spacing={2} backgroundColor={theme.palette.primary.light}>
                <Grid item pt={2} pb={2}
					sx={{
						backgroundColor: theme.palette.primary.dark,
						width: "100%",
						color: "white"
					}}>
                    <Typography textAlign="center" variant="h4">Finish Character</Typography>
                </Grid>
                <Grid item textAlign="center" m={10}>
                    <Button variant="contained" onClick={() => {
                        if (!open) {
                            setOpen(true);
                        }}}
                    >
                        Finish Character
                    </Button>
                </Grid>
                <Dialog onClose={() => setOpen(false)} open={open}>
                    <DialogTitle p={1} textAlign='center'>Confirm Saving Character</DialogTitle>
                    <Typography p={1} variant="body1">Starting Talents, Skills, Attributes, and Mutations are not allowed to be changed after this according to the rules.</Typography>
                    <Button variant="contained" onClick={() => saveCharacter()}>Save</Button>
                </Dialog>
            </Grid>
        </Box>
    )
}