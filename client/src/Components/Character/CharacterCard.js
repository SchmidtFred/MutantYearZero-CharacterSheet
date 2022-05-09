import React, { useState } from "react";
import { Grid, Card, CardContent, ButtonGroup, Typography, Box, Button, Dialog, DialogTitle } from '@mui/material'
import { Link } from "react-router-dom";
import { deleteCharacter } from "../../Modules/characterManager";

export default function CharacterCard({ character, getCharacters }) {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleDeleteOpen = () => {
        if (!deleteOpen) {
            setDeleteOpen(true);
        }
    }

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    }

    const handleEditOpen = () => {
        if (!editOpen) {
            setEditOpen(true);
        }
    }

    const handleEditClose = () => {
        setEditOpen(false);
    }

    const deleteChosenCharacter = () => {
        deleteCharacter(character.id).then(() => getCharacters());
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
                    <Button sx={{ m: 0.5 }} component={Link} to={`/character/${character.id}`} variant="contained" color="primary">View</Button>
                    <Button sx={{ m: 0.5 }} onClick={handleEditOpen} variant="contained" color="primary">Edit</Button>
                    <Button sx={{ m: 0.5 }} onClick={handleDeleteOpen} variant="contained" color="primary">Delete</Button>
                </Box>
            </Box>
            <Dialog open={editOpen} onClose={handleEditClose}>
                <DialogTitle>Warning</DialogTitle>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Typography variant="body1">Changes to your character made here can extend beyond what is allowed in the rules. Think carefully before commiting to changes you make when editing. Alterations to your character which follow the rules are available on your character sheet.</Typography>
                    </Grid>
                    <Grid item>
                        <ButtonGroup size="large" orientation="horizontal" variant="contained">
                            <Button component={Link} to={`/edit/character/${character.id}`} variant="contained">I Understand</Button>
                            <Button onClick={handleEditClose}>Cancel</Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            </Dialog>
            <Dialog open={deleteOpen} onClose={handleDeleteClose}>
                <DialogTitle>Warning</DialogTitle>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Typography variant="body1">Are you sure you wish to delete {character.name}? This is irreversible.</Typography>
                    </Grid>
                    <Grid item>
                        <ButtonGroup size="large" orientation="horizontal" variant="contained">
                            <Button onClick={deleteChosenCharacter} variant="contained">Confirm</Button>
                            <Button onClick={handleDeleteClose}>Cancel</Button>
                        </ButtonGroup>
                    </Grid>
                 </Grid>
            </Dialog>
        </Card>
    )
}