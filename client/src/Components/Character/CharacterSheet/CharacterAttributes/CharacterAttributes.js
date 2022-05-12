import React from "react";
import { Grid } from "@mui/material";
import Attribute from "./Attribute";

export default function CharacterAttributes({ attributeArray, keyAttribute }) {
	const [strengthArray, agilityArray, witsArray, empathyArray] = attributeArray;


	return (
		<Grid container spacing={2} alignItems="center" p={1}>
			<Grid item sx={{ flex: 1 }}>
				<Attribute
					propArray={strengthArray}
					keyAttribute={keyAttribute}
				/>
			</Grid>
			<Grid item sx={{ flex: 1 }}>
				<Attribute
					propArray={agilityArray}
					keyAttribute={keyAttribute}
				/>
			</Grid>
			<Grid item sx={{ flex: 1 }}>
				<Attribute
					propArray={witsArray}
					keyAttribute={keyAttribute}
				/>
			</Grid>
			<Grid item sx={{ flex: 1 }}>
				<Attribute
					propArray={empathyArray}
					keyAttribute={keyAttribute}
				/>
			</Grid>
		</Grid>
	);
}
