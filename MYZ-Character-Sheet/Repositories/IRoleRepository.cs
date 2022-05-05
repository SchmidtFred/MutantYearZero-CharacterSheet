using MYZ_Character_Sheet.Models;
using System.Collections.Generic;

namespace MYZ_Character_Sheet.Repositories
{
    public interface IRoleRepository
    {
        List<Role> GetAll();
    }
}