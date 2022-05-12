import React from "react";
import { Divider, Grid, TextField, Typography, Box } from "@mui/material";
import { theme } from "../../Theme";

export default function SetInventory({ inventoryArray }) {
	const [
		weapons,
		armor,
		gear,
		tinyItems,
		setWeapons,
		setArmor,
		setGear,
		setTinyItems
	] = inventoryArray;

	return (
		<Box p={10}>
			<Grid
				container
				direction="column"
				alignItems="center"
				spacing={2}
				sx={{ backgroundColor: theme.palette.primary.light }}
			>
				<Grid
					item
					pt={2}
					pb={2}
					sx={{
						backgroundColor: theme.palette.primary.dark,
						width: "100%",
						color: "white"
					}}
				>
					<Typography textAlign="center" variant="h4">
						Your Starting Inventory
					</Typography>
				</Grid>
				<Grid item textAlign="center"  width="100%" backgroundColor={theme.palette.primary.main} pt={2} pb={2}>
					<Typography variant="body1">
						Refer to the core rule book for details on what starting
						gear looks like for your chosen role.
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
						defaultValue={weapons}
						onBlur={(e) => setWeapons(e.target.value)}
						label="Weapons"
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
						defaultValue={armor}
						onBlur={(e) => setArmor(e.target.value)}
						label="Armor"
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
						defaultValue={gear}
						onBlur={(e) => setGear(e.target.value)}
						label="Gear"
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
						defaultValue={tinyItems}
						onBlur={(e) => setTinyItems(e.target.value)}
						label="Tiny Items"
						sx={{ width: "100%" }}
						multiline
						rows={2}
					/>
				</Grid>

			</Grid>
		</Box>
	);
}
