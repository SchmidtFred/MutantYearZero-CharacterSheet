using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MYZ_Character_Sheet.Repositories;

namespace MYZ_Character_Sheet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkillController : ControllerBase
    {
        private readonly ISkillRepository _skillRepository;
        public SkillController(ISkillRepository skillRepository)
        {
            _skillRepository = skillRepository;
        }

        [HttpGet("Basic")]
        public IActionResult GetAllBasicSkills()
        {
            return Ok(_skillRepository.GetAllBasicSkills());
        }
    }
}
