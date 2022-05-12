import React from "react";
import { Divider, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { theme } from "../../Theme";

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
		<Box
			p={10}
		>
            <Grid
                container
                direction="column"
                alignItems="center"
                spacing={2}
                sx={{backgroundColor: theme.palette.primary.light}}
            >
                <Grid
                    item
                    mb={2}
                    pt={2}
                    pb={2}
                    sx={{
                        backgroundColor: theme.palette.primary.dark,
                        width: "100%",
                        color: "white"
                    }}
                >
                    <Typography textAlign="center" variant="h4">
                        Character Details
                    </Typography>
                </Grid>
                <Grid
                    item
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                >
                    <Grid item>
                        <Box />
                    </Grid>
                    <Grid item width="25%">
                        <Typography variant="body1" flex="1 1 auto">
                            Use these suggestions, choose your own if you prefer
                        </Typography>
                    </Grid>
                </Grid>

                <Divider variant="middle" flexItem sx={{backgroundColor: theme.palette.primary.dark}}/>

                <Grid
                    item
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    wrap="nowrap"
                    mb={2}
                >
                    <TextField
                        defaultValue={name}
                        onBlur={(e) => setName(e.target.value)}
                        label="Character Name"
                        sx={{ width: "25%" }}
                        required
                    />
                    <Typography variant="body1" pr={2}>{role.typicalNames}</Typography>
                </Grid>

                <Divider variant="middle" flexItem sx={{backgroundColor: theme.palette.primary.dark}}/>

                <Grid
                    item
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    wrap="nowrap"
                    mb={2}
                >
                    <TextField
                        sx={{ width: "25%" }}
                        defaultValue={faceAppearance}
                        onBlur={(e) => setFace(e.target.value)}
                        label="Facial Features"
                        multiline
                        rows={3}
                    />
                    <Typography variant="body1" pr={2}>{role.faceSuggest}</Typography>
                </Grid>

                <Divider variant="middle" flexItem sx={{backgroundColor: theme.palette.primary.dark}}/>

                <Grid
                    item
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    wrap="nowrap"
                    mb={2}
                >
                    <TextField
                        defaultValue={bodyAppearance}
                        onBlur={(e) => setBody(e.target.value)}
                        label="Body Appearance"
                        multiline
                        rows={4}
                        sx={{ width: "25%" }}
                    />
                    <Typography variant="body1" pr={2}>{role.bodySuggest}</Typography>
                </Grid>

                <Divider variant="middle" flexItem sx={{backgroundColor: theme.palette.primary.dark}}/>

                <Grid
                    item
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    wrap="nowrap"
                    mb={2}
                >
                    <TextField
                        defaultValue={clothingAppearance}
                        onBlur={(e) => setClothing(e.target.value)}
                        label="Clothing"
                        multiline
                        rows={4}
                        sx={{ width: "25%" }}
                    />
                    <Typography variant="body1" pr={2}>{role.clothingSuggest}</Typography>
                </Grid>
            </Grid>
		</Box>
	);
}
