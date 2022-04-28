using MYZ_Character_Sheet.Models;

namespace MYZ_Character_Sheet.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile profile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
    }
}