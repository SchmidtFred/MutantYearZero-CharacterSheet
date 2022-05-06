using MYZ_Character_Sheet.Models;

namespace MYZ_Character_Sheet.Repositories
{
    public interface IMutationRepository
    {
        Mutation GetByRandom();
    }
}