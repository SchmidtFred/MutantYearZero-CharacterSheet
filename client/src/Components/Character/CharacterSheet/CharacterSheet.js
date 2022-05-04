import React, { useEffect, useState } from "react";
import { getCharacterById } from "../../../Modules/characterManager";
import { useParams } from "react-router-dom";
import CharacterHeader from "./CharacterHeader";
import CharacterAttributes from "./CharacterAttributes/CharacterAttributes";
import CharacterCondition from "./CharacterCondition";
import CharacterSkillsList from "./CharacterSkills/CharacterSkillsList";
import CharacterMutations from "./CharacterMutationsAndTalents/CharacterMutations";
import { Grid } from "@mui/material";
import CharacterTalents from "./CharacterMutationsAndTalents/CharacterTalents";
import CharacterDetailsPanel from "./CharacterDetails/CharacterDetailsPanel";

export default function CharacterSheet() {
	const [character, setCharacter] = useState({});
	const [xp, setXp] = useState(0);
	const [mutationPoints, setMp] = useState(0);
	//#region Attributes
	const [strength, setStrength] = useState(0);
	const [agility, setAgility] = useState(0);
	const [wits, setWits] = useState(0);
	const [empathy, setEmpathy] = useState(0);
	const [damage, setDamage] = useState(0);
	const [fatigue, setFatigue] = useState(0);
	const [confusion, setConfusion] = useState(0);
	const [doubt, setDoubt] = useState(0);
	//for use in cleaning up code when passing down state
	const [attributeArray, setAttributeArray] = useState([
		//dummy data for first render
		["", 0, null, "", 0, null],
		["", 0, null, "", 0, null],
		["", 0, null, "", 0, null],
		["", 0, null, "", 0, null]
	]);
	//#endregion
	//#region Conditions
	const [conditionBools, setConditionBools] = useState({
		starving: false,
		dehydrated: false,
		sleepless: false,
		hypothermic: false
	});
	const [rotPoints, setRotPoints] = useState(0);
	const [criticalInjuries, setCritInjuries] = useState("");
	const [conditionsArray, setConditionsArray] = useState([
		{
			starving: false,
			dehydrated: false,
			sleepless: false,
			hypothermic: false
		},
		null,
		0,
		null,
		"",
		null
	]);
	//#endregion
	//#region Details
	//#region Equipment
	const [weapons, setWeapons] = useState("");
	const [armor, setArmor] = useState("");
	//#endregion
	//#region Inventory
	const [gear, setGear] = useState("");
	const [tinyItems, setTinyItems] = useState("");
	//#endregion
	//#region Den
	const [denDescription, setDenDescription] = useState("");
	const [denStash, setDenStash] = useState("");
	//#endregion
	//#region Appearance
	const [faceAppearance, setFace] = useState("");
	const [bodyAppearance, setBody] = useState("");
	const [clothingAppearance, setClothing] = useState("");
	//#endregion
	const [detailsArray, setDetailsArray] = useState([
		{
			weapons: "weapons",
			armor: "armor",
			setWeapons: null,
			setArmor: null
		},
		{
			gear: "gear",
			tinyItems: "tinyItems",
			setGear: null,
			setTinyItems: null
		},
		{
			denDescription: "denDescription",
			denStash: "denStash",
			setDenDescription: null,
			setDenStash: null
		},
		{
			faceAppearance: "faceAppearance",
			bodyAppearance: "bodyAppearance",
			clothingAppearance: "clothingAppearance",
			setFace: null,
			setBody: null,
			setClothing: null
		}
	]);
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
	const { id } = useParams();

	const getCharacter = () => {
		getCharacterById(id).then((character) => {
			setCharacter(character);
			setMp(character.mutationPoints);
			setStrength(character.strength);
			setAgility(character.agility);
			setWits(character.wits);
			setEmpathy(character.empathy);
			setDamage(character.damage);
			setFatigue(character.fatigue);
			setConfusion(character.confusion);
			setDoubt(character.doubt);
			setConditionBools({
				starving: character.starving,
				dehydrated: character.dehydrated,
				sleepless: character.sleepless,
				hypothermic: character.hypothermic
			});
			setRotPoints(character.rotPoints);
			handleNullableStrings(
				character.criticalInjuries,
				setCritInjuries,
				"Injuries"
			);
			handleNullableStrings(character.weapons, setWeapons, "Weapons");
			handleNullableStrings(character.armor, setArmor, "Armor");
			handleNullableStrings(character.gear, setGear, "Gear");
			handleNullableStrings(
				character.tinyItems,
				setTinyItems,
				"Tiny Items"
			);
			handleNullableStrings(
				character.denDescription,
				setDenDescription,
				"Den Description"
			);
			handleNullableStrings(character.denStash, setDenStash, "Den Stash");
			handleNullableStrings(
				character.protect,
				setProtect,
				"Who you want to Protect and Why"
			);
			handleNullableStrings(
				character.hate,
				setHate,
				"Who you Hate and Why"
			);
			handleNullableStrings(character.dream, setDream, "Your Dream");
			handleNullableStrings(
				character.faceAppearance,
				setFace,
				"Your Facial Features"
			);
			handleNullableStrings(
				character.bodyAppearance,
				setBody,
				"Your Body's Description"
			);
			handleNullableStrings(
				character.clothingAppearance,
				setClothing,
				"Your Clothing's Description"
			);
			handleNullableStrings(
				character.pcRelationship1,
				setPcRel1,
				"Relationship"
			);
			handleNullableStrings(
				character.pcRelationship2,
				setPcRel2,
				"Relationship"
			);
			handleNullableStrings(
				character.pcRelationship3,
				setPcRel3,
				"Relationship"
			);
			handleNullableStrings(
				character.pcRelationship4,
				setPcRel4,
				"Relationship"
			);
			setBuddyBools({
				buddy1: character.PcRelationship1Buddy,
				buddy2: character.PcRelationship2Buddy,
				buddy3: character.PcRelationship3Buddy,
				buddy4: character.PcRelationship4Buddy
			});
		});
	};

	//for handling nullable strings when setting character state
	const handleNullableStrings = (string, setter, title) => {
		if (string === null) {
			setter(`Add ${title} Here`);
		} else {
			setter(string);
		}
	};

	useEffect(() => {
		getCharacter();
	}, [id]);

	//UseEffect for setting attributes array
	//(arrays like these have their useEffects separate so they properly reference and reflect changes to the state in parent component)
	useEffect(() => {
		setAttributeArray([
			//attTitle, base, setBase, trTitle, trauma, setTrauma
			["Strength", strength, setStrength, "Damage", damage, setDamage],
			["Agility", agility, setAgility, "Fatigue", fatigue, setFatigue],
			["Wits", wits, setWits, "Confusion", confusion, setConfusion],
			["Empathy", empathy, setEmpathy, "Doubt", doubt, setDoubt]
		]);
	}, [strength, agility, wits, empathy, damage, fatigue, confusion, doubt]);

	//UseEffect for setting conditions array
	useEffect(() => {
		setConditionsArray([
			//conditionBoolsArray{star, deh, sleep, hypo}, setBoolsArray,  rotPoints, setRotPoints, criticalInjuries, setCritInjuries
			conditionBools,
			setConditionBools,
			rotPoints,
			setRotPoints,
			criticalInjuries,
			setCritInjuries
		]);
	}, [conditionBools, rotPoints, criticalInjuries]);

	//UseEffect for setting Details array
	useEffect(() => {
		setDetailsArray([
			//detailsArray [equipmentDetails, gearDetails, denDetails, appearanceDetails]
			{
				weapons: weapons,
				armor: armor,
				setWeapons: setWeapons,
				setArmor: setArmor
			},
			{
				gear: gear,
				tinyItems: tinyItems,
				setGear: setGear,
				setTinyItems: setTinyItems
			},
			{
				denDescription: denDescription,
				denStash: denStash,
				setDenDescription: setDenDescription,
				setDenStash: setDenStash
			},
			{
				faceAppearance: faceAppearance,
				bodyAppearance: bodyAppearance,
				clothingAppearance: clothingAppearance,
				setFace: setFace,
				setBody: setBody,
				setClothing: setClothing
			}
		]);
	}, [
		weapons,
		armor,
		gear,
		tinyItems,
		denDescription,
		denStash,
		faceAppearance,
		bodyAppearance,
		clothingAppearance
	]);

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

	return (
		<>
			<CharacterHeader
				name={character.name}
				role={character.role?.name}
				xp={xp}
				setXp={setXp}
			/>
			<CharacterAttributes attributeArray={attributeArray} />
			<CharacterCondition propArray={conditionsArray} />
			<Grid container>
				<Grid item flex={1}>
					<CharacterSkillsList skills={character.skills} />
				</Grid>
				<Grid item container direction="column" flex={1}>
					<CharacterMutations
						mutations={character.mutations}
						mutationPoints={mutationPoints}
						setMp={setMp}
					/>
					<CharacterTalents talents={character.talents} />
					<CharacterDetailsPanel
						detailsArray={detailsArray}
						personalArray={personalArray}
					/>
				</Grid>
			</Grid>
		</>
	);
}
