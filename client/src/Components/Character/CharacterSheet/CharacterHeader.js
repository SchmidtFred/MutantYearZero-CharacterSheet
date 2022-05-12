import React, { useState } from "react";
import { Grid, Box, ButtonGroup, Typography, Button} from "@mui/material";
import LevelUpDialog from "./LevelUpDialog";
import { theme } from "../../Theme";

export default function CharacterHeader({role, name, xp, setXp, updateCharacter, skills, availableTalents, characterTalents, setCharacterTalents, setSkills }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        if (!open){
            setOpen(true);
        }
    }

    const handleClose = () => {
        setOpen(false);
    }

    const incrementXp = (event) => {
        if (event.currentTarget.id === "xpUptick") {
            setXp(xp + 1);
        } else {
            if (xp > 0)
            {
                setXp(xp - 1);
            }
        }
    }

    return <Grid container direction="row" alignItems='center' p={3} spacing={0} sx={{ backgroundColor: theme.palette.primary.light}}>
        <Grid item mr={4}>
            <Typography variant="h3">{name}</Typography>
        </Grid>
        <Grid item mr={4}>
        <Typography variant="h5">{role?.name}</Typography>
        </Grid>
        <Grid item mr={4}>
            <Box alignItems='center' sx={{display: "flex", flexDirection: "row"}}>
                <Typography variant="h6" mr={3}>XP: {xp}</Typography>
                <ButtonGroup size="small" orientation="vertical" variant="contained" sx={{height: 40}}>
                    <Button id="xpUptick" onClick={incrementXp} sx={{fontSize: "1rem", fontWeight: "bold", height: "50%"}}>^</Button>
                    <Button id="xpDowntick" onClick={incrementXp} sx={{fontSize: "1rem", fontWeight: "bold", height: "50%"}}>⌄</Button>
                </ButtonGroup>
            </Box>
        </Grid>
        
        {xp >= 5 ? <Grid item mr={4}><Button variant="contained" onClick={handleOpen}>Level Up</Button> </Grid>: null}
        
        <Grid item>
            <Button variant="contained" onClick={updateCharacter}>Save Changes</Button>
        </Grid> 
        <LevelUpDialog open={open} role={role} skills={skills} availableTalents={availableTalents} characterTalents={characterTalents} handleClose={handleClose} setCharacterTalents={setCharacterTalents} setSkills={setSkills} setXp={setXp} />   
    </Grid>
}