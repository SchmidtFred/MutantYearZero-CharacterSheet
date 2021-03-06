import React from "react";
import { Grid, FormControlLabel, Checkbox } from "@mui/material";
import DetailsPanelCard from "./DetailsPanelCard";

export default function CharacterRelationships({ relationshipDetails }) {
	const
		{
			pcRel1,
			pcRel2,
			pcRel3,
			pcRel4,
            buddyBools,
			setPcRel1,
			setPcRel2,
			setPcRel3,
			setPcRel4,
            setBuddyBools
		} = relationshipDetails;

    const handleBuddyChange = (event) => {
		const copy = { ...buddyBools };
		copy[event.target.name] = event.target.checked;
		setBuddyBools(copy);
	};

    return (
        <Grid container direction="column">
            <Grid item container direction="row" wrap="nowrap">
				<Grid item xs={10}>
                	<DetailsPanelCard title="PC Relationship 1" _string={pcRel1} setter={setPcRel1} justifyContent="space-between" />
				</Grid>
				<Grid item xs={2}>
					<FormControlLabel
							control={
								<Checkbox
									checked={buddyBools.buddy1}
									onChange={handleBuddyChange}
									name="buddy1"
									color="success"
								/>
							}
							label="Buddy"
						/>
				</Grid>
            </Grid>
            <Grid item container direction="row" wrap="nowrap">
				<Grid item xs={10}>
                	<DetailsPanelCard title="PC Relationship 2" _string={pcRel2} setter={setPcRel2} justifyContent="space-between" />
				</Grid>
				<Grid item xs={2}>	
                	<FormControlLabel
						control={
							<Checkbox
								checked={buddyBools.buddy2 ? buddyBools.buddy2 : false}
								onChange={handleBuddyChange}
								name="buddy2"
								color="success"
							/>
						}
						label="Buddy"
					/>
				</Grid>
            </Grid>
            <Grid item container direction="row" wrap="nowrap">
				<Grid item xs={10}>
                	<DetailsPanelCard title="PC Relationship 3" _string={pcRel3} setter={setPcRel3} justifyContent="space-between"/>
				</Grid>
				<Grid item xs={2}>
					<FormControlLabel
						control={
							<Checkbox
								checked={buddyBools.buddy3 ? buddyBools.buddy3 : false}
								onChange={handleBuddyChange}
								name="buddy3"
								color="success"
							/>
						}
						label="Buddy"
					/>
				</Grid>
            </Grid>
            <Grid item container direction="row" justifyContent="space-between" wrap="nowrap">
				<Grid item xs={10}>
                	<DetailsPanelCard title="PC Relationship 4" _string={pcRel4} setter={setPcRel4} />
				</Grid>
				<Grid item xs={2}>
					<FormControlLabel
						control={
							<Checkbox
								checked={buddyBools.buddy4 ? buddyBools.buddy4 : false}
								onChange={handleBuddyChange}
								name="buddy4"
								color="success"
							/>
						}
						label="Buddy"
					/>
				</Grid>
            </Grid>
        </Grid>
    )
}
