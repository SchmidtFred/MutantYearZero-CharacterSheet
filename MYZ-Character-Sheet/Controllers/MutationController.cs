using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MYZ_Character_Sheet.Repositories;

namespace MYZ_Character_Sheet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MutationController : ControllerBase
    {
        private readonly IMutationRepository _mutationRepository;
        public MutationController(IMutationRepository mutationRepository)
        {
            _mutationRepository = mutationRepository;
        }

        [HttpGet("RandomMutation")]
        public IActionResult GetByRandom()
        {
            return Ok(_mutationRepository.GetByRandom());
        }
    }
}
