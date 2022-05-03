import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import DetailsPanelCard from "./DetailsPanelCard";

export default function CharacterDen({ denDetails }) {
	const { denDescription, denStash, setDenDescription, setDenStash } = denDetails;

    return (
        <Grid container direction="column">
            <DetailsPanelCard title="Den Description" _string={denDescription} setter={setDenDescription} />
            <DetailsPanelCard title="Den Stash" _string={denStash} setter={setDenStash} />
        </Grid>
    )
}
