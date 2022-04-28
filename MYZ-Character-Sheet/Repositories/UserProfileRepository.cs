using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using MYZ_Character_Sheet.Models;
using MYZ_Character_Sheet.Utils;

namespace MYZ_Character_Sheet.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, FirebaseUserId, DisplayName, Email
                          FROM UserProfile
                         WHERE FirebaseUserId = @firebaseUserId";

                    DbUtils.AddParameter(cmd, "@firebaseUserId", firebaseUserId);

                    UserProfile profile = null;

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        profile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email")
                        };
                    }

                    reader.Close();

                    return profile;
                }
            }
        }

        public void Add(UserProfile profile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FirebaseUserId, DisplayName, Email)
                                        OUTPUT INSERTED.Id
                                        VALUES (@firebaseUserId, @displayName, @email)";

                    DbUtils.AddParameter(cmd, "@firebaseUserId", profile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@displayName", profile.DisplayName);
                    DbUtils.AddParameter(cmd, "@email", profile.Email);

                    profile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
