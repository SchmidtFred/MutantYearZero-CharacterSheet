import React, { useState, useEffect } from "react";
import { Grid, Typography, TextField, MenuItem, Box } from "@mui/material";
import { getRandomMutation } from "../../../../Modules/mutationManager";
import {
	getAllBasicTalents,
	getAllTalentsByRole
} from "../../../../Modules/talentManager";
import EditMutationCard from "./EditMutationCard";
import { theme } from "../../../Theme";

export default function EditTalentsAndMutations(props) {
	const { talents, setTalents, mutations, setMutations, role } = props;
	const [basicTalents, setBasicTalents] = useState([]);
	const [roleTalents, setAllRoleTalents] = useState([]);
	const [allAvailableTalents, setAvailableTalents] = useState([]);

	useEffect(() => {
		getAllBasicTalents().then((talents) => setBasicTalents(talents));
		getAllTalentsByRole(role.id).then((talents) =>
			setAllRoleTalents(talents)
		);
	}, [role.id]);

	//this effect combines the other talents array to give us our choices of talents
	useEffect(() => {
		setAvailableTalents(roleTalents.concat(basicTalents));
	}, [basicTalents, roleTalents]);

	const handleTalentChange = (event) => {
		const copy = [...talents];
		const [, stringId] = event.target.name.split("--");
		const id = parseInt(stringId);
		const index = copy.findIndex((t) => t.id === id);
		copy[index] = allAvailableTalents.find(
			(t) => t.id === event.target.value
		);
		setTalents(copy);
	};

	const drawNewMutation = (currentMutationId) => {
		const copy = [...mutations];
		const index = mutations.findIndex((m) => m.id === currentMutationId);
		getRandomMutation().then((newMutation) => {
			copy[index] = newMutation;
			setMutations(copy);
		});
	};

	return (
		<Box p={10}>
			<Typography
				sx={{
					backgroundColor: theme.palette.primary.dark,
					width: "100%",
					color: "white",
					paddingTop: 2,
					paddingBottom: 2
				}}
				textAlign="center"
				variant="h4"
			>
				Your Talents And Mutations
			</Typography>
			<Grid
				container
				direction="row"
				rowSpacing={2}
				m={0}
				backgroundColor={theme.palette.primary.light}
			>
				<Grid container item direction="column" sx={{ flex: 1 }} pb={2}>
					<Grid item textAlign="center" mb={2}>
						<Typography
							variant="h5"
							width="100%"
							backgroundColor={theme.palette.primary.main}
							pt={2}
							pb={2}
						>
							Your Talents
						</Typography>
					</Grid>
					<Grid
						container
						item
						spacing="2"
						direction="column"
						alignContent="center"
					>
						{talents.map((talent) => (
							<Grid
								key={talent.id}
								item
								container
								direction="row"
								sx={{
									display: "flex",
									justifyContent: "space-around",
									flex: 1
								}}
								spacing={4}
								alignItems="center"
							>
								<Grid
									container
									item
									direction="row"
									xs={12}
									lg={6}
								>
									<TextField
										select
										sx={{ flex: 1 }}
										label="Current Talent"
										value={
											allAvailableTalents.length > 0
												? talent.id
												: ""
										}
										defaultValue={""}
										name={`talents--${talent.id}`}
										onChange={handleTalentChange}
										required
										pl={1}
									>
										{allAvailableTalents.map((t) =>
											//only show talents that would duplicate another option. Allow for the current selected talent to stay for reselection
											talents.find(
												(existingTalent) =>
													existingTalent.id === t.id
											) && t.id !== talent.id ? null : (
												<MenuItem
													key={t.id}
													value={t.id}
												>
													{t.name}
												</MenuItem>
											)
										)}
									</TextField>
								</Grid>
								<Grid item>
									<Typography
										variant="body1"
										sx={{ flex: 1 }}
										pr={1}
									>
										See more details at Pg.{" "}
										{talent.description} of the core
										rulebook.
									</Typography>
								</Grid>
							</Grid>
						))}
					</Grid>
				</Grid>
				<Grid container direction="column" sx={{ flex: 1 }}>
					<Grid container direction="column" sx={{ flex: 1 }}>
						<Grid item textAlign="center" mb={2}>
							<Typography
								variant="h5"
								width="100%"
								backgroundColor={theme.palette.primary.main}
								pt={2}
								pb={2}
                                mb={1}
							>
								Your Mutations
							</Typography>
							<Typography variant="body1">
								These are inalterable. You must learn to make
								the most of the mutation you've got, even if you
								would have preferred another. No one chooses
								what they are born with.
							</Typography>
						</Grid>
					</Grid>
					<Grid
						container
						item
						spacing="2"
						direction="column"
						alignContent="center"
                        p={1}
					>
						{mutations.map((mutation) => (
							<EditMutationCard
								key={mutation.id}
								drawNewMutation={drawNewMutation}
								mutation={mutation}
							/>
						))}
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
}
