import React, { useCallback, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Attribute from "./Attribute";

export default function CharacterAttributes({ attributeArray }) {
	const [ strengthArray, setStrengthArray ] = useState([]);
	const [ agilityArray, setAgilityArray ] = useState([]);
	const [ witsArray, setWitsArray ] = useState([]);
	const [ empathyArray, setEmpathyArray ] = useState([]);

	useEffect(() => {
		//grab the arrays from our attributeArray
		const [_strengthArray, _agilityArray, _witsArray, _empathyArray] = attributeArray;
		//only change them if they do not match the current arrays. This avoids over state setting.
		if (strengthArray != _strengthArray)
		{
			setStrengthArray(_strengthArray);
		}
		if (witsArray != _witsArray)
		{
			setWitsArray(_witsArray);
		}
		if (agilityArray != _agilityArray)
		{
			setAgilityArray(_agilityArray);
		}
		if (empathyArray != _empathyArray)
		{
			setEmpathyArray(_empathyArray);
		}
	}, [attributeArray])

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
