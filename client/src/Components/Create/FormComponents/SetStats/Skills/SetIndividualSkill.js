import React, { useState } from "react";
import {
	Grid,
	Button,
	ButtonGroup,
	Box,
	Popover,
	Typography
} from "@mui/material";
import { theme } from "../../../../Theme";

export default function SetIndividualSkill({
	skill,
	setSkill,
	setPoints,
	points,
	specialist
}) {
	const [open, setOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClickOpen = (event) => {
		setAnchorEl(event.currentTarget);
		if (!open) {
			setOpen(true);
		}
	};

	const handleClickClose = () => {
		setOpen(false);
		setAnchorEl(null);
	};

	const addPointToSKill = () => {
		if (points > 0) {
			if (skill.value + 1 < 4) {
				const copy = { ...skill };
				copy.value++;
				setSkill(copy);
				setPoints(points - 1);
			}
		}
	};

	const subtractPointFromSkill = () => {
		//10 is used here instead of 11 because there must always be a point on the specialist skill
		if (points < 10) {
			if (skill.value - 1 >= 1) {
				const copy = { ...skill };
				copy.value--;
				setSkill(copy);
				setPoints(points + 1);
			} else if (skill.value - 1 === 0 && !specialist) {
				//this condition is only allowed if it is not a specialist skill
				const copy = { ...skill };
				copy.value--;
				setSkill(copy);
				setPoints(points + 1);
			}
		}
	};

	return (
		<Grid
			item
			xs={12}
			sm={6}
			md={4}
			lg={3}
			sx={{ flex: 1 }}
			id={`skill--${skill.id}`}
			container
			wrap="nowrap"
			spacing={2}
			mt={"5px"}
			alignItems="center"
		>
			<Grid item flex={2}>
				<Typography
					variant="h6"
					mb={1}
					onClick={handleClickOpen}
					sx={[{ "&:hover": { cursor: "pointer" } }]}
				>
					{skill.name}
				</Typography>
			</Grid>
			<Grid item flex={1}>
				<Box
					sx={{
						border: "1px solid black",
						width: "2rem",
						height: "2rem",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
                        backgroundColor: theme.palette.background.default
					}}
					mb={1}
					p={1}
				>
					{skill.value}
				</Box>
			</Grid>
			<Grid item flex={1}>
				<ButtonGroup
					size="small"
					orientation="vertical"
					variant="contained"
				>
					<Button onClick={addPointToSKill}>
						<strong>⌃</strong>
					</Button>
					<Button onClick={subtractPointFromSkill}>
						<strong>⌄</strong>
					</Button>
				</ButtonGroup>
			</Grid>
			<Popover
				anchorEl={anchorEl}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				transformOrigin={{ vertical: "top", horizontal: "left" }}
				open={open}
				onClose={handleClickClose}
                PaperProps={{ style: { borderRadius: "10px" } }}
			>
				<Box width={500}>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
                        p={1}
						sx={{
							backgroundColor: theme.palette.primary.dark,
							color: "white"
						}}
						textAlign="center"
					>
						{skill.name}
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2, p: 1 }}>
						{skill.description}
					</Typography>
					<Typography
						id="modal-modal-description"
						variant="subtitle1"
                        p={1}
					>
						For information on this skill. Go to page{" "}
						{skill.pageReference}
					</Typography>
				</Box>
			</Popover>
		</Grid>
	);
}
