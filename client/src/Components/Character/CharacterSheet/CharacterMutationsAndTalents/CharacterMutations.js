import React, { useState } from "react";
import {
	Stack,
	Divider,
	Typography,
	Box,
	Button,
	ButtonGroup
} from "@mui/material";
import DrawNewMutation from "./DrawNewMutation";
import { theme } from "../../../Theme";

export default function CharacterMutations({
	characterMutations,
	setCharacterMutations,
	mutationPoints,
	setMp,
	attributeArray,
	keyAttribute
}) {
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		if (!open) {
			setOpen(true);
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	const incrementRp = (event) => {
		if (event.currentTarget.id === "mpUptick") {
			setMp(mutationPoints + 1);
		} else {
			if (mutationPoints > 0) {
				setMp(mutationPoints - 1);
			}
		}
	};

	return (
		<Box>
			<Typography pt={2} pb={2} sx={{backgroundColor: theme.palette.primary.dark, color: 'white'}} variant="h5" textAlign="center">
				Mutations
			</Typography>
			<Box
				alignItems="center"
				sx={{ display: "flex", flexDirection: "row" }}
			>
				<Typography mr={3}>
					Mutation Points: {mutationPoints}
				</Typography>
				<ButtonGroup
					size="small"
					orientation="vertical"
					variant="contained"
					mr={3}
				>
					<Button id="mpUptick" onClick={incrementRp}>
						⌃
					</Button>
					<Button id="mpDowntick" onClick={incrementRp}>
						⌄
					</Button>
				</ButtonGroup>
				<Button onClick={handleOpen} variant="contained">
					Gain New Mutation
				</Button>
			</Box>
			<Stack mt={1} divider={<Divider variant="middle" flexItem />}>
				{characterMutations?.map((mut) => {
					return (
						<Box
							key={mut.id}
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between"
							}}
							mb={1}
						>
							<Typography variant="h6">{mut.name}</Typography>
							<Typography variant="body1">
								Details on Pg. {mut.description}
							</Typography>
						</Box>
					);
				})}
			</Stack>
			<DrawNewMutation
				open={open}
				handleClose={handleClose}
				attributeArray={attributeArray}
				keyAttribute={keyAttribute}
				characterMutations={characterMutations}
				setCharacterMutations={setCharacterMutations}
			/>
		</Box>
	);
}
