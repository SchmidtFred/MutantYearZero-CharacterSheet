using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using MYZ_Character_Sheet.Models;
using MYZ_Character_Sheet.Utils;

namespace MYZ_Character_Sheet.Repositories
{
    public class TalentRepository : BaseRepository, ITalentRepository
    {
        public TalentRepository(IConfiguration configuration) : base(configuration) { }
        public Talent GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, RoleId, [Name], [Description]
                          FROM Talent
                         WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    Talent talent = null;

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        talent = new Talent()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            RoleId = DbUtils.GetNullableInt(reader, "RoleId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Description = DbUtils.GetString(reader, "Description"),
                        };

                    }

                    reader.Close();
                    return talent;
                }
            }
        }

        public List<Talent> GetAllBasicTalents()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, RoleId, [Name], [Description]
                          FROM Talent
                         WHERE RoleId IS NULL";

                    List<Talent> talents = new List<Talent>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        talents.Add(new Talent()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            RoleId = DbUtils.GetNullableInt(reader, "RoleId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Description = DbUtils.GetString(reader, "Description"),
                        });
                    }

                    reader.Close();
                    return talents;
                }
            }
        }

        public List<Talent> GetAllTalentsByRole(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, RoleId, [Name], [Description]
                          FROM Talent
                         WHERE RoleId = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    List<Talent> talents = new List<Talent>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        talents.Add(new Talent()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            RoleId = DbUtils.GetNullableInt(reader, "RoleId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Description = DbUtils.GetString(reader, "Description"),
                        });
                    }

                    reader.Close();
                    return talents;
                }
            }
        }

        public void AddCharacterTalents(List<Talent> talents, int characterId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO [CharacterTalent] (TalentId, CharacterId)
                             VALUES (@talentId0, @characterId)";

                    for (int i = 1; i < talents.Count; i++)
                    {
                        cmd.CommandText += $", (@talentId{i}, @characterId)";
                    }

                    for (int i = 0; i < talents.Count; i++)
                    {
                        DbUtils.AddParameter(cmd, $"@talentId{i}", talents[i].Id);
                    }

                    DbUtils.AddParameter(cmd, "@characterId", characterId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteCharacterTalents(int characterId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM CharacterTalent WHERE CharacterId = @characterId";
                    DbUtils.AddParameter(cmd, "@characterId", characterId);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
