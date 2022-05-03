import React from "react";
import { Card, CardContent, Typography, Box, Button } from '@mui/material'
import { Link } from "react-router-dom";

export default function CharacterCard({ character }) {
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
                    <Button sx={{ m: 0.5 }} component={Link} to={`/hello/${character.id}`} variant="contained" color="primary">Edit</Button>
                    <Button sx={{ m: 0.5 }} component={Link} to={`/hello/${character.id}`} variant="contained" color="primary">Delete</Button>
                </Box>
            </Box>
        </Card>
    )
}