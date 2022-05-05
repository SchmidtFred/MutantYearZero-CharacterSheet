import React from "react";
import { Divider, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function SetDetails({ detailsArray }) {
	const [
        role,
		name,
		faceAppearance,
		bodyAppearance,
		clothingAppearance,
		setName,
		setFace,
		setBody,
		setClothing
	] = detailsArray;

	return (
		<Grid container direction="column" alignContent="space" alignItems="center" p={10} spacing={2} >
            <Grid item container justifyContent="space-between" alignItems="center" mb={2}>
                <Grid item>
                    <Box  />
                </Grid>
                <Grid item width="25%">
                    <Typography variant="body1" flex="1 1 auto">Use these suggestions, choose your own if you prefer</Typography>
                </Grid>
            </Grid>


            <Divider variant="middle" flexItem />

			<Grid item container justifyContent="space-between" alignItems="center" noWrap mb={2}>
                <TextField
                    defaultValue={name}
                    onBlur={(e) => setName(e.target.value)}
                    label="Character Name"
                    sx={{width: "25%"}}
                    required
                />
                <Typography  variant="body1">{role.typicalNames}</Typography>
			</Grid>

            <Divider variant="middle" flexItem />

			<Grid item container justifyContent="space-between" alignItems="center" noWrap mb={2}>
                <TextField
                    sx={{width: "25%"}}
                    defaultValue={faceAppearance}
                    onBlur={(e) => setFace(e.target.value)}
                    label="Facial Features"
                    multiline
                    rows={3}
                />
                <Typography  variant="body1">{role.faceSuggest}</Typography>
			</Grid>

            <Divider variant="middle" flexItem />

            <Grid item container justifyContent="space-between" alignItems="center" noWrap mb={2}>
                <TextField
                    defaultValue={bodyAppearance}
                    onBlur={(e) => setBody(e.target.value)}
                    label="Body Appearance"
                    multiline
                    rows={4}
                    sx={{width: "25%"}}
                />
                <Typography  variant="body1">{role.bodySuggest}</Typography>
			</Grid>

            <Divider variant="middle" flexItem />

            <Grid item container justifyContent="space-between" alignItems="center" noWrap mb={2}>
                <TextField
                    defaultValue={clothingAppearance}
                    onBlur={(e) => setClothing(e.target.value)}
                    label="Clothing"
                    multiline
                    rows={4}
                    sx={{width: "25%"}}
                />
                <Typography  variant="body1">{role.clothingSuggest}</Typography>
			</Grid>

            <Divider variant="middle" flexItem />
		</Grid>
	);
}
