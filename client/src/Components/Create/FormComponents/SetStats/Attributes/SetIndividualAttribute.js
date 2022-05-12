import React from "react";
import { Box, Typography, Button, ButtonGroup } from "@mui/material";
import { theme } from "../../../../Theme";

export default function SetIndividualAttribute({
	attTitle,
	attribute,
	setAttribute,
	setPoints,
	points,
	keyAttribute,
	chosenReducedAttribute
}) {
	return (
		<Box
			component="div"
			textAlign="center"
			sx={{ backgroundColor: theme.palette.primary.main }}
		>
			<Typography
				component="div"
				variant="h5"
				sx={{
					borderBottom: `1px solid ${theme.palette.primary.dark}`,
					backgroundColor: theme.palette.primary.dark,
					color: "white",
					mb: 1
				}}
			>
				{attTitle}
			</Typography>
			{keyAttribute === attTitle ? (
				<Typography variant="h6">Key Attribute</Typography>
			) : (
				<Typography variant="h6">-----</Typography>
			)}
			<Box
				component={"div"}
			>
				<Box
					sx={{
					width: "4rem",
					height: "4rem",
					margin: "auto",
					p: 1,
					border: `2px solid ${theme.palette.primary.dark}`,
					backgroundColor: theme.palette.primary.light,
                    display: 'flex',
                    justifyContent: 'center', 
                    alignItems: 'center',
                    mt: 2,
                    mb: 2
				}}
				>
					<Typography variant="h5">{attribute}</Typography>
				</Box>
				<ButtonGroup
					size="small"
					orientation="horizontal"
					variant="contained"
                    color='success'
                    sx={{mb: 2}}
				>
					<Button
						onClick={() => {
							if (points < 15) {
								if (attribute - 1 > 1) {
									setAttribute(attribute - 1);
									setPoints(points + 1);
								} else if (
									attTitle === chosenReducedAttribute
								) {
									if (attribute - 1 > 0) {
										setAttribute(attribute - 1);
										setPoints(points + 1);
									}
								}
							}
						}}
					>
						<strong>{"<"}</strong>
					</Button>
					<Button
						onClick={() => {
                            if (points > 0) {
								if (attribute + 1 < 5) {
									setAttribute(attribute + 1);
									setPoints(points - 1);
								} else if (
									attribute + 1 === 5 &&
									keyAttribute === attTitle &&
									chosenReducedAttribute !== attTitle
								) {
									setAttribute(attribute + 1);
									setPoints(points - 1);
								}
							}
						}}
					>
						<strong>{">"}</strong>
					</Button>
				</ButtonGroup>
			</Box>
		</Box>
	);
}
