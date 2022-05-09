import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import {
	Box,
	Stepper,
	StepButton,
	Step,
	Button,
	Typography
} from "@mui/material";
import ChooseRole from "./FormComponents/ChooseRole";
import { getAllRoles } from "../../Modules/roleManager";
import { getSpecialtiesByRole, createCharacter } from "../../Modules/characterManager";
import SetDetails from "./FormComponents/SetDetails";
import SetInventory from "./FormComponents/SetInventory";
import SetDen from "./FormComponents/SetDen";
import { getAllBasicSkills } from "../../Modules/skillManager";
import SetStats from "./FormComponents/SetStats/SetStats";
import ChooseTalentsAndMutations from "./FormComponents/ChooseTalentsAndMutations";
import SetRelationshipsAndDreams from "./FormComponents/SetRelationshipsAndDreams";
import FinishCharacter from "./FormComponents/FinishCharacter";

const steps = [
	"Role",
	"Character Details",
	"Stats",
	"Talent and Mutation",
	"Relationships and Dream",
	"Inventory",
	"Den",
	"Finish Character"
];

export default function CreateCharacter() {
	const history = useHistory();
	const [activeStep, setActiveStep] = useState(0);
	const [completed, setCompleted] = useState({});
	const [isRoleSelected, setIsRoleSelected] = useState(false);
	const [roles, setRoles] = useState([]);
	const [skills, setSkills] = useState([]);
	const [role, setRole] = useState({});
	//the following two are only set and fetched when a role is decided on
	const [specialistSkill, setSpecialistSkill] = useState({});
	const [startingTalents, setStartingTalents] = useState([]);
	const [chosenTalent, setChosenTalent] = useState({});
	//characters only start with 2 mutations at most, given at random.
	//Randomization will occur at backend to prevent cheating
	const [mutation, setMutation] = useState({});
	const [secondMutation, setSecondMutation] = useState({});
	//#region Character State
	//#region Character Details
	const [name, setName] = useState("");
	const [faceAppearance, setFace] = useState("");
	const [bodyAppearance, setBody] = useState("");
	const [clothingAppearance, setClothing] = useState("");
	//keyAttribute, name, faceApp, bodyApp, clothApp, setName, setFace, setBody, setClothing
	const [detailsArray, setDetailsArray] = useState([
		"",
		"",
		"",
		"",
		"",
		null,
		null,
		null,
		null
	]);
	//#endregion
	//#region Stat Details
	const [strength, setStrength] = useState(2);
	const [agility, setAgility] = useState(2);
	const [wits, setWits] = useState(2);
	const [empathy, setEmpathy] = useState(2);
	const [attributePoints, setAttributePoints] = useState(0);
	const [skillPoints, setSkillPoints] = useState(0);
	const [chosenReducedAttribute, setChosenReducedAttribute] = useState("");
	//role, attributePoints, setAttPoints, strength, agility, wits, empathy, setSt, setAg, setWits, setEmp
	const [attributeArray, setAttributeArray] = useState([
		{},
		0,
		null,
		"",
		"",
		"",
		"",
		null,
		null,
		null,
		null
	]);
	//#region Skills
	const [skill1, setSkill1] = useState({});
	const [skill2, setSkill2] = useState({});
	const [skill3, setSkill3] = useState({});
	const [skill4, setSkill4] = useState({});
	const [skill5, setSkill5] = useState({});
	const [skill6, setSkill6] = useState({});
	const [skill7, setSkill7] = useState({});
	const [skill8, setSkill8] = useState({});
	const [skill9, setSkill9] = useState({});
	const [skill10, setSkill10] = useState({});
	const [skill11, setSkill11] = useState({});
	const [skill12, setSkill12] = useState({});
	//skills, specialistSKill, skillPoints, setSkills, setSpecialistSkill, setSkillpoints
	const [skillArray, setSkillArray] = useState([[], {}, 0, null, null, null]);
	//#endregion
	//#endregion
	//#region Personal
	//#region Relationships
	const [pcRel1, setPcRel1] = useState("");
	const [pcRel2, setPcRel2] = useState("");
	const [pcRel3, setPcRel3] = useState("");
	const [pcRel4, setPcRel4] = useState("");
	const [buddyBools, setBuddyBools] = useState({
		buddy1: false,
		buddy2: false,
		buddy3: false,
		buddy4: false
	});
	//#endregion
	//#region Goals
	const [hate, setHate] = useState("");
	const [protect, setProtect] = useState("");
	const [dream, setDream] = useState("");
	//#endregion
	const [personalArray, setPersonalArray] = useState([]);
	//#endregion
	//#region Inventory Details
	const [weapons, setWeapons] = useState("");
	const [armor, setArmor] = useState("");
	const [gear, setGear] = useState("");
	const [tinyItems, setTinyItems] = useState("");
	//weapons, armor, gear, tinyItems, setWep, setArm, setGear, setTin
	const [inventoryArray, setInventoryArray] = useState([
		"",
		"",
		"",
		"",
		null,
		null,
		null,
		null
	]);
	//#endregion
	//#region Den Details
	const [denDescription, setDenDescription] = useState("");
	const [denStash, setDenStash] = useState("");
	//denDesc, denStash, setDenDesc, setDenStash
	const [denArray, setDenArray] = useState(["", "", null, null]);
	//#endregion
	//#endregion

	//#region Use Effects
	//initialization
	useEffect(() => {
		getAllRoles().then((roles) => setRoles(roles));
		getAllBasicSkills().then((skills) => {
			//#region setting skills
			setSkill1(skills[0]);
			setSkill2(skills[1]);
			setSkill3(skills[2]);
			setSkill4(skills[3]);
			setSkill5(skills[4]);
			setSkill6(skills[5]);
			setSkill7(skills[6]);
			setSkill8(skills[7]);
			setSkill9(skills[8]);
			setSkill10(skills[9]);
			setSkill11(skills[10]);
			setSkill12(skills[11]);
			
			//#endregion
		});
		setAttributePoints(14 - (strength + agility + wits + empathy));
		setSkillPoints(10);
	}, []);

	//details array
	useEffect(() => {
		setDetailsArray([
			role,
			name,
			faceAppearance,
			bodyAppearance,
			clothingAppearance,
			setName,
			setFace,
			setBody,
			setClothing
		]);
	}, [role, name, faceAppearance, bodyAppearance, clothingAppearance]);

	//personal array
	useEffect(() => {
		setPersonalArray([
			{
				pcRel1: pcRel1,
				pcRel2: pcRel2,
				pcRel3: pcRel3,
				pcRel4: pcRel4,
				buddyBools: buddyBools,
				setPcRel1: setPcRel1,
				setPcRel2: setPcRel2,
				setPcRel3: setPcRel3,
				setPcRel4: setPcRel4,
				setBuddyBools: setBuddyBools
			},
			{
				protect: protect,
				hate: hate,
				dream: dream,
				setProtect: setProtect,
				setHate: setHate,
				setDream: setDream
			}
		]);
	}, [protect, hate, dream, pcRel1, pcRel2, pcRel3, pcRel4, buddyBools]);

	//inventory array
	useEffect(() => {
		setInventoryArray([
			weapons,
			armor,
			gear,
			tinyItems,
			setWeapons,
			setArmor,
			setGear,
			setTinyItems
		]);
	}, [weapons, armor, gear, tinyItems]);

	//den array
	useEffect(() => {
		setDenArray([denDescription, denStash, setDenDescription, setDenStash]);
	}, [denDescription, denStash]);

	//attribute array
	useEffect(() => {
		setAttributeArray([
			role.keyAttribute,
			attributePoints,
			setAttributePoints,
			chosenReducedAttribute,
			strength,
			agility,
			wits,
			empathy,
			setStrength,
			setAgility,
			setWits,
			setEmpathy
		]);
	}, [role, strength, agility, wits, empathy, chosenReducedAttribute]);

	//skill array
	useEffect(() => {
		setSkillArray([
			specialistSkill,
			skillPoints,
			setSpecialistSkill,
			setSkillPoints
		]);
	}, [specialistSkill, skillPoints]);

	//#endregion

	//To select a role and grab relevant data
	const selectRole = (role) => {
		setRole(role);
		setIsRoleSelected(true);
		getSpecialtiesByRole(role.id).then((res) => {
			setStartingTalents(res.startingTalents);
			//give the skill the point it starts with
			res.specialistSkill.value = 1;
			setSpecialistSkill(res.specialistSkill);
			//reset skillPoints to accomodate for change in specialistSkill and potential lost points
			setSkillPoints(10);
			for (const skill in skills) {
				if (skill.value > 0) {
					setSkillPoints(skillPoints - skill.value);
				}
			}
			setSkillPoints(skillPoints - res.specialistSkill.value);
			//check to make sure we haven't spent too many points. if so, reset it all.
			//This should never happen unless a user is intentionally trying to break something.
			if (skillPoints < 0) {
				const copy = [...skills];
				for (const skill in copy) {
					skill.value = 0;
				}
				const specialCopy = { ...specialistSkill };
				specialCopy.value = 1;
				setSkillPoints(9);
				window.alert(
					"An error occured which caused us to reset your skill points. Please apply them again."
				);
			}
		});
	};

	const saveCharacter = () => {
		//add skills to a skills array
		const _skills = [skill1, skill2, skill3, skill4, skill5, skill6, skill7, skill8, skill9, skill10, skill11, skill12, specialistSkill];

		//make mutations array
		const _mutations = [mutation];
		if (secondMutation.name) {
			_mutations.push(secondMutation);
		}

		const character = {
			roleId: role.id,
			role: role,
			skills: _skills,
			talents: [chosenTalent],
			mutations: _mutations,
			name: name,
			faceAppearance: faceAppearance,
			bodyAppearance: bodyAppearance,
			clothingAppearance: clothingAppearance,
			strength: strength,
			agility: agility,
			wits: wits,
			empathy: empathy,
			pcRelationship1: pcRel1,
			pcRelationship2: pcRel2,
			pcRelationship3: pcRel3,
			pcRelationship4: pcRel4,
			pcRelationship1Buddy: buddyBools.buddy1,
			pcRelationship2Buddy: buddyBools.buddy2,
			pcRelationship3Buddy: buddyBools.buddy3,
			pcRelationship4Buddy: buddyBools.buddy4,
			hate: hate,
			protect: protect,
			dream: dream,
			weapons: weapons,
			armor: armor,
			gear: gear,
			tinyItems: tinyItems,
			denDescription: denDescription,
			denStash: denStash
		};

		createCharacter(character).then((c) => history.push(`/character/${c.id}`));
	}

	//#region Stepper Logic
	const totalSteps = () => {
		return steps.length;
	};

	const completedSteps = () => {
		return Object.keys(completed).length;
	};

	const isLastStep = () => {
		return activeStep === totalSteps() - 1;
	};

	const allStepsCompleted = () => {
		return completedSteps() === totalSteps();
	};

	const handleNext = () => {
		//only move be able to move oncea role is selected
		if (isRoleSelected) {
			const newActiveStep =
				isLastStep() && !allStepsCompleted()
					? //If it is the last stop, but not all steps have been completed,
					  // find the first step that has been completed
					  steps.findIndex((step, i) => !(i in completed))
					: activeStep + 1;
			setActiveStep(newActiveStep);
		} else {
			window.alert("Select a Role before moving on.");
		}
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleStep = (step) => () => {
		if (isRoleSelected) {
			setActiveStep(step);
		} else {
			window.alert("Select a Role before moving on.");
		}
	};

	//TODO use this to mark when steps are completed by meeting certain criteria
	const handleComplete = () => {
		const newCompleted = completed;
		newCompleted[activeStep] = true;
		setCompleted(newCompleted);
		handleNext();
	};

	const handleReset = () => {
		setActiveStep(0);
		setCompleted({});
	};
	//#endregion

	const FormComponent = () => {
		switch (activeStep) {
			case 0:
				return (
					<ChooseRole
						roles={roles}
						selectedRole={role}
						selectRole={selectRole}
					/>
				);
			case 1:
				return <SetDetails detailsArray={detailsArray} />;
			case 2:
				return (
					<SetStats
						attributeArray={attributeArray}
						skillArray={[[[skill1, skill2, skill3, skill4, skill5, skill6, skill7, skill8, skill9, skill10, skill11, skill12],[setSkill1, setSkill2, setSkill3, setSkill4, setSkill5, setSkill6, setSkill7, setSkill8, setSkill9, setSkill10, setSkill11, setSkill12]],skillArray]}
					/>
				);
			case 3: 
				return (
					<ChooseTalentsAndMutations setMutation={setMutation} mutation={mutation} setSecondMutation={setSecondMutation} secondMutation={secondMutation} startingTalents={startingTalents} chosenTalent={chosenTalent} setChosenTalent={setChosenTalent} attributeArray={attributeArray} setChosenReducedAttribute={setChosenReducedAttribute} />
				);
			case 4:
				return <SetRelationshipsAndDreams personalArray={personalArray} />
			case 5:
				return <SetInventory inventoryArray={inventoryArray} />;
			case 6:
				return <SetDen denArray={denArray} />;
			case 7:
				return <FinishCharacter saveCharacter={saveCharacter} />
			default:
				return (
					<Typography sx={{ mt: 2, mb: 1 }}>
						This is where we will render our form component in a Box
						component
					</Typography>
				);
		}
	};

	return (
		<Box sx={{ width: "100%" }} mt={3}>
			<Stepper nonLinear activeStep={activeStep}>
				{steps.map((label, index) => (
					<Step key={label} completed={completed[index]}>
						<StepButton color="inherit" onClick={handleStep(index)}>
							{label}
						</StepButton>
					</Step>
				))}
			</Stepper>
			<div>
					<>
						<Box>
							<FormComponent />
						</Box>
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								pt: 2
							}}
						>
							<Button
								color="inherit"
								disabled={activeStep === 0}
								onClick={handleBack}
								sx={{ mr: 1 }}
							>
								Back
							</Button>
							<Box sx={{ flex: "1 1 auto" }} />

							<Button onClick={handleNext}>
								{activeStep === steps.length - 1
									? "Finish"
									: "Next"}
							</Button>
							{/* {activeStep !== steps.length &&
								(completed[activeStep] ? (
									<Typography
										variant="caption"
										sx={{ display: "inline-block" }}
									>
										{steps[activeStep]} completed
									</Typography>
								) : (
									<Button onClick={handleComplete}>
										{completedSteps() === totalSteps() - 1
											? "Finish Incomplete Steps"
											: "Complete Step"}
									</Button>
								))} */}
						</Box>
					</>
			</div>
		</Box>
	);
}
