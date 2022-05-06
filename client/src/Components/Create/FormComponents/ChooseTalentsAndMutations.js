import React, { useState } from 'react';
import { Grid, Typography, TextField, MenuItem, Button, ButtonGroup, Divider, Dialog, DialogTitle } from "@mui/material";
import { getRandomMutation } from '../../../Modules/mutationManager';

export default function ChooseTalentsAndMutations(props) {
    const {startingTalents, chosenTalent, setChosenTalent, setMutation, setSecondMutation, mutation, secondMutation, attributeArray, setChosenReducedAttribute} = props;
    const [keyAttribute,
        points,
        setPoints,
        chosenReducedAttribute,
		strength,
		agility,
		wits,
		empathy,
		setStrength,
		setAgility,
		setWits,
		setEmpathy ] = attributeArray;
    const [dialog1Open, set1Open] = useState(false);
    const [dialog2Open, set2Open] = useState(false);
    const [secondMutOpen, setMutOpen] = useState(false);
    

    const handleTalentChange = (event) => {
        setChosenTalent(startingTalents.find(t => t.id === event.target.value));
    }

    const retrieveFirstMutation = () => {
        getRandomMutation().then(mutation => setMutation(mutation));
    }

    const retrieveSecondMutation = () => {
        getRandomMutation().then(mutation => setSecondMutation(mutation));
    }

    const handleSecondMutation = () => {
        if (chosenReducedAttribute === "") {
            window.alert("You must choose an attribute to reduce before drawing a second mutation.")
        } else {
            retrieveSecondMutation();
        }
    }


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
                        break;
                }
            }

            if (canReduce) {
                //reduce the stat
                switch (event.target.value) {
                    case "Strength":
                        if (strength > 1) {
                            setStrength(strength - 1);
                        }
                        break;
                    case "Agility":
                        if (agility > 1) {
                            setAgility(agility - 1);
                        }
                        break;
                    case "Wits":
                        if (wits > 1) {
                            setWits(wits - 1);
                        }
                        break;
                    case "Empathy":
                        if (empathy > 1) {
                            setEmpathy(empathy - 1);
                        }
                        break;
                    default:
                        throw new Error("Something went wrong with Reducing chosen attribute");
                        break;
                }

                setChosenReducedAttribute(event.target.value);
            } else {
                window.alert("The attribute you are currently reducing is not able to be brought to a higher stat than it currently is at. Please reduce it by one on the stats menu before switching off of it here.");
            }


        }
        
    }

    const handleClose=(isDialog1, drawing) => {
        if (isDialog1) {
            set1Open(false);
            if (drawing) {
                retrieveFirstMutation();
            }
        } else {
            set2Open(false);
            if (drawing) {
                handleSecondMutation();
            }
        }
    }

    const handleOpen=(isDialog1) => {
        if (isDialog1) {
            if (!dialog1Open) {
                set1Open(true);
            }
        } else {
            if (!dialog2Open) {
                set2Open(true);
            }
        }
    }

    const SecondMutationDialog = ({open}) => {
        return (
            <Dialog open={open} onClose={() => setMutOpen(false)}>
                <DialogTitle>Second Mutation</DialogTitle>
                <Typography variant="body1">This is a permanent change and CANNOT be undone. Once you have decided your character has a second mutation, they have it for life. Think carefully before confirming.</Typography>
                <ButtonGroup size="large" orientation="horizontal" variant="contained">
                                <Button onClick={() => {
                                    handleSecondMutation();
                                    setMutOpen(false);
                                }}>Draw</Button>
                                <Button onClick={() => setMutOpen(false)}>Cancel</Button>
                </ButtonGroup>
            </Dialog>
        )
    }

    const RedrawMutationDialog = ({isSecondMutation, onClose, open}) => {
        return (
            <Dialog onClose={() => onClose(!secondMutation, false)} open={open}>
                <DialogTitle>Warning</DialogTitle>
                <Typography variant="body1">You don't get to choose your mutation. You must learn to make the most of hte mutation you've got, even if you would have preferred another. No one chooses what they are born with.</Typography>
                <Typography variant="body1">However if another party member, or yourself, has drawn this same mutation you may redraw a new one to avoid duplicates.</Typography>
                <ButtonGroup size="large" orientation="horizontal" variant="contained">
                                <Button onClick={() => handleClose(!isSecondMutation, true)}>Draw</Button>
                                <Button onClick={() => handleClose(!isSecondMutation, false)}>Cancel</Button>
                </ButtonGroup>
            </Dialog>
        )
    }

    return (
        <Grid container direction="row" p={10} rowSpacing={2}>
            <Grid container  direction="column" sx={{ flex: 1}}>
                <Grid item textAlign="center" mb={2}>
                    <Typography variant="h5">Your Starting Talent</Typography>
                    <Typography variant="body1">
                        Choose from the 3 starting talents for your Role
                    </Typography>
                </Grid>
                <Grid item container direction="row" sx={{ display: "flex", justifyContent: "space-around", flex: 1}} spacing={4} alignItems="center">
                    <Grid container item direction="row" xs={12} lg={6} >
                        <TextField
                            select
                            sx={{ flex: 1}}
                            label="Starting Talent"
                            value={chosenTalent.id}
                            defaultValue={""}
                            onChange={handleTalentChange}
                            required>
                                {startingTalents.map(talent => (
                                    <MenuItem key={talent.id} value={talent.id}>
                                        {talent.name}
                                    </MenuItem>
                                ))}
                        </TextField>
                    </Grid>
                    <Grid item >
                        <Typography variant="body1" sx={{ flex: 1}}>{chosenTalent.description ? `See more details at Pg. ${chosenTalent.description} of the core rulebook` : "Select your starting talent."}</Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Divider orientation="vertical" flexItem /> 
            
            <Grid item container sx={{ flex: 1}} direction="column" p={10}>
                <Grid item textAlign="center" mb={2}>
                    <Typography variant="h5">Draw Mutations</Typography>
                </Grid>
                <Grid item container direction="column">
                    {mutation.name ? 
                    <>
                        <Grid item container direction="column" alignContent="center" textAlign="center" spacing={2} mb={2}>
                            <Grid item container justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="h6">{mutation.name}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">For details, refer to Pg. {mutation.description} in the core rulebook</Typography>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" onClick={() => handleOpen(true)}>
                                    ReDraw
                                </Button>
                            </Grid>
                            <RedrawMutationDialog isSecondMutation={false} open={dialog1Open} onClose={handleClose} />
                        </Grid>
                        <Divider orientation="horizontal" flexItem /> 
                        <Grid item container mt={2}>
                            {secondMutation.name ? 
                            <Grid item container direction="column" alignContent="center" textAlign="center" spacing={2} mb={2}>
                                <Grid item container justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h6">{secondMutation.name}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body1">For details, refer to Pg. {secondMutation.description} in the core rulebook</Typography>
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
                                    <Grid item sx={{flex: 1}}>
                                        <Button variant="outlined" onClick={() => handleOpen(false)}>
                                            ReDraw
                                        </Button>
                                    </Grid>
                            <RedrawMutationDialog isSecondMutation={true} open={dialog2Open} onClose={handleClose} />
                        </Grid>
                            : <Grid item container direction="column" spacing={2} mb={2} alignItems="center"> 
                                <Grid item textAlign="center">
                                    <Typography variant="h6">Second Mutation</Typography>
                                    <Typography variant="body2">Once you have drawn your first mutation, you can draw a second mutation and start the game with two. The price you pay is that you must decrease on of your attribute scores by one step.</Typography>
                                    <Typography variant="body2">If you choose to have two mutations, you may end up starting the game with the score of 1 in an attribute. More info found on Pg. 19 of the core rulebook.</Typography>
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
                                <Grid item>
                                    <Button variant="outlined" onClick={() => {if (!secondMutOpen) { setMutOpen(true)}}}>
                                        Draw
                                    </Button>
                                </Grid>
                                <SecondMutationDialog open={secondMutOpen} />
                                </Grid> }
                        </Grid>
                    </> : <Button variant="outlined" onClick={retrieveFirstMutation}>Draw</Button>}
                </Grid>
            </Grid>
        </Grid>
    )
}