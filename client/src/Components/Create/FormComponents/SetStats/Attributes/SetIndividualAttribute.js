import React from 'react';
import { Box, Typography, Button, ButtonGroup } from "@mui/material";

export default function SetIndividualAttribute({ attTitle, attribute, setAttribute, setPoints, points, keyAttribute}) {
    
    return (
        <Box 
        component={"div"}
        textAlign="center"
        sx={[
            { p: 1, border: "1px solid red", width: "75%" }
        ]}>
            <Typography component="div" variant="h6">
				{attTitle}
			</Typography>
            {keyAttribute === attTitle ?
                    <Typography variant="h6">Key Attribute</Typography>
                    : <Typography variant="h6">-----</Typography>}
            <Box component={"div"} sx={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{border: "1px solid black", width: "4rem", height: "4rem", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Typography variant="h5">
                        {attribute}
                    </Typography>
                </Box>
                <ButtonGroup
                    size="small"
                    orientation="vertical"
                    variant="contained"
                >
                    <Button
                        onClick={() => {
                            if (points > 0)
                            {
                                if (attribute + 1 < 5)
                                {
                                    setAttribute(attribute + 1);
                                    setPoints(points - 1);
                                } else if (attribute + 1 === 5 & keyAttribute === attTitle) {
                                    setAttribute(attribute + 1);
                                    setPoints(points - 1);
                                }
                            }
                        }}
                    >
                        <strong>⌃</strong>
                    </Button>
                    <Button
                        onClick={() => {
                            if (points < 15) {
                                if (attribute - 1 > 1) {
                                    setAttribute(attribute - 1);
                                    setPoints(points + 1);
                                }
                            }
                        }}
                    >
                        <strong>⌄</strong>
                    </Button>
                </ButtonGroup>
            </Box>
        </Box>
    )
}