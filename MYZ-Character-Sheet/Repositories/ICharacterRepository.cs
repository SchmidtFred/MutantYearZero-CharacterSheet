using MYZ_Character_Sheet.Models;
using System.Collections.Generic;

namespace MYZ_Character_Sheet.Repositories
{
    public interface ICharacterRepository
    {
        List<Character> GetAllByUser(int id);
        Character GetById(int id);
        void Update(Character character);
        TalMutByRole GetTalentMutationByRole(int id);
        void Add(Character character);
    }
}