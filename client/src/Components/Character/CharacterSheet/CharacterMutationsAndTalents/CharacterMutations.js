import React from 'react';
import { Stack, Divider, Typography, Box, Button, ButtonGroup } from "@mui/material";

export default function CharacterMutations({ mutations, mutationPoints, setMp }) {

    const incrementRp = (event) => {
		if (event.currentTarget.id == "mpUptick") {
			setMp(mutationPoints + 1);
		} else {
			if (mutationPoints > 0) {
				setMp(mutationPoints - 1);
			}
		}
	};

    return (
        <Box mt={2}>
            <Typography variant="h5" textAlign="center">Mutations</Typography>
            <Box
					alignItems="center"
					sx={{ display: "flex", flexDirection: "row" }}
				>
					<Typography mr={3}>Mutation Points: {mutationPoints}</Typography>
					<ButtonGroup
						size="small"
						orientation="vertical"
						variant="contained"
					>
						<Button id="mpUptick" onClick={incrementRp}>
							⌃
						</Button>
						<Button id="mpDowntick" onClick={incrementRp}>
							⌄
						</Button>
					</ButtonGroup>
			</Box>
            <Stack mt={1} divider={<Divider variant="middle" flexItem />}>
                {mutations?.map(mut => {
                return <Box key={mut.id} sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}} mb={1}>
                    <Typography variant="h6">{mut.name}</Typography>
                    <Typography variant="body1">Details on Pg. {mut.description}</Typography>
                </Box>})}
            </Stack>
        </Box>
    )
}