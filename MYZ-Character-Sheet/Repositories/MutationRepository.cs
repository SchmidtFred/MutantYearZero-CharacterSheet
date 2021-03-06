using Microsoft.Extensions.Configuration;
using MYZ_Character_Sheet.Models;
using MYZ_Character_Sheet.Utils;
using System.Collections.Generic;

namespace MYZ_Character_Sheet.Repositories
{
    public class MutationRepository : BaseRepository, IMutationRepository
    {
        public MutationRepository(IConfiguration configuration) : base(configuration) { }

        public Mutation GetByRandom()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                  SELECT TOP 1 Id, Name, Description
                          FROM Mutation
                      ORDER BY NEWID()";

                    Mutation mutation = null;

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        mutation = new Mutation()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Description = DbUtils.GetString(reader, "Description"),
                        };
                    }

                    reader.Close();
                    return mutation;
                }
            }
        }

        public void AddCharacterMutations(List<Mutation> mutations, int characterId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO [CharacterMutation] (MutationId, CharacterId)
                             VALUES (@mutationId0, @characterId)";

                    for (int i = 1; i < mutations.Count; i++)
                    {
                        cmd.CommandText += $", (@mutationId{i}, @characterId)";
                    }

                    for (int i = 0; i < mutations.Count; i++)
                    {
                        DbUtils.AddParameter(cmd, $"@mutationId{i}", mutations[i].Id);
                    }

                    DbUtils.AddParameter(cmd, "@characterId", characterId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteCharacterMutations(int characterId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM CharacterMutation WHERE CharacterId = @characterId";
                    DbUtils.AddParameter(cmd, "@characterId", characterId);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
