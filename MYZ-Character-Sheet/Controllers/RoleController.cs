using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MYZ_Character_Sheet.Repositories;

namespace MYZ_Character_Sheet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleRepository _roleRepository;
        public RoleController(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_roleRepository.GetAll());
        }
    }
}
