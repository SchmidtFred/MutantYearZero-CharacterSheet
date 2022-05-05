using Microsoft.Extensions.Configuration;
using MYZ_Character_Sheet.Models;
using MYZ_Character_Sheet.Utils;
using System.Collections.Generic;

namespace MYZ_Character_Sheet.Repositories
{
    public class RoleRepository : BaseRepository, IRoleRepository
    {
        public RoleRepository(IConfiguration configuration) : base(configuration) { }

        public List<Role> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Name, Description, KeyAttribute, 
                                   TypicalNames, FaceSuggest, BodySuggest, 
                                   ClothingSuggest, ImageLocation
                          FROM Role";

                    List<Role> roles = new List<Role>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        roles.Add(new Role()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Description = DbUtils.GetString(reader, "Description"),
                            KeyAttribute = DbUtils.GetString(reader, "KeyAttribute"),
                            TypicalNames = DbUtils.GetString(reader, "TypicalNames"),
                            FaceSuggest = DbUtils.GetString(reader, "FaceSuggest"),
                            BodySuggest = DbUtils.GetString(reader, "BodySuggest"),
                            ClothingSuggest = DbUtils.GetString(reader, "ClothingSuggest"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation")
                        });
                    }

                    reader.Close();
                    return roles;
                }
            }
        }
    }
}
