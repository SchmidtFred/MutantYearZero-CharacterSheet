import React, { useState, useEffect } from 'react';
import { Box, Stepper, StepButton, Step, Button, Typography } from '@mui/material';

const steps = ["Role", "Character Details", "Stats", "Talent and Mutation", "Relationships", "Gear", "Den"];

export default function CreateCharacter() {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const [roles, setRoles] = useState([]);
    const [talents, setTalents] = useState([]);
    const [skills, setSkills] = useState([]);
    const [role, setRole] = useState({});
    //is only set and fetched once a role is decided on
    const [specialistSkill, setSpecialistSkill] = useState({});
    //characters only start with 2 mutations at most, given at random.
    //Randomization will occur at backend to prevent cheating
    const [mutation, setMutation] = useState({});
    const [secondMutation, setSecondMutation] = useState({});
    


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
        const newActiveStep = 
            isLastStep() && !allStepsCompleted() ?
            //If it is the last stop, but not all steps have been completed,
            // find the first step that has been completed
            steps.findIndex((step, i) => !(i in completed))
            : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
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
                        <Typography sx={{ mt: 2, mb: 1 }}>This is where we will render our form component in a Box component</Typography>
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