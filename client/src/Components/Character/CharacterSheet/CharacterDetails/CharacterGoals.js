import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import StringEdit from "../../StringEdit";
import DetailsPanelCard from "./DetailsPanelCard";

export default function CharacterGoals({ goalDetails }) {
	const { protect, hate, dream, setProtect, setHate, setDream } = goalDetails;

    return (
        <Grid container direction="column">
            <DetailsPanelCard title="I Will Protect" _string={protect} setter={setProtect} />
            <DetailsPanelCard title="I Hate" _string={hate} setter={setHate} />
            <DetailsPanelCard title="My Big Dream" _string={dream} setter={setDream} />
        </Grid>
    )
}
