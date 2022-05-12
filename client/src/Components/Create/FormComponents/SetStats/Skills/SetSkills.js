import React from "react";
import { Grid, Typography } from "@mui/material";
import SetIndividualSkill from "./SetIndividualSkill";
import { theme } from "../../../../Theme";

export default function SetSkills({ skillArray }) {
	const [
		[skills, skillSetters],
		[specialistSkill, skillPoints, setSpecialistSkill, setSkillPoints]
	] = skillArray;

	return (
		<Grid item container direction="column" spacing={0}>
			<Grid
				item
				textAlign="center"
				mb={2}
				width="100%"
				backgroundColor={theme.palette.primary.main}
				pt={2}
				pb={2}
			>
				<Typography variant="h5" pt={2} pb={2}>Your Skills</Typography>
				<Typography variant="body1" p={1}>
					You have 10 points to distribute amongst your skills. No
					skill is allowed to be set higher than 3. You must have one
					point in your Specialist Skill.
				</Typography>
				<Typography variant="h6" p={1}>Points: {skillPoints}</Typography>
			</Grid>

			<Grid item container m={1} rowSpacing={1} alignItems="center">
				{skills.map((skill) => (
					<SetIndividualSkill
						key={skill.id}
						skill={skill}
						setSkill={
							skillSetters[
								skills.findIndex((s) => s.id === skill.id)
							]
						}
						setPoints={setSkillPoints}
						points={skillPoints}
					/>
				))}
			</Grid>

			<Grid item m={1} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
				<SetIndividualSkill
					skill={specialistSkill}
					setSkill={setSpecialistSkill}
					setPoints={setSkillPoints}
					points={skillPoints}
					specialist={true}
				/>
				<Typography variant="subtitle2">Specialist SKill</Typography>
			</Grid>
		</Grid>
	);
}
