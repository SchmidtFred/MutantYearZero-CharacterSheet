using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using MYZ_Character_Sheet.Models;
using MYZ_Character_Sheet.Utils;

namespace MYZ_Character_Sheet.Repositories
{
    public class SkillRepository : BaseRepository, ISkillRepository
    {
        public SkillRepository(IConfiguration configuration) : base(configuration) { }

        public List<Skill> GetAllBasicSkills()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, RoleId, [Name], [Description], PageReference
                          FROM Skill
                         WHERE RoleId IS NULL";

                    List<Skill> skills = new List<Skill>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        skills.Add(new Skill()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            RoleId = DbUtils.GetNullableInt(reader, "RoleId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Description = DbUtils.GetString(reader, "Description"),
                            PageReference = DbUtils.GetInt(reader, "PageReference"),
                            Value = 0
                        });

                    }

                    reader.Close();
                    return skills;
                }
            }
        }
    }
}
