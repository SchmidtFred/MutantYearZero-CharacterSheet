import React, { useEffect, useState } from "react";
import { getCharacterById } from "../../../Modules/characterManager";
import { useParams } from "react-router-dom";
import CharacterHeader from "./CharacterHeader";
import CharacterAttributes from "./CharacterAttributes/CharacterAttributes";
import CharacterCondition from "./CharacterCondition";
import CharacterSkillsList from "./CharacterSkills/CharacterSkillsList";

export default function CharacterSheet() {
	const [character, setCharacter] = useState({});
	const [xp, setXp] = useState(0);
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
	const [conditionsArray, setConditionsArray] = useState(
		[{starving: false, dehydrated: false, sleepless: false, hypothermic: false}, null,
		0, null,
		"", null]
	);
	//#endregion
	const { id } = useParams();

	const getCharacter = () => {
		getCharacterById(id).then((character) => {
			setCharacter(character);
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
			if (character.criticalInjuries === null)
			{
				setCritInjuries("Add Injuries Here");
			} else {
				setCritInjuries(character.criticalInjuries);
			}
		});
	};

	useEffect(() => {
		getCharacter();
	}, [id]);

	//UseEffect for setting attributes array (arrays like these have their useEffects separate so they properly reference and reflect changes to the state in parent component)
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
			conditionBools, setConditionBools,
			rotPoints, setRotPoints,
			criticalInjuries, setCritInjuries
		]);
	}, [conditionBools, rotPoints, criticalInjuries]);

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
			<CharacterSkillsList skills={character.skills} />
		</>
	);
}
