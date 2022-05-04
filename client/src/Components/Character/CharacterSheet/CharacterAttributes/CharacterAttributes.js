import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Attribute from "./Attribute";

export default function CharacterAttributes({ attributeArray }) {
	const [strengthArray, agilityArray, witsArray, empathyArray] = attributeArray;


	return (
		<Grid container m={1} rowSpacing={1} alignItems="center">
			<Grid item sx={{ flex: 1 }}>
				<Attribute
					propArray={strengthArray}
				/>
			</Grid>
			<Grid item sx={{ flex: 1 }}>
				<Attribute
					propArray={agilityArray}
				/>
			</Grid>
			<Grid item sx={{ flex: 1 }}>
				<Attribute
					propArray={witsArray}
				/>
			</Grid>
			<Grid item sx={{ flex: 1 }}>
				<Attribute
					propArray={empathyArray}
				/>
			</Grid>
		</Grid>
	);
}
