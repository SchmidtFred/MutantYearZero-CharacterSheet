using MYZ_Character_Sheet.Models;
using System.Collections.Generic;

namespace MYZ_Character_Sheet.Repositories
{
    public interface ISkillRepository
    {
        List<Skill> GetAllBasicSkills();
    }
}