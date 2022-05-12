import React from "react";
import { Grid, Typography, Button, Stack, Divider } from "@mui/material";
import { theme } from "../../Theme";

export default function ChooseRole({ roles, selectedRole, selectRole }) {
	const handleRoleSelection = (id) => {
		selectRole(roles.find((r) => r.id === id));
	};

	return (
		<Grid container p={10}>
			<Grid
				item
				pb={2}
				pt={2}
				sx={{
					backgroundColor: theme.palette.primary.dark,
					width: "100%",
					color: "white"
				}}
			>
				<Typography variant="h4" textAlign="center">
					Choose Your Role
				</Typography>
			</Grid>
			<Grid item sx={{ backgroundColor: theme.palette.primary.light }}>
				<Stack divider={<Divider variant="middle" flexItem />}>
					{roles.map((role) => {
						return (
							<Grid
								container
								key={role.id}
								direction="column"
								border={
									selectedRole.id === role.id
										? `3px solid ${theme.palette.primary.dark}`
										: ""
								}
								spacing={0}
							>
								<Grid item>
									<Typography
										variant="h5"
										sx={{
											backgroundColor:
												theme.palette.primary.main
										}}
										p={1}
										textAlign="center"
									>
										{role.name}
									</Typography>
									<Typography variant="subtitle1" p={1}>
										Key Attribute: {role.keyAttribute}
									</Typography>
								</Grid>
								<Grid item>
									<Typography variant="body1" p={1}>
										{role.description}
									</Typography>
								</Grid>
								<Grid item textAlign="center" mb={1}>
									<Button
										variant="contained"
										onClick={() =>
											handleRoleSelection(role.id)
										}
									>
										{selectedRole.id === role.id
											? "Selected"
											: `Select ${role.name}`}
									</Button>
								</Grid>
							</Grid>
						);
					})}
				</Stack>
			</Grid>
		</Grid>
	);
}
