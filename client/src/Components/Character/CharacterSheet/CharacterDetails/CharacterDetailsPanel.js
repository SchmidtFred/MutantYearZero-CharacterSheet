import React, { useState, useEffect } from "react";
import { Tabs, Box, Tab, Typography } from "@mui/material";
import CharacterEquipment from "./CharacterEquipment";
import CharacterInventory from "./CharacterInventory";
import CharacterDen from "./CharacterDen";
import CharacterGoals from "./CharacterGoals";
import CharacterAppearance from "./CharacterAppearance";
import CharacterRelationships from "./CharacterRelationships";
import { theme } from "../../../Theme";

export default function CharacterDetailsPanel({ detailsArray, personalArray }) {	
	const [equipmentDetails, inventoryDetails, denDetails, appearanceDetails] = detailsArray;
	const [ relationshipDetails, goalDetails] = personalArray;
	const [tabState, setState] = useState(0);

	const handleChange = (event, newState) => {
		setState(newState);
	};

	const getTabProps = (index) => {
		return {
			id: `character-details-${index}`,
			"aria-controls": `details-panel-${index}`
		};
	};

	const TabPanel = (props) => {
		const { children, state, index, ...other } = props;
		return (
			<div
				role="tabpanel"
				hidden={state !== index}
				id={`character-details-${index}`}
				aria-labelledby={`details-panel-${index}`}
				{...other}
			>
				{state === index && children}
			</div>
		);
	};

	return (
		<Box mt={2}>
            <Typography pt={2} pb={2} sx={{backgroundColor: theme.palette.primary.dark, color: 'white'}} variant="h5" textAlign="center">Character Details</Typography>
			<Box sx={{ borderBottom: 1, bordercolor: "divider" }}>
				<Tabs
					value={tabState}
					onChange={handleChange}
					aria-label="Character Details"
				>
					<Tab label="Equipment" {...getTabProps(0)} />
					<Tab label="Inventory" {...getTabProps(1)} />
					<Tab label="Relationships" {...getTabProps(2)} />
					<Tab label="Goals" {...getTabProps(3)} />
					<Tab label="Den" {...getTabProps(4)} />
                    <Tab label="Appearance" {...getTabProps(5)} />
				</Tabs>
			</Box>
			<TabPanel state={tabState} index={0}>
				<CharacterEquipment equipmentDetails={equipmentDetails}/>
			</TabPanel>
			<TabPanel state={tabState} index={1}>
				<CharacterInventory inventoryDetails={inventoryDetails} />
			</TabPanel>
			<TabPanel state={tabState} index={2}>
				<CharacterRelationships relationshipDetails={relationshipDetails} />
			</TabPanel>
            <TabPanel state={tabState} index={3}>
                <CharacterGoals goalDetails={goalDetails} />
            </TabPanel>
			<TabPanel state={tabState} index={4}>
                <CharacterDen denDetails={denDetails} />
			</TabPanel>
			<TabPanel state={tabState} index={5}>
				<CharacterAppearance appearanceDetails={appearanceDetails} />
			</TabPanel>
		</Box>
	);
}
