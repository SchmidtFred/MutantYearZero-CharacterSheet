import React from "react";
import { Grid } from "@mui/material";
import DetailsPanelCard from "./DetailsPanelCard";

export default function CharacterAppearance({ appearanceDetails }) {
    const { faceAppearance, bodyAppearance, clothingAppearance, setFace, setBody, setClothing } = appearanceDetails;

    return (
        <Grid container direction="column">
            <DetailsPanelCard title="Face Appearance" _string={faceAppearance} setter={setFace} />
            <DetailsPanelCard title="Body Appearance" _string={bodyAppearance} setter={setBody} />
            <DetailsPanelCard title="Clothing Appearance" _string={clothingAppearance} setter={setClothing} />
        </Grid>
    )
}