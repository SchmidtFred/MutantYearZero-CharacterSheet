import React from 'react';
import { Grid } from "@mui/material";
import DetailsPanelCard from './DetailsPanelCard';

export default function CharacterEquipment({ equipmentDetails }) {
    const {weapons, armor, setWeapons, setArmor} = equipmentDetails;
    
    return (
        <Grid container direction="column">
            <DetailsPanelCard title="Armor" _string={armor} setter={setArmor} />
            <DetailsPanelCard title="Weapons" _string={weapons} setter={setWeapons} />
        </Grid>
    )
}