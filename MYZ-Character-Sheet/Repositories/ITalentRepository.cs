using MYZ_Character_Sheet.Models;
using System.Collections.Generic;

namespace MYZ_Character_Sheet.Repositories
{
    public interface ITalentRepository
    {
        void AddCharacterTalents(List<Talent> talents, int characterId);
        List<Talent> GetAllBasicTalents();
        List<Talent> GetAllTalentsByRole(int id);
        Talent GetById(int id);
        void DeleteCharacterTalents(int characterId);
    }
}