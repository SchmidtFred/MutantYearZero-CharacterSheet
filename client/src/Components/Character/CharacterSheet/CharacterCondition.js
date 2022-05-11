import React, { useState, useEffect } from "react";
import {
	Grid,
	Checkbox,
	Typography,
	Button,
	ButtonGroup,
	FormGroup,
	FormControlLabel, 
	Box,
	CardContent, 
	Card
} from "@mui/material";
import  StringEdit from "../StringEdit";
import {theme} from "../../Theme";

export default function CharacterCondition({ propArray }) {
	const [
		[
			conditionBools,
			setConditionBools,
			rotPoints,
			setRotPoints,
			criticalInjuries,
			setCritInjuries
		],
		setStateArray
	] = useState([
		{
			starving: false,
			dehydrated: false,
			sleepless: false,
			hypothermic: false
		}, null, 0, null, "", null
	]);
	const [open, setOpen] = useState(false);




	useEffect(() => {
		setStateArray(propArray);
	}, [propArray]);

	const handleConditionChange = (event) => {
		const copy = { ...conditionBools };
		copy[event.target.name] = event.target.checked;
		setConditionBools(copy);
	};

	const incrementRp = (event) => {
		if (event.currentTarget.id == "rpUptick") {
			setRotPoints(rotPoints + 1);
		} else {
			if (rotPoints > 0) {
				setRotPoints(rotPoints - 1);
			}
		}
	};

	
	return (
		<Grid container direction="row" wrap="nowrap" alignItems="center" p={1} sx={{ backgroundColor: theme.palette.primary.main}}>
			<Grid item container direction="row" flex={1}>
				<FormGroup>
				<FormControlLabel
						control={
							<Checkbox
								checked={conditionBools.starving}
								onChange={handleConditionChange}
								name="starving"
								color='success'
							/>
						}
						label="Starving"
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={conditionBools.dehydrated}
								onChange={handleConditionChange}
								name="dehydrated"
								color='success'
							/>
						}
						label="Dehydrated"
					/>
				</FormGroup>
				<FormGroup>
					<FormControlLabel
						control={
							<Checkbox
								checked={conditionBools.sleepless}
								onChange={handleConditionChange}
								name="sleepless"
								color='success'
							/>
						}
						label="Sleepless"
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={conditionBools.hypothermic}
								onChange={handleConditionChange}
								name="hypothermic"
								color='success'
							/>
						}
						label="Hypothermic"
					/>
				</FormGroup>
				<Box
					alignItems="center"
					sx={{ display: "flex", flexDirection: "row" }}
				>
					<Typography mr={3}>Rot Points: {rotPoints}</Typography>
					<ButtonGroup
						size="small"
						orientation="vertical"
						variant="contained"
						color='success'
					>
						<Button id="rpUptick" onClick={incrementRp}>
							⌃
						</Button>
						<Button id="rpDowntick" onClick={incrementRp}>
							⌄
						</Button>
					</ButtonGroup>
				</Box>
			</Grid>
			<Grid onClick={() => StringEdit.handlers.handleOpen(open, setOpen)} sx={[
				{ "&:hover": { cursor: "pointer" } }
			]} flex={1} item>
				<Card variant="outlined">
					<CardContent>
						<Typography variant="h6">Critical Injuries</Typography>
						<Typography variant="body1">{criticalInjuries}</Typography>
					</CardContent>
				</Card>
			</Grid>
			<StringEdit.render.StringDialog
				title="Critical Injuries"
				_string={criticalInjuries}
				open={open}
				onClose={StringEdit.handlers.handleClose}
				openSetter={setOpen}
				stringSetter={setCritInjuries}
			/>
		</Grid>
	);
}
