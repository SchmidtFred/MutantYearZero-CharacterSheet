import React from "react";
import { Grid, Typography } from "@mui/material";
import SetIndividualAttribute from "./SetIndividualAttribute";
import { theme } from "../../../../Theme";

export default function SetAttributes({ attributeArray }) {
	const [
		keyAttribute,
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
		setEmpathy
	] = attributeArray;

	return (
		<Grid item container spacing={0} mb={2}>
			<Grid
				item
				textAlign="center"
				mb={2}
				width="100%"
				backgroundColor={theme.palette.primary.main}
				pt={2}
				pb={2}
			>
				<Typography variant="h5" pt={2} pb={2}>Your Attributes</Typography>
				<Typography variant="body1" p={1}>
					You have 14 points to distribute amongst your attributes. No
					attribute is allowed to be set lower than 2 or higher than 4
					at this point. Only your key attribute is allowed to be set
					to 5.
				</Typography>
				<Typography variant="h6" p={1}>Points: {points}</Typography>
			</Grid>

			<Grid item container alignItems='center' p={1} spacing={2}>
				<Grid
					item
                    mb={1}
					sx={{ flex: 1}}
				>
					<SetIndividualAttribute
						attTitle="Strength"
						attribute={strength}
						setAttribute={setStrength}
						points={points}
						setPoints={setPoints}
						keyAttribute={keyAttribute}
						chosenReducedAttribute={chosenReducedAttribute}
					/>
				</Grid>
				<Grid
					item
                    mb={1}
					alignItems="center"
					sx={{ flex: 1}}
				>
					<SetIndividualAttribute
						attTitle="Agility"
						attribute={agility}
						setAttribute={setAgility}
						points={points}
						setPoints={setPoints}
						keyAttribute={keyAttribute}
						chosenReducedAttribute={chosenReducedAttribute}
					/>
				</Grid>
				<Grid
					item
                    mb={1}
					alignItems="center"
					sx={{ flex: 1}}
				>
					<SetIndividualAttribute
						attTitle="Wits"
						attribute={wits}
						setAttribute={setWits}
						points={points}
						setPoints={setPoints}
						keyAttribute={keyAttribute}
						chosenReducedAttribute={chosenReducedAttribute}
					/>
				</Grid>
				<Grid
					item
                    mb={1}
					alignItems="center"
					sx={{ flex: 1}}
				>
					<SetIndividualAttribute
						attTitle="Empathy"
						attribute={empathy}
						setAttribute={setEmpathy}
						points={points}
						setPoints={setPoints}
						keyAttribute={keyAttribute}
						chosenReducedAttribute={chosenReducedAttribute}
					/>
				</Grid>
			</Grid>
		</Grid>
	);
}
