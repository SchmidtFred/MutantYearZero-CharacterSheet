import React, { useState } from "react";
import {
	Dialog,
	Grid,
	DialogTitle,
	Typography,
	TextField,
	MenuItem,
    Button
} from "@mui/material";

export default function LevelUpDialog({
	skills,
	open,
	handleClose,
	role,
	availableTalents,
    setCharacterTalents,
    setSkills,
    setXp,
    characterTalents
}) {
	const [chosenSkillId, setChosenSkillId] = useState(0);
	const [chosenSkill, setChosenSkill] = useState({});
	const [chosenTalentId, setChosenTalentId] = useState(0);
	const [chosenTalent, setChosenTalent] = useState({});

    const handleChange = (event) => {
        if (event.target.name === "SkillChange") {
            setChosenSkillId(event.target.value);
            setChosenSkill(skills.find(s => s.id === event.target.value));
            //make sure the other is not set
            setChosenTalentId(0);
            setChosenTalent({});
        } else {
            setChosenTalentId(event.target.value);
            setChosenTalent(availableTalents.find(s => s.id === event.target.value));
            //make sure the other option is not set
            setChosenSkillId(0);
            setChosenSkill({});
        }
    };

    const levelUp = () => {
        //first validate we are able to level up
        if (chosenSkillId > 0 && chosenTalentId > 0) {
            window.alert("Please select only one option between increasing a Skill or gaining a new Talent.");
        } else {
            //do the correct actions
            if (chosenSkillId > 0) {
                const copy = [...skills];
                const index = copy.findIndex(s => s.id === chosenSkillId);
                chosenSkill.value++;
                copy[index] = chosenSkill;
                setSkills(copy);
                setXp(xp => xp - 5);
                handleClose();
            } else {
                const copy = [...characterTalents];
                copy.push(chosenTalent);
                setCharacterTalents(copy);
                setXp(xp => xp - 5);
                handleClose();
            }
        }
    }

	const dialogClose = () => {
		setChosenSkill({});
		setChosenSkillId(0);
		setChosenTalent({});
		setChosenTalentId(0);
		handleClose();
	}

	return (
		<Dialog open={open} onClose={dialogClose}>
			<DialogTitle>Level Up</DialogTitle>
			<Grid container direction="column" alignItems="center">
				<Grid item>
					<Typography variant="body1">
						Select a Skill to level up or a new Talent to acquire.
					</Typography>
				</Grid>
				<Grid item container m={3} spacing={3} alignItems="center">
					<Grid item>
						<Typography>Select Skill</Typography>
					</Grid>
					<Grid item>
						<TextField
							select
							sx={{ flex: 1 }}
							label="Skill To Increase"
							value={chosenSkillId}
							defaultValue=""
							name="SkillChange"
                            onChange={handleChange}
						>
							<MenuItem value={0}>Choose Skill...</MenuItem>
							{skills.map((skill) =>
								//only render if skill can be increased
								skill.value + 1 < 6 ? (
									<MenuItem
										key={skill.id}
										value={skill.id}
										width="100%"
									>
										{skill.name}
									</MenuItem>
								) : null
							)}
						</TextField>
					</Grid>
					<Grid item>
						<Typography>
							{chosenSkillId > 0
								? `${chosenSkill.name} increases to ${chosenSkill.value + 1}`
								: "------"}
						</Typography>
					</Grid>
				</Grid>
				<Grid item container m={3} spacing={3} alignItems="center">
					<Grid item>
						<Typography>Select Talent</Typography>
					</Grid>
					<Grid item>
						<TextField
							select
							sx={{ flex: 1 }}
							label="New Talent"
							value={chosenTalentId}
							defaultValue=""
							name="NewTalent"
                            onChange={handleChange}
						>
							<MenuItem value={0}>Chose Talent...</MenuItem>
							{availableTalents.map((talent) => {
								return <MenuItem
									key={talent.id}
									value={talent.id}
									width="100%"
								>
									{talent.name} {talent.roleId !== null ? `- ${role.name} Specific Talent` : null}
								</MenuItem>;
							})}
						</TextField>
					</Grid>
					<Grid item>
						<Typography>
							{chosenTalentId > 0
								? `See more details at Pg. ${chosenTalent.description} of the core rulebook.`
								: "------"}
						</Typography>
					</Grid>
				</Grid>
                <Grid item>
                    <Button variant="contained" onClick={levelUp}>Confirm Level Up</Button>
					<Button variant="contained" onClick={dialogClose}>Cancel</Button>
                </Grid>
			</Grid>
		</Dialog>
	);
}
