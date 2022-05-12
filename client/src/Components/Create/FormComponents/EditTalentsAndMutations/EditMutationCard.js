import React, { useState } from 'react';
import {Grid, Typography, Button, Dialog, DialogTitle, ButtonGroup } from "@mui/material";

export default function EditMutationCard({mutation, drawNewMutation}) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        if (!open) {
            setOpen(true);
        }
    }

    const handleClose = (drawing) => {
        setOpen(false);
        if (drawing) {
            drawNewMutation(mutation.id);
        }
    }

    const RedrawMutationDialog = ({onClose, open}) => {
        return (
            <Dialog onClose={() => onClose(false)} open={open}>
                <DialogTitle textAlign='center' pt={2} pb={2}>Warning</DialogTitle>
                <Typography variant="body1" p={1}>You don't get to choose your mutation. You must learn to make the most of the mutation you've got, even if you would have preferred another. No one chooses what they are born with.</Typography>
                <Typography variant="body1" p={1}>However if you have good cause and permission from the GM to redraw your mutation at this point you may redraw a new one.</Typography>
                <ButtonGroup size="large" orientation="horizontal" variant="contained" sx={{width: '30%', margin: 'auto', mb: 1, mt: 1}}>
                                <Button onClick={() => handleClose(true)}>Draw</Button>
                                <Button onClick={() => handleClose(false)}>Cancel</Button>
                </ButtonGroup>
            </Dialog>
        )
    }

    return (
        <Grid item container direction="column" alignContent="center" textAlign="center" spacing={2} mb={2} key={mutation.id} p={1}>
        <Grid item container justifyContent="space-between">
            <Grid item>
                <Typography variant="h6">{mutation.name}</Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1">For details, refer to Pg. {mutation.description} in the core rulebook</Typography>
            </Grid>
            <Grid item>
                <Button variant="contained" onClick={() => handleOpen(true)}>
                ReDraw
                </Button>
            </Grid>
        <RedrawMutationDialog open={open} onClose={handleClose} />
        </Grid>
    </Grid>)
}