import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import AttributeDialog from "./AttributeDialog";
import { theme } from "../../../Theme";

export default function Attribute({ propArray, keyAttribute }) {
    const [attTitle, base, setBase, trTitle, trauma, setTrauma] = propArray;
	const [open, setOpen] = useState(false);


	const handleClickOpen = () => {
		if (!open) {
			setOpen(true);
		}
	};

	const handleClickClose = (newBase, newTrauma) => {
		if (newTrauma !== trauma || newBase !== base) {
			setBase(newBase);
			setTrauma(newTrauma);
		}
		setOpen(false);
	};

	return (
		<Box
			component="div"
			textAlign="center"
			sx={[
				{ backgroundColor: theme.palette.primary.main},
				{ "&:hover": { cursor: "pointer" } }
			]}
			onClick={handleClickOpen}
		>
			<Typography component="div" variant="h5" sx={{borderBottom: `1px solid ${theme.palette.primary.dark}`, backgroundColor: theme.palette.primary.dark, color: 'white', mb: 1}}>
				{attTitle}
			</Typography>
			<Box sx={{ width: '2rem', height: '2rem', margin: 'auto', p: 1, border: `2px solid ${theme.palette.primary.dark}`, backgroundColor: theme.palette.primary.light}}>
				<Typography variant="h5">
					{base ? base - trauma : ""}
				</Typography>
			</Box>
			<Typography variant="h7">Base: {base}</Typography>
			<Typography variant="h6">
				{trTitle}: {trauma}
			</Typography>
			<AttributeDialog
				baseArray={[attTitle, base]}
				traumaArray={[trTitle, trauma]}
				onClose={handleClickClose}
				open={open}
				keyAttribute={keyAttribute}
			/>
		</Box>
	);
}
