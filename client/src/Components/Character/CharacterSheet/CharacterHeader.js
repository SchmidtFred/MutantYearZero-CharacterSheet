import React, { useState } from "react";
import { Grid, Box, ButtonGroup, Typography, Button} from "@mui/material";
import LevelUpDialog from "./LevelUpDialog";

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

    return <Grid container direction="row" mt={1} ml={1} spacing={"2em"} alignItems='center'>
        <Grid item>
            <Typography >Name: {name}</Typography>
        </Grid>
        <Grid item>
        <Typography >Role: {role?.name}</Typography>
        </Grid>
        <Grid item>
            <Box alignItems='center' sx={{display: "flex", flexDirection: "row"}}>
                <Typography mr={3}>XP: {xp}</Typography>
                <ButtonGroup size="small" orientation="vertical" variant="contained">
                    <Button id="xpUptick" onClick={incrementXp}>⌃</Button>
                    <Button id="xpDowntick" onClick={incrementXp}>⌄</Button>
                </ButtonGroup>
            </Box>
        </Grid>
        <Grid item>
            {xp >= 5 ? <Button onClick={handleOpen}>Level Up</Button> : null}
        </Grid>
        <Grid item>
            <Button onClick={updateCharacter}>Save Changes</Button>
        </Grid> 
        <LevelUpDialog open={open} role={role} skills={skills} availableTalents={availableTalents} characterTalents={characterTalents} handleClose={handleClose} setCharacterTalents={setCharacterTalents} setSkills={setSkills} setXp={setXp} />   
    </Grid>
}