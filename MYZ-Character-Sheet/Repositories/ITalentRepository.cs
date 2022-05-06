using MYZ_Character_Sheet.Models;
using System.Collections.Generic;

namespace MYZ_Character_Sheet.Repositories
{
    public interface ITalentRepository
    {
        void AddCharacterTalents(List<Talent> talents, int characterId);
        Talent GetById(int id);
    }
}