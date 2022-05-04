import React, { useEffect, useState } from "react";
import { Grid, Popover, Typography, Box } from "@mui/material";

export default function CharacterSkill({ skill }) {
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

	return (
		<Grid
			id={`skill--${skill.id}`}
			container
			wrap="nowrap"
			spacing={2}
			onClick={handleClickOpen}
			mt={"5px"}
			sx={[
				{ "&:hover": { cursor: "pointer" } }
			]}
			alignItems="center"
		>
			<Grid item flex={2}>
				<Typography variant="h6" mb={1}>{skill.name}</Typography>
			</Grid>
			<Grid item flex={1}>
				<Box sx={{ border: "1px solid black", width: "2rem", height: "2rem", display: "flex", justifyContent: "center", alignItems: "center" }}  mb={1} p={1}>{skill.value}</Box>
			</Grid>
			<Popover
				anchorEl={anchorEl}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				transformOrigin={{ vertical: "top", horizontal: "left" }}
				open={open}
				onClose={handleClickClose}
			>
				<Box width={500}>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						{skill.name}
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						{skill.description}
					</Typography>
					<Typography
						id="modal-modal-description"
						variant="subtitle1"
					>
						For information on this skill. Go to page{" "}
						{skill.pageReference}
					</Typography>
				</Box>
			</Popover>
		</Grid>
	);
}
