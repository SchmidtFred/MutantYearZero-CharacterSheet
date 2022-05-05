import React, { useState, useEffect } from 'react';
import { Box, Stepper, StepButton, Step, Button, Typography } from '@mui/material';
import ChooseRole from './FormComponents/ChooseRole';
import { getAllRoles } from '../../Modules/roleManager';
import { getSpecialtiesByRole } from '../../Modules/characterManager';
import SetDetails from './FormComponents/SetDetails';

const steps = ["Role", "Character Details", "Stats", "Talent and Mutation", "Relationships", "Gear", "Den"];

export default function CreateCharacter() {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const [isRoleSelected, setIsRoleSelected] = useState(false);
    const [roles, setRoles] = useState([]);
    const [skills, setSkills] = useState([]);
    const [role, setRole] = useState({});
    //the following two are only set and fetched when a role is decided on
    const [specialistSkill, setSpecialistSkill] = useState({});
    const [startingTalents, setStartingTalents] = useState([]);
    //characters only start with 2 mutations at most, given at random.
    //Randomization will occur at backend to prevent cheating
    const [mutation, setMutation] = useState({});
    const [secondMutation, setSecondMutation] = useState({});
    //#region Character State
    //#region Character Details
    const [name, setName] = useState("");
    const [faceAppearance, setFace] = useState("");
    const [bodyAppearance, setBody] = useState("");
    const [clothingAppearance, setClothing] = useState("");
    //role, name, faceApp, bodyApp, clothApp, setName, setFace, setBody, setClothing
    const [detailsArray, setDetailsArray] = useState([{}, "", "", "", "", null, null, null, null]);
    //#endregion
    //#endregion

    //initialization
    useEffect(() => {
        getAllRoles().then(roles => setRoles(roles));
    }, []);

    //details array
    useEffect(() => {
        setDetailsArray([role, name, faceAppearance, bodyAppearance, clothingAppearance, setName, setFace, setBody, setClothing]);
    }, [role, name, faceAppearance, bodyAppearance, clothingAppearance]);

    //To select a role and grab relevant data
    const selectRole = (role) => {
        setRole(role);
        setIsRoleSelected(true);
        getSpecialtiesByRole(role.id).then((res) => {
            console.log(res)
            setStartingTalents(res.startingTalents);
            setSpecialistSkill(res.specialistSkill);
        })
    };

    //#region Stepper Logic
    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        //only move be able to move oncea role is selected
        if (isRoleSelected) {
            const newActiveStep = 
                isLastStep() && !allStepsCompleted() ?
                //If it is the last stop, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
            setActiveStep(newActiveStep);
        } else {
            window.alert("Select a Role before moving on.");
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        if (isRoleSelected) {
            setActiveStep(step);
        } else {
            window.alert("Select a Role before moving on.")
        }
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    }

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    }
    //#endregion

    const FormComponent = () => {
        switch(activeStep) {
            case 0:
                return <ChooseRole roles={roles} selectRole={selectRole} />
            case 1:
                return <SetDetails detailsArray={detailsArray} />
            default:
                return <Typography sx={{ mt: 2, mb: 1 }}>This is where we will render our form component in a Box component</Typography>
        }
    }

    return (
        <Box sx={{ width: '100%' }} mt={3}>
            <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                            <StepButton color="inherit" onClick={handleStep(index)}>
                                {label}
                            </StepButton>
                        </Step>
                    )
                )}
            </Stepper>
            <div>
                {allStepsCompleted() ? (
                    <>
                        <Typography sx={{ mt: 2, mb: 1}}>
                            Finished Character Options to save character will go here.
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: "1 1 auto"}} />
                            <Button onClick={handleReset}>Reset (Will eventually save)</Button>
                        </Box>
                    </>
                ) : (
                    <>
                        <Box>
                            <FormComponent />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2}}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1}}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: "1 1 auto" }} />

                            <Button onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                            {activeStep !== steps.length && (completed[activeStep] ? (
                                <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                    {steps[activeStep]} completed
                                </Typography>
                            ): (
                                <Button onClick={handleComplete}>
                                    {completedSteps() === totalSteps() - 1
                                    ? 'Finish Incomplete Steps'
                                    : 'Complete Step'}
                                </Button>
                            ))}
                        </Box>
                    </>
                )}
            </div>
        </Box>
    );
}