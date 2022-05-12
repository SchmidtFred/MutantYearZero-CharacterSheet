import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import SetAttributes from "./Attributes/SetAttributes";
import SetSkills from "./Skills/SetSkills";
import { theme } from "../../../Theme";

export default function SetStats({ attributeArray, skillArray }) {
	return (
		<Box p={10}>
			<Grid
				container
				direction="column"
				alignContent="center"
				backgroundColor={theme.palette.primary.light}
				spacing={0}
			>
				<Grid
					item
					pt={2}
					pb={2}
					sx={{
						backgroundColor: theme.palette.primary.dark,
						width: "100%",
						color: "white"
					}}
				>
					<Typography variant="h5" textAlign="center">
						Stats
					</Typography>
				</Grid>
				<SetAttributes attributeArray={attributeArray} />
				<SetSkills skillArray={skillArray} />
			</Grid>
		</Box>
	);
}
