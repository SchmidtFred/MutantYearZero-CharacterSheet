import React, { useState } from "react";
import { Grid, Card, CardContent, ButtonGroup, Typography, Box, Button, Dialog, DialogTitle } from '@mui/material'
import { Link } from "react-router-dom";

export default function CharacterCard({ character }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        if (!open) {
            setOpen(true);
        }
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <CardContent sx={{ flex: '1 0 auto', mr: 10}}>
                    <Typography component="div" variant="h5">
                        {character.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {character.role.name}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignContent: 'flex-end', alignItems: 'center', p: 1 }}>
                    {/*TODO implement linking to character sheet, current to props are for testing only*/}
                    <Button sx={{ m: 0.5 }} component={Link} to={`/character/${character.id}`} variant="contained" color="primary">View</Button>
                    <Button sx={{ m: 0.5 }} onClick={handleOpen} variant="contained" color="primary">Edit</Button>
                    <Button sx={{ m: 0.5 }} component={Link} to={`/hello/${character.id}`} variant="contained" color="primary">Delete</Button>
                </Box>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Warning</DialogTitle>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Typography variant="body1">Changes to your character made here can extend beyond what is allowed in the rules. Think carefully before commiting to changes you make when editing. Alterations to your character which follow the rules are available on your character sheet.</Typography>
                    </Grid>
                    <Grid item>
                            <ButtonGroup size="large" orientation="horizontal" variant="contained">
                                <Button component={Link} to={`/edit/character/${character.id}`} variant="contained">I Understand</Button>
                                <Button onClick={handleClose}>Cancel</Button>
                            </ButtonGroup>
                        </Grid>
                </Grid>
            </Dialog>
        </Card>
    )
}