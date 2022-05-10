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
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle>{attTitle}</DialogTitle>
			<Grid
				container
				component="div"
				direction="column"
				textAlign="left"
				sx={{ p: 1 }}
			>
				<Grid item>
					<Typography variant="h4">{base - trauma}</Typography>
				</Grid>
				<Grid item>
					<Box
						alignItems="center"
						sx={{ display: "flex", flexDirection: "row" }}
					>
						<Typography id="attributeValue" variant="subtitle1">
							Base: {base}
						</Typography>
						<ButtonGroup
							size="small"
							orientation="vertical"
							variant="contained"
						>
							<Button
								id="attributeValue--Uptick"
								onClick={() => {
                                    if (base + 1 < 5)
                                    {
                                        setBase(base + 1)
                                    } else if (keyAttribute === attTitle && base + 1 < 6) {
										setBase(base + 1)
									}
                                }}
							>
								<strong>⌃</strong>
							</Button>
							<Button
								id="attributeValue--Downtick"
								onClick={() => {
                                    if (base - 1 >= 0) {
                                        setBase(base - 1)
                                    }
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
						sx={{ display: "flex", flexDirection: "row" }}
					>
						<Typography id="traumaValue" variant="subtitle1">
							{trTitle}: {trauma}
						</Typography>
						<ButtonGroup
							size="small"
							orientation="vertical"
							variant="contained"
						>
							<Button
								id="traumaValue--Uptick"
								onClick={() => {
                                    if (trauma + 1 <= base)
                                    {
                                        setTrauma(trauma + 1)
                                    }
                                }}
							>
								<strong>⌃</strong>
							</Button>
							<Button
								id="traumaValue--Downtick"
								onClick={() => {
                                    if (trauma - 1 >= 0)
                                    {
                                        setTrauma(trauma - 1)
                                    }
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
