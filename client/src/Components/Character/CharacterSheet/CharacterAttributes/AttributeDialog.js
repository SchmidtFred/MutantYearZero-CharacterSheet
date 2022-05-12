import React, { useState, useEffect } from "react";
import {
	Dialog,
	Grid,
	DialogTitle,
	Box,
	Typography,
	Button,
	ButtonGroup
} from "@mui/material";
import { theme } from "../../../Theme";

export default function AttributeDialog({
	baseArray,
	traumaArray,
	onClose,
	open,
	keyAttribute
}) {
	const [base, setBase] = useState(0);
	const [trauma, setTrauma] = useState(0);
	const [attTitle, setAttTitle] = useState("");
	const [trTitle, setTrTitle] = useState("");

	useEffect(() => {
		const [_attTitle, _base] = baseArray;
		const [_trTitle, _trauma] = traumaArray;
		setBase(_base);
		setTrauma(_trauma);
		setAttTitle(_attTitle);
		setTrTitle(_trTitle);
	}, [baseArray, traumaArray]);

	const handleClose = () => {
		onClose(base, trauma);
	};

	return (
		<Dialog
			onClose={handleClose}
			open={open}
			fullWidth
			sx={{
				"& .MuiDialog-container": {
					"& .MuiPaper-root": {
						width: "100%",
						maxWidth: "250px"
					}
				}
			}}
		>
			<DialogTitle textAlign="center">{attTitle}</DialogTitle>
			<Grid
				container
				component="div"
				direction="column"
				textAlign="left"
				sx={{ p: 4 }}
				spacing={3}
			>
				<Grid item>
					<Box
						sx={{
							width: "2rem",
							height: "2rem",
							margin: "auto",
							p: 1,
							border: `2px solid ${theme.palette.primary.dark}`,
							backgroundColor: theme.palette.background.default,
							display: "flex",
							justifyContent: "center",
							alignItems: "center"
						}}
					>
						<Typography variant="h4">{base - trauma}</Typography>
					</Box>
				</Grid>
				<Grid item>
					<Box
						alignItems="center"
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between"
						}}
					>
						<Typography id="attributeValue" variant="subtitle1">
							Base: {base}
						</Typography>
						<ButtonGroup
							size="small"
							orientation="vertical"
							variant="contained"
							sx={{height: 40}}
						>
							<Button
								id="attributeValue--Uptick"
								onClick={() => {
									if (base + 1 < 5) {
										setBase(base + 1);
									} else if (
										keyAttribute === attTitle &&
										base + 1 < 6
									) {
										setBase(base + 1);
									}
								}}
								sx={{
									fontSize: "1rem",
									fontWeight: "bold",
									height: "50%"
								}}
							>
								<strong>⌃</strong>
							</Button>
							<Button
								id="attributeValue--Downtick"
								onClick={() => {
									if (base - 1 >= 0) {
										setBase(base - 1);
									}
								}}
								sx={{
									fontSize: "1rem",
									fontWeight: "bold",
									height: "50%"
								}}
							>
								<strong>⌄</strong>
							</Button>
						</ButtonGroup>
					</Box>
				</Grid>
				<Grid item>
					<Box
						alignItems="center"
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between"
						}}
					>
						<Typography id="traumaValue" variant="subtitle1">
							{trTitle}: {trauma}
						</Typography>
						<ButtonGroup
							size="small"
							orientation="vertical"
							variant="contained"
							sx={{height: 40}}
						>
							<Button
								id="traumaValue--Uptick"
								onClick={() => {
									if (trauma + 1 <= base) {
										setTrauma(trauma + 1);
									}
								}}
								sx={{
									fontSize: "1rem",
									fontWeight: "bold",
									height: "50%"
								}}
							>
								<strong>⌃</strong>
							</Button>
							<Button
								id="traumaValue--Downtick"
								onClick={() => {
									if (trauma - 1 >= 0) {
										setTrauma(trauma - 1);
									}
								}}
								sx={{
									fontSize: "1rem",
									fontWeight: "bold",
									height: "50%"
								}}
							>
								<strong>⌄</strong>
							</Button>
						</ButtonGroup>
					</Box>
				</Grid>
			</Grid>
		</Dialog>
	);
}
