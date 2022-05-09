using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MYZ_Character_Sheet.Models;
using MYZ_Character_Sheet.Repositories;
using MYZ_Character_Sheet.Utils;
using System;
using System.Security.Claims;

namespace MYZ_Character_Sheet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CharacterController : ControllerBase
    {
        private readonly ICharacterRepository _characterRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly ISkillRepository _skillRepository;
        private readonly IMutationRepository _mutationRepository;
        private readonly ITalentRepository _talentRepository;
        public CharacterController(ICharacterRepository characterRepository, IUserProfileRepository userProfileRepository, ISkillRepository skillRepository, IMutationRepository mutationRepository, ITalentRepository talentRepository)
        {
            _characterRepository = characterRepository;
            _userProfileRepository = userProfileRepository;
            _skillRepository = skillRepository;
            _mutationRepository = mutationRepository;
            _talentRepository = talentRepository;
        }

        [HttpGet("MyCharacters")]
        public IActionResult GetByCurrentUser()
        {
            var profile = GetCurrentUserProfile();
            if (profile == null)
            {
                return NotFound();
            }
            return Ok(_characterRepository.GetAllByUser(profile.Id));
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var profile = GetCurrentUserProfile();
            if (profile == null)
            {
                return NotFound();
            }
            var character = _characterRepository.GetById(id);
            if (character == null)
            {
                return NotFound();
            }
            if (character.UserProfileId != profile.Id)
            {
                return Unauthorized();
            }
            return Ok(character);
        }

        [HttpGet("RoleSpecialties/{id}")]
        public IActionResult GetSpecialtiesByRoleId(int id)
        {
            return Ok(_characterRepository.GetTalentMutationByRole(id));
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Character character)
        {
            if (id != character.Id)
            {
                return BadRequest();
            }
            var profile = GetCurrentUserProfile();
            if (profile == null)
            {
                return NotFound();
            }
            if (character.UserProfileId != profile.Id)
            {
                return Unauthorized();
            }

            _characterRepository.Update(character);

            //Skills
            _skillRepository.DeleteCharacterSkills(character.Id);
            _skillRepository.AddCharacterSkills(character.Skills, character.Id);

            //Talents
            _talentRepository.DeleteCharacterTalents(character.Id);
            _talentRepository.AddCharacterTalents(character.Talents, character.Id);

            //Mutations
            _mutationRepository.DeleteCharacterMutations(character.Id);
            _mutationRepository.AddCharacterMutations(character.Mutations, character.Id);
            return NoContent();
        }


        [HttpPost]
        public IActionResult Post(Character character)
        {
            //make sure it meets requirements
            var utils = new CharacterUtils(_skillRepository, _talentRepository);
            if (!utils.CharacterMeetsGameRequirements(character))
            {
                return BadRequest();
            }
            //give it necessary variables
            var profile = GetCurrentUserProfile();
            character.UserProfileId = profile.Id;

            //post character to database
            _characterRepository.Add(character);

            //post skills to database
            _skillRepository.AddCharacterSkills(character.Skills, character.Id);

            //post mutations to database
            _mutationRepository.AddCharacterMutations(character.Mutations, character.Id);

            //post talents to database
            _talentRepository.AddCharacterTalents(character.Talents, character.Id);

            return CreatedAtAction("GetById", new { id = character.Id }, character);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _characterRepository.Delete(id);
            return NoContent();
        }
    }
}
