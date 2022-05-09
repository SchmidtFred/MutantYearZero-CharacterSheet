import React, { useEffect, useState } from "react";
import { Grid, Typography, Button } from '@mui/material';
import { getAllCharactersFromCurrentUser } from "../../Modules/characterManager";
import CharacterCard from "./CharacterCard";
import { Link } from "react-router-dom";

export default function CharacterList() {
    const [characters, setCharacters] = useState([]);

    const getCharacters = () => {
        getAllCharactersFromCurrentUser().then(setCharacters);
    }

    useEffect(() => {
        getCharacters();
    }, []);

    return (
        <>
        {characters.length > 0 ?
            <> <Typography align="center" gutterBottom={true} variant="h1">
                My Characters
            </Typography>
            <Grid container spacing="2" direction="column" alignContent='center'>
                {characters.map(c => <Grid item key={c.id}><CharacterCard character={c} getCharacters={getCharacters} /></Grid>)}
            </Grid> </>
            : 
            //Give option to create new character if the user does not yet have one.
            <> <Typography align="center" variant="h3">
                Make Your First Character
            </Typography>
            <Typography align="center">
            <Button component={Link} to="/characters/create" variant="contained" textalign="center">
                Create Character    
            </Button></Typography> </>
        }
        </>
    )
}