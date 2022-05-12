import React from "react";
import { Stack, Divider, Typography, Box } from "@mui/material";
import { theme } from "../../../Theme";

export default function CharacterTalents({ talents }) {
	return (
		<Box>
			<Typography
				pt={2}
				pb={2}
				sx={{
					backgroundColor: theme.palette.primary.dark,
					color: "white"
				}}
				variant="h5"
				textAlign="center"
			>
				Talents
			</Typography>
			<Stack mt={1} pl={1} pr={1} sx={{overflowY: 'auto', maxHeight: '10vh'}}>
				{talents?.map((tal) => {
					return (
						<Box
							key={tal.id}
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
                                backgroundColor: theme.palette.primary.light,
								borderBottom: `2px solid ${theme.palette.primary.dark}`,
							}}
						>
							<Typography variant="h6">{tal.name}</Typography>
							<Typography variant="body1">
								Details on Pg. {tal.description}
							</Typography>
						</Box>
					);
				})}
			</Stack>
		</Box>
	);
}
