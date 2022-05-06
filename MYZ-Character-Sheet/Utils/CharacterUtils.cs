using MYZ_Character_Sheet.Models;
using MYZ_Character_Sheet.Repositories;
using System;

namespace MYZ_Character_Sheet.Utils
{
    public class CharacterUtils
    {
        private readonly ISkillRepository _skillRepository;
        private readonly ITalentRepository _talentRepository;
        public CharacterUtils(ISkillRepository skillRepository, ITalentRepository talentRepository) 
        {
            _skillRepository = skillRepository;
            _talentRepository = talentRepository;
        }


        public bool CharacterMeetsGameRequirements(Character character)
        {
            //check that the character meets requirements
            if (String.IsNullOrWhiteSpace(character.Name))
            {
                return false;
            }
            if (character.RoleId != null && character.RoleId < 0 && character.RoleId > 8) //only 8 roles in this right now
            {
                return false;
            }
            int totalSkillPoints = 0;
            bool specialistSkillHasOnePoint = false;
            bool skillWithTooManyPoints = false;
            Skill specialistSkill = null;
            //run my checks
            character.Skills.ForEach(skill =>
            {
                totalSkillPoints += skill.Value;
                if (skill.Value > 3)
                {
                    skillWithTooManyPoints = true;
                }
                if (skill.RoleId != null && skill.Value > 0)
                {
                    specialistSkillHasOnePoint = true;
                    specialistSkill = skill;
                }
            });
            //only allowed 10 skill points to start and must have a point in their specialist skill and no skill has higher than 3 points
            if (totalSkillPoints != 10 || !specialistSkillHasOnePoint || skillWithTooManyPoints)
            {
                return false;
            }
            //only 13 skills
            if (character.Skills.Count != 13)
            {
                return false;
            }
            //specialist skill matches role
            var skillCheck = _skillRepository.GetById(specialistSkill.Id);
            //make sure value differences doesn't change result of subsequent check
            skillCheck.Value = specialistSkill.Value;
            if (skillCheck.RoleId != character.RoleId || specialistSkill.RoleId != character.RoleId || specialistSkill.Description != skillCheck.Description)
            {
                return false;
            }
            //find total attribute points used
            int attributePointsUsed = character.Strength + character.Agility + character.Wits + character.Empathy;
            //run mutation checks
            //only one mutation unless you have 13 attributePoints
            if (character.Mutations.Count != 1)
            {
                if (character.Mutations.Count == 2)
                {
                    if (attributePointsUsed != 13)
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }
            }
            //run attribute checks
            //only used 14 points
            if (attributePointsUsed > 14)
            {
                return false;
            }
            //only usd 14 points but allowed to use 13 if you have spend it on a second mutation
            if (attributePointsUsed < 14)
            {
                if (character.Mutations.Count != 2)
                {
                    return false;
                }
                if (attributePointsUsed < 13)
                {
                    return false;
                }
            }
            //check against attributes being less than 2
            if (character.Strength < 2 || character.Agility < 2 || character.Wits < 2 || character.Empathy < 2)
            {
                //check if there is a reduced attributed due to second mutation
                if (character.Mutations.Count == 2)
                {
                    //make sure only one is reduced to 1 (meaning only one attribute had been reduced from mutation)
                    int attributesAtOneCount = 0;
                    if (character.Strength < 2)
                    {
                        //not allowed to be 0
                        if (character.Strength < 1)
                        {
                            return false;
                        }
                        attributesAtOneCount++;
                    }
                    if (character.Agility < 2)
                    {
                        if (character.Agility < 1)
                        {
                            return false;
                        }
                        attributesAtOneCount++;
                    }
                    if (character.Wits < 2)
                    {
                        if (character.Wits < 1)
                        {
                            return false;
                        }
                        attributesAtOneCount++;
                    }
                    if (character.Empathy < 2)
                    {
                        if (character.Empathy < 1)
                        {
                            return false;
                        }
                        attributesAtOneCount++;
                    }
                    //only allowe dto have one attribute at one. Or if you have no attributes at one then you have a second mutation without reducing an attribute.
                    if (attributesAtOneCount != 1)
                    {
                        return false;
                    }
                }

                return false;
            }
            //no ability is allowed to be higher than 4 unless they are the key attribute of the role, then they cannot be greater than 5
            if (character.Strength > 4)
            {
                if (character.Role.KeyAttribute == "Strength")
                {
                    if (character.Strength > 5)
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }
            }
            if (character.Agility > 4)
            {
                if (character.Role.KeyAttribute == "Agility")
                {
                    if (character.Agility > 5)
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }
            }
            if (character.Wits > 4)
            {
                if (character.Role.KeyAttribute == "Wits")
                {
                    if (character.Wits > 5)
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }
            }
            if (character.Empathy > 4)
            {
                if (character.Role.KeyAttribute == "Empathy")
                {
                    if (character.Empathy > 5)
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }
            }
            // only one talent, no more no less
            if (character.Talents.Count != 1)
            {
                return false;
            }
            //Talent must be for your role
            Talent talentCheck = _talentRepository.GetById(character.Talents[0].Id);
            if (character.Talents[0].RoleId != character.Role.Id || character.Talents[0].RoleId != talentCheck.RoleId || character.Talents[0].Description != talentCheck.Description)
            {
                return false;
            }

            //if it passes all of these checks return true
            return true;
        }
    }
}
