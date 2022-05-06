import React, { useState, useEffect } from "react";
import { Grid, Typography, Divider } from "@mui/material";
import SetIndividualAttribute from "./SetIndividualAttribute";

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
		<Grid item container mb={2}>
			<Grid item textAlign="center" mb={2}>
				<Typography variant="h5">Your Attributes</Typography>
				<Typography variant="body1">
					You have 14 points to distribute amongst your attributes. No attribute is allowed to be set lower than 2 or higher than 4 at this point.
                    Only your key attribute is allowed to be set to 5.
				</Typography>
				<Typography variant="h6">Points: {points}</Typography>
			</Grid>

            <Grid item container m={1} rowSpacing={1} alignItems="center" >
                <Grid item container mb={2} rowSpacing={1} alignItems="center" sx={{ flex: 1 }} xs={12} md={6} lg={3} xl={3}>
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
                <Grid item container mb={2} rowSpacing={1} alignItems="center" sx={{ flex: 1 }} xs={12} md={6} lg={3} xl={3}>
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
                <Grid item container mb={2} rowSpacing={1} alignItems="center" sx={{ flex: 1 }} xs={12} md={6} lg={3} xl={3}>
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
                <Grid item container mb={2} rowSpacing={1} alignItems="center" sx={{ flex: 1 }} xs={12} md={6} lg={3} xl={3}>
                    <SetIndividualAttribute
                        attTitle="Empathy"S
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
