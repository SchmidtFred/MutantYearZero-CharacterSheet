import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import AttributeDialog from "./AttributeDialog";

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
				{ p: 1, border: "1px solid red" },
				{ "&:hover": { cursor: "pointer" } }
			]}
			onClick={handleClickOpen}
		>
			<Typography component="div" variant="h5">
				{attTitle}
			</Typography>
			<Box sx={{ p: 1, border: "1px solid black" }}>
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
