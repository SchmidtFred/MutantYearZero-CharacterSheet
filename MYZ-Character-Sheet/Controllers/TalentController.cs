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
    public class TalentController : ControllerBase
    {
        private readonly ITalentRepository _talentRepository;
        public TalentController(ITalentRepository talentRepository)
        {
            _talentRepository = talentRepository;
        }

        [HttpGet("BasicTalents")]
        public IActionResult GetAllBasicTalents()
        {
            return Ok(_talentRepository.GetAllBasicTalents());
        }

        [HttpGet("RoleTalents/{id}")]
        public IActionResult GetAllTalentsByRole(int id)
        {
            return Ok(_talentRepository.GetAllTalentsByRole(id));
        }
    }
}
