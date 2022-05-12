import React from "react";
import { Stack, Typography, Box } from "@mui/material";
import CharacterSkill from "./CharacterSkill";
import { theme } from "../../../Theme";

export default function CharacterSkillsList({ skills }) {
	return (
		<Box>
			<Typography
				pt={2}
				pb={2}
				variant="h5"
				textAlign="center"
				sx={{
					backgroundColor: theme.palette.primary.dark,
					color: "white"
				}}
			>
				Skills
			</Typography>
			<Stack
				m={1}
                mr={1}
				sx={{
					overflow: "hidden",
					overflowY: "scroll",
					maxHeight: "65vh"
				}}
			>
				{skills?.map((skill) => (
					<CharacterSkill key={skill.id} skill={skill} />
				))}
			</Stack>
		</Box>
	);
}
