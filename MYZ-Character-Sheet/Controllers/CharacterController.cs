using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MYZ_Character_Sheet.Models;
using MYZ_Character_Sheet.Repositories;
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
        public CharacterController(ICharacterRepository characterRepository, IUserProfileRepository userProfileRepository)
        {
            _characterRepository = characterRepository;
            _userProfileRepository = userProfileRepository;
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
                return BadRequest();
            }
            return Ok(character);
        }
        
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
