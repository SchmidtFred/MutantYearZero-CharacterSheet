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

        public Skill GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, RoleId, [Name], [Description], PageReference
                          FROM Skill
                         WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    Skill skill = null;

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        skill = new Skill()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            RoleId = DbUtils.GetNullableInt(reader, "RoleId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Description = DbUtils.GetString(reader, "Description"),
                            PageReference = DbUtils.GetInt(reader, "PageReference"),
                            Value = 0
                        };

                    }

                    reader.Close();
                    return skill;
                }
            }
        }

        public void AddCharacterSkills(List<Skill> skills, int characterId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO [CharacterSkill] (SkillId, CharacterId, Value)
                             VALUES (@skillId0, @characterId, @value0)";

                    for (int i = 1; i < skills.Count; i++)
                    {
                        cmd.CommandText += $", (@skillId{i}, @characterId, @value{i})";
                    }

                    for (int i = 0; i < skills.Count; i++)
                    {
                        DbUtils.AddParameter(cmd, $"@skillId{i}", skills[i].Id);
                        DbUtils.AddParameter(cmd, $"@value{i}", skills[i].Value);
                    }

                    DbUtils.AddParameter(cmd, "@characterId", characterId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteCharacterSkills(int characterId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM CharacterSkill WHERE CharacterId = @characterId";
                    DbUtils.AddParameter(cmd, "@characterId", characterId);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
