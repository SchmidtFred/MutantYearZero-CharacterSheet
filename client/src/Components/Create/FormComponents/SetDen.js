import React from "react";
import { Divider, Grid, TextField, Typography, Box } from "@mui/material";
import { theme } from "../../Theme";

export default function SetDen({ denArray }) {
	const [denDescription, denStash, setDenDescription, setDenStash] = denArray;

	return (
		<Box p={10}>
			<Grid
				container
				direction="column"
				alignItems="center"
				spacing={2}
				sx={{ backgroundColor: theme.palette.primary.light }}
			>
				<Grid item pt={2}
					pb={2}
					sx={{
						backgroundColor: theme.palette.primary.dark,
						width: "100%",
						color: "white"
					}}>
					<Typography textAlign="center" variant="h4">
						Your Den
					</Typography>
				</Grid>
				<Grid item textAlign="center" width="100%" backgroundColor={theme.palette.primary.main} pt={2} pb={2}>
					<Typography variant="body1">
						Refer to the core rule book for suggestions
					</Typography>
				</Grid>

				<Grid
					item
					container
					justifyContent="space-between"
					alignItems="center"
					wrap="nowrap"
                    p={2}
				>
					<TextField
						defaultValue={denDescription}
						onBlur={(e) => setDenDescription(e.target.value)}
						label="Den Description"
						sx={{ width: "100%" }}
						multiline
						rows={2}
					/>
				</Grid>

				<Divider variant="middle" flexItem sx={{backgroundColor: theme.palette.primary.dark}}/>

				<Grid
					item
					container
					justifyContent="space-between"
					alignItems="center"
					wrap="nowrap"
                    p={2}
				>
					<TextField
						defaultValue={denStash}
						onBlur={(e) => setDenStash(e.target.value)}
						label="Den Stash"
						sx={{ width: "100%" }}
						multiline
						rows={2}
					/>
				</Grid>

			</Grid>
		</Box>
	);
}
