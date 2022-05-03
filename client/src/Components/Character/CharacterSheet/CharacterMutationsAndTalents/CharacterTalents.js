import React from 'react';
import { Stack, Divider, Typography, Box} from "@mui/material";

export default function CharacterTalents({ talents }) {
    return (
        <Box>
            <Typography variant="h5" textAlign="center">Talents</Typography>
            <Stack mt={1} divider={<Divider variant="middle" flexItem />}>
                {talents?.map(tal => {
                    return <Box key={tal.id} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} mb={1}>
                        <Typography variant="h6">{tal.name}</Typography>
                        <Typography variant="body1">Details on Pg. {tal.description}</Typography> 
                    </Box>
                })}
            </Stack>
        </Box>
    )
}