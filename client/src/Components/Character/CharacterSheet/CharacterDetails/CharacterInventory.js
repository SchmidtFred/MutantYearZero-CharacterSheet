import React from "react";
import { Grid } from "@mui/material";
import DetailsPanelCard from "./DetailsPanelCard";

export default function CharacterInventory({ inventoryDetails }) {
	const { gear, tinyItems, setGear, setTinyItems } = inventoryDetails;

	return (
		<Grid container direction="column">
			<DetailsPanelCard title="Gear" _string={gear} setter={setGear} />
            <DetailsPanelCard title="Tiny Items" _string={tinyItems} setter={setTinyItems} />
		</Grid>
	);
}
