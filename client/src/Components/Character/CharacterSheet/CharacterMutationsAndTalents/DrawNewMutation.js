import React, { useState } from 'react';
import {Dialog, DialogTitle, Grid, Typography, TextField, MenuItem, Button } from "@mui/material";
import { getRandomMutation } from '../../../../Modules/mutationManager';


export default function DrawNewMutation({open, handleClose, attributeArray, keyAttribute, characterMutations, setCharacterMutations}) {
    const [strengthArray, agilityArray, witsArray, empathyArray] = attributeArray;
    const [strengthTitle, strength, setStrength, dmgTitle, damage] = strengthArray;
    const [agiTitle, agility, setAgility, fatTitle, fatigue] = agilityArray;
    const [witsTitle, wits, setWits, conTitle, confusion] = witsArray;
    const [empTitle, empathy, setEmpathy, dbtTitle, doubt] = empathyArray
    const [newMutation, setNewMutation] = useState({});
    const [chosenReducedAttribute, setChosenReducedAttribute] = useState("");


    const retrieveNewMutation = () => {
        if (chosenReducedAttribute === "") {
            window.alert("You must choose an attribute to reduce before drawing a mutation. You may change your decision after seeing the mutation.");
        } else {
            getRandomMutation().then(mutation => setNewMutation(mutation));
        }
    };

    const  closeDialog = (saving) => {
        //undo attribute change if no mutation is made
        if (saving) {
            const copy = [...characterMutations];
            copy.push(newMutation);
            setCharacterMutations(copy);
            //undo changes to this component's state
            setChosenReducedAttribute("");
            setNewMutation({});
            handleClose();
        } else {
            //undo changes to attributes if they occured
            if (chosenReducedAttribute !== "") {
                switch (chosenReducedAttribute) {
                    case "Strength":
                        if (strength + 1 < 5) {
                            setStrength(strength + 1);
                        } else if (keyAttribute === "Strength" && strength + 1 < 6) {
                            setStrength(strength + 1);
                        }
                        break;
                    case "Agility":
                        if (agility + 1 < 5) {
                            setAgility(agility + 1);
                        } else if (keyAttribute === "Agility" && agility + 1 < 6) {
                            setAgility(agility + 1);
                        }
                        break;
                    case "Wits":
                        if (wits + 1 < 5) {
                            setWits(wits + 1);
                        } else if (keyAttribute === "Wits" && wits + 1 < 6) {
                            setWits(wits + 1);
                        }
                        break;
                    case "Empathy":
                        if (empathy + 1 < 5) {
                            setEmpathy(empathy + 1);
                        } else if (keyAttribute === "Empathy" && empathy + 1 < 6) {
                            setEmpathy(empathy + 1);
                        }
                        break;
                    default:
                        //this error should only pop up in edge cases
                        throw new Error("Something went wrong with UnReducing chosen attribute");
                }
            }
            setChosenReducedAttribute("");
            setNewMutation({});
            handleClose();
        }
    };

    const handleChosenAttributeChange = (event) => {
        //ensure we dont double reduce
        if (event.target.value === chosenReducedAttribute) {
            window.alert("You have somehow set an attribute to be reduced twice. Please avoid doing that again. We have stopped it from happening.");
        } else {
            let canReduce = true;
            //unreduce current chosen stat if there is one
            if (chosenReducedAttribute !== "") {
                switch (chosenReducedAttribute) {
                    case "Strength":
                        if (strength + 1 < 5) {
                            setStrength(strength + 1);
                        } else if (keyAttribute === "Strength" && strength + 1 < 6) {
                            setStrength(strength + 1);
                        } else {
                            canReduce = false;
                        }
                        break;
                    case "Agility":
                        if (agility + 1 < 5) {
                            setAgility(agility + 1);
                        } else if (keyAttribute === "Agility" && agility + 1 < 6) {
                            setAgility(agility + 1);
                        } else {
                            canReduce = false;
                        }
                        break;
                    case "Wits":
                        if (wits + 1 < 5) {
                            setWits(wits + 1);
                        } else if (keyAttribute === "Wits" && wits + 1 < 6) {
                            setWits(wits + 1);
                        } else {
                            canReduce = false;
                        }
                        break;
                    case "Empathy":
                        if (empathy + 1 < 5) {
                            setEmpathy(empathy + 1);
                        } else if (keyAttribute === "Empathy" && empathy + 1 < 6) {
                            setEmpathy(empathy + 1);
                        } else {
                            canReduce = false;
                        }
                        break;
                    default:
                        throw new Error("Something went wrong with UnReducing chosen attribute");
                }
            }

            if (canReduce) {
                //reduce the stat
                switch (event.target.value) {
                    case "Strength":
                        if (strength - damage > 1) {
                            setStrength(strength - 1);
                        }
                        break;
                    case "Agility":
                        if (agility - fatigue > 1) {
                            setAgility(agility - 1);
                        }
                        break;
                    case "Wits":
                        if (wits - confusion > 1) {
                            setWits(wits - 1);
                        }
                        break;
                    case "Empathy":
                        if (empathy - doubt > 1) {
                            setEmpathy(empathy - 1);
                        }
                        break;
                    default:
                        throw new Error("Something went wrong with Reducing chosen attribute. Maybe you have too much trauma with the attribute to reduce it.");
                }

                setChosenReducedAttribute(event.target.value);
            } else {
                window.alert("The attribute you are currently reducing is not able to be brought to a higher stat than it currently is at. Please reduce it by one on the stats menu before switching off of it here.");
            }


        }
        
    }

    return (
        <Dialog open={open} onClose={() => closeDialog(false)}>
                <DialogTitle>Add Mutation</DialogTitle>
                {newMutation.name ? 
                            <Grid item container direction="column" alignContent="center" textAlign="center" spacing={2} mb={2}>
                                <Grid item container justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h6">{newMutation.name}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body1">For details, refer to Pg. {newMutation.description} in the core rulebook</Typography>
                                    </Grid>
                                </Grid>
                                    <Grid item sx={{flex: 1}}>
                                        <TextField
                                            sx={{ width: "100%"}}
                                            select
                                            label="Change Attribute To Reduce"
                                            value={chosenReducedAttribute}
                                            defaultValue=''
                                            onChange={handleChosenAttributeChange}
                                            helperText="You can change which attribute is reduced."
                                        >
                                            <MenuItem value="Strength">
                                                Strength - {strength - damage}
                                            </MenuItem>
                                            <MenuItem value="Agility">
                                                Agility - {agility - fatigue}
                                            </MenuItem>
                                            <MenuItem value="Wits">
                                                Wits - {wits - confusion}
                                            </MenuItem>
                                            <MenuItem value="Empathy">
                                                Empathy - {empathy - doubt}
                                            </MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid item sx={{flex: 1}}>
                                        <Typography variant="body1">You don't get to choose your mutation. You must learn to make the most of the mutation you've got, even if you would have preferred another. No one chooses what they are born with.</Typography>
                                        <Typography variant="body1">However if another party member, or yourself, has drawn this same mutation you may redraw a new one to avoid duplicates.</Typography>
                                        <Grid item container>
                                            <Grid item>
                                                <Button variant="contained" onClick={retrieveNewMutation}>
                                                    ReDraw
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Button variant="contained"
                                                onClick={() => closeDialog(true)}>
                                                Confirm Mutation
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Button variant="contained"
                                                onClick={() => closeDialog(false)}>
                                                    Cancel
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                        </Grid>
                            : <Grid item container direction="column" spacing={2} mb={2} alignItems="center"> 
                                <Grid item textAlign="center">
                                    <Typography variant="h6">Confirm Mutation</Typography>
                                    <Typography variant="body1">When you manifest a new mutation, you take permanent trauma to one attribute and draw just one mutation. You can never have more than four mutations.</Typography>
                                </Grid>
                                <Grid container item sx={{width: "100%"}} justifyContent="center">
                                    <TextField
                                        sx={{ width: "50%"}}
                                        select
                                        label="Attribute To Reduce"
                                        value={chosenReducedAttribute}
                                        defaultValue=''
                                        helperText="Attribute is reduced when selected"
                                        onChange={handleChosenAttributeChange}
                                    >
                                        <MenuItem value="Strength">
                                            Strength - {strength}
                                        </MenuItem>
                                        <MenuItem value="Agility">
                                            Agility - {agility}
                                        </MenuItem>
                                        <MenuItem value="Wits">
                                            Wits - {wits}
                                        </MenuItem>
                                        <MenuItem value="Empathy">
                                            Empathy - {empathy}
                                        </MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item container>
                                    <Grid item>
                                        <Button variant="contained" 
                                        onClick={retrieveNewMutation}>
                                            Draw
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained"
                                        onClick={() => closeDialog(false)}>
                                            Cancel
                                        </Button>
                                    </Grid>
                                </Grid>
                                </Grid> }
            </Dialog>
    )
}