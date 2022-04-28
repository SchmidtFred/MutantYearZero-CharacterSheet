using Microsoft.AspNetCore.Mvc;
using System;
using MYZ_Character_Sheet.Models;
using MYZ_Character_Sheet.Repositories;

namespace MYZ_Character_Sheet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _profileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _profileRepository = userProfileRepository;
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_profileRepository.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var profile = _profileRepository.GetByFirebaseUserId(firebaseUserId);
            if (profile == null)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPost]
        public IActionResult Post(UserProfile profile)
        {
            _profileRepository.Add(profile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = profile.FirebaseUserId },
                profile);
        }
    }
}
