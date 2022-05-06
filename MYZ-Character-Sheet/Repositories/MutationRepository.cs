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
    }
}
