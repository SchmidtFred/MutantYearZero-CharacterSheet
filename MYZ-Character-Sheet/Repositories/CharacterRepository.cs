using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using MYZ_Character_Sheet.Models;
using MYZ_Character_Sheet.Utils;

namespace MYZ_Character_Sheet.Repositories
{
    public class CharacterRepository : BaseRepository, ICharacterRepository
    {
        public CharacterRepository(IConfiguration configuration) : base(configuration) { }

        public List<Character> GetAllByUser(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                           SELECT c.Id, c.Name AS CharacterName, c.RoleId, r.Name AS RoleName
                             FROM Character c
                                  Left Join Role r ON c.RoleId = r.Id
                            WHERE c.UserProfileId = @id
                         ORDER BY c.Name";

                    DbUtils.AddParameter(cmd, "@id", id);

                    List<Character> characters = new List<Character>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        characters.Add(new Character()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "CharacterName"),
                            RoleId = DbUtils.GetNullableInt(reader, "RoleId"),
                            Role = new Role()
                            {
                                Name = DbUtils.GetNullableString(reader, "RoleName")
                            }
                        });
                    }

                    reader.Close();
                    return characters;
                }
            }
        }

        public Character GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = _queryString + " WHERE c.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    Character character = null;

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        if (character == null)
                        {
                            character = NewCharacterFromReader(reader);
                        }

                        if (DbUtils.IsNotDbNull(reader, "MutationId"))
                        {
                            int mutationId = DbUtils.GetInt(reader, "MutationId");
                            var existingMutation = character.Mutations.FirstOrDefault(m => m.Id == mutationId);
                            //only add mutation if it does not exist on this character
                            if (existingMutation == null)
                            {
                                character.Mutations.Add(NewMutationFromReader(reader));
                            }
                        }

                        if (DbUtils.IsNotDbNull(reader, "TalentId"))
                        {
                            int talentId = DbUtils.GetInt(reader, "TalentId");
                            var existingTalent = character.Talents.FirstOrDefault(t => t.Id == talentId);
                            if (existingTalent == null)
                            {
                                character.Talents.Add(NewTalentFromReader(reader));
                            }
                        }

                        if (DbUtils.IsNotDbNull(reader, "SkillId"))
                        {
                            int skillId = DbUtils.GetInt(reader, "SkillId");
                            var existingSkill = character.Skills.FirstOrDefault(s => s.Id == skillId);
                            if (existingSkill == null)
                            {
                                character.Skills.Add(NewSkillFromReader(reader));
                            }
                        }
                    }

                    reader.Close();
                    return character;
                }
            }
        }

        public TalMutByRole GetTalentMutationByRole(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT t.Id AS TalentId, t.RoleId, t.Name AS TalentName, t.Description AS TalentDescription, s.Id AS SkillId, s.Name AS SkillName, s.Description AS SkillDescription, s.PageReference
                        FROM Talent t
                             LEFT JOIN Skill s ON s.RoleId = t.RoleId
                       WHERE t.RoleId = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    TalMutByRole model = new TalMutByRole()
                    {
                        StartingTalents = new List<Talent>(),
                        SpecialistSkill = null
                    };


                    var reader = cmd.ExecuteReader();

                    while(reader.Read())
                    {
                        if (model.SpecialistSkill == null)
                        {
                            model.SpecialistSkill = new Skill()
                            {
                                Id = DbUtils.GetInt(reader, "SkillId"),
                                RoleId = DbUtils.GetNullableInt(reader, "RoleId"),
                                Name = DbUtils.GetString(reader, "SkillName"),
                                Description = DbUtils.GetString(reader, "SkillDescription"),
                                PageReference = DbUtils.GetInt(reader, "PageReference")
                            };
                        }

                        model.StartingTalents.Add(new Talent()
                        {
                            Id = DbUtils.GetInt(reader, "TalentId"),
                            RoleId = DbUtils.GetNullableInt(reader, "RoleId"),
                            Name = DbUtils.GetString(reader, "TalentName"),
                            Description = DbUtils.GetString(reader, "TalentDescription"),
                        });
                    }

                    reader.Close();

                    return model;
                }
            }
        }

        public void Update(Character character)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Character
                           SET [Public] = @public,
                               RoleId = @roleId,
                               [Name] = @name,
                               ExperiencePoints = @experiencePoints,
                               FaceAppearance = @faceAppearance,
                               BodyAppearance = @bodyAppearance,
                               ClothingAppearance = @clothingAppearance,
                               Strength = @strength,
                               Agility = @agility,
                               Wits = @wits,
                               Empathy = @empathy,
                               Damage = @damage,
                               Fatigue = @fatigue,
                               Confusion = @confusion,
                               Doubt = @doubt,
                               Starving = @starving,
                               Dehydrated = @dehydrated,
                               Sleepless = @sleepless,
                               Hypothermic = @hypothermic,
                               CriticalInjuries = @criticalInjuries,
                               RotPoints = @rotPoints,
                               MutationPoints = @mutationPoints,
                               Armor = @armor,
                               Gear = @gear,
                               TinyItems = @tinyItems,
                               Weapons = @weapons,
                               PcRelationship1 = @pcRelationship1,
                               PcRelationship2 = @pcRelationship2,
                               PcRelationship3 = @pcRelationship3,
                               PcRelationship4 = @pcRelationship4,
                               PcRelationship1Buddy = @pcRelationship1Buddy,
                               PcRelationship2Buddy = @pcRelationship2Buddy,
                               PcRelationship3Buddy = @pcRelationship3Buddy,
                               PcRelationship4Buddy = @pcRelationship4Buddy,
                               Hate = @hate,
                               Protect = @protect,
                               Dream = @dream,
                               DenDescription = @denDescription,
                               DenStash = @denStash
                         WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", character.Id);
                    DbUtils.AddParameter(cmd, "@public", character.Public);
                    DbUtils.AddParameter(cmd, "@roleId", character.RoleId);
                    DbUtils.AddParameter(cmd, "@name", character.Name);
                    DbUtils.AddParameter(cmd, "@experiencePoints", character.ExperiencePoints);
                    DbUtils.AddParameter(cmd, "@faceAppearance", character.FaceAppearance);
                    DbUtils.AddParameter(cmd, "@bodyAppearance", character.BodyAppearance);
                    DbUtils.AddParameter(cmd, "@clothingAppearance", character.ClothingAppearance);
                    DbUtils.AddParameter(cmd, "@strength", character.Strength);
                    DbUtils.AddParameter(cmd, "@agility", character.Agility);
                    DbUtils.AddParameter(cmd, "@wits", character.Wits);
                    DbUtils.AddParameter(cmd, "@empathy", character.Empathy);
                    DbUtils.AddParameter(cmd, "@damage", character.Damage);
                    DbUtils.AddParameter(cmd, "@fatigue", character.Fatigue);
                    DbUtils.AddParameter(cmd, "@confusion", character.Confusion);
                    DbUtils.AddParameter(cmd, "@doubt", character.Doubt);
                    DbUtils.AddParameter(cmd, "@starving", character.Starving);
                    DbUtils.AddParameter(cmd, "@dehydrated", character.Dehydrated);
                    DbUtils.AddParameter(cmd, "@sleepless", character.Sleepless);
                    DbUtils.AddParameter(cmd, "@hypothermic", character.Hypothermic);
                    DbUtils.AddParameter(cmd, "@criticalInjuries", character.CriticalInjuries);
                    DbUtils.AddParameter(cmd, "@rotPoints", character.RotPoints);
                    DbUtils.AddParameter(cmd, "@mutationPoints", character.MutationPoints);
                    DbUtils.AddParameter(cmd, "@armor", character.Armor);
                    DbUtils.AddParameter(cmd, "@gear", character.Gear);
                    DbUtils.AddParameter(cmd, "@tinyItems", character.TinyItems);
                    DbUtils.AddParameter(cmd, "@weapons", character.Weapons);
                    DbUtils.AddParameter(cmd, "@pcRelationship1", character.PcRelationship1);
                    DbUtils.AddParameter(cmd, "@pcRelationship2", character.PcRelationship2);
                    DbUtils.AddParameter(cmd, "@pcRelationship3", character.PcRelationship3);
                    DbUtils.AddParameter(cmd, "@pcRelationship4", character.PcRelationship4);
                    DbUtils.AddParameter(cmd, "@pcRelationship1Buddy", character.PcRelationship1Buddy);
                    DbUtils.AddParameter(cmd, "@pcRelationship2Buddy", character.PcRelationship2Buddy);
                    DbUtils.AddParameter(cmd, "@pcRelationship3Buddy", character.PcRelationship3Buddy);
                    DbUtils.AddParameter(cmd, "@pcRelationship4Buddy", character.PcRelationship4Buddy);
                    DbUtils.AddParameter(cmd, "@hate", character.Hate);
                    DbUtils.AddParameter(cmd, "@protect", character.Protect);
                    DbUtils.AddParameter(cmd, "@dream", character.Dream);
                    DbUtils.AddParameter(cmd, "@denDescription", character.DenDescription);
                    DbUtils.AddParameter(cmd, "@denStash", character.DenStash);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        private string _queryString = @"
                       SELECT c.Id AS CharacterId, c.UserProfileId, c.[Public], c.RoleId, c.[Name] AS CharacterName, c.ExperiencePoints, c.FaceAppearance, c.BodyAppearance,
                              c.ClothingAppearance, c.Strength, c.Agility, c.Wits, c.Empathy, c.Damage, c.Fatigue, c.Confusion, c.Doubt, c.Starving, c.Dehydrated,
                              c.Sleepless, c.Hypothermic, c.CriticalInjuries, c.RotPoints, c.MutationPoints, c.Armor, c.Gear, c.TinyItems, c.Weapons,
                              c.PcRelationship1, c.PcRelationship2, c.PcRelationship3, c.PcRelationship4, c.PcRelationship1Buddy,
                              c.PcRelationship2Buddy, c.PcRelationship3Buddy, c.PcRelationship4Buddy, c.Hate, c.Protect, c.Dream, c.DenDescription, c.DenStash,

                              r.[Name] AS RoleName,

                              cs.[Value] AS SkillValue,

                              s.Id AS SkillId, s.RoleId AS SkillRoleId, s.[Name] AS SkillName, s.[Description] AS SkillDescription, s.PageReference,

                              t.Id AS TalentId, t.RoleId AS TalentRoleId, t.[Name] AS TalentName, t.[Description] AS TalentDescription,

                              m.Id AS MutationId, m.[Name] AS MutationName, m.[Description] AS MutationDescription
                         FROM Character c
                              LEFT JOIN Role r ON c.RoleId = r.Id
                              LEFT JOIN CharacterMutation cm ON cm.CharacterId = c.Id
                              LEFT JOIN Mutation m ON cm.MutationId = m.Id
                              LEFT JOIN CharacterTalent ct ON ct.CharacterId = c.Id
                              LEFT JOIN Talent t ON ct.TalentId = t.Id
                              LEFT JOIN CharacterSkill cs ON cs.CharacterId = c.Id
                              LEFT JOIN Skill s ON cs.SkillId = s.Id";

        /// <summary>
        /// Get a character from a data reader object.
        /// </summary>
        /// <param name="reader">A SqlDataReader that has not exhausted it's result set</param>
        /// <returns>A Character object derived from the reader</returns>
        private Character NewCharacterFromReader(SqlDataReader reader)
        {
            return new Character()
            {
                Id = DbUtils.GetInt(reader, "CharacterId"),
                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                RoleId = DbUtils.GetInt(reader, "RoleId"),
                Role = new Role()
                {
                    Id = DbUtils.GetInt(reader, "RoleId"),
                    Name = DbUtils.GetNullableString(reader, "RoleName"),
                },
                Name = DbUtils.GetString(reader, "CharacterName"),
                ExperiencePoints = DbUtils.GetInt(reader, "ExperiencePoints"),
                FaceAppearance = DbUtils.GetNullableString(reader, "FaceAppearance"),
                BodyAppearance = DbUtils.GetNullableString(reader, "BodyAppearance"),
                ClothingAppearance = DbUtils.GetNullableString(reader, "ClothingAppearance"),
                Strength = DbUtils.GetInt(reader, "Strength"),
                Agility = DbUtils.GetInt(reader, "Agility"),
                Wits = DbUtils.GetInt(reader, "Wits"),
                Empathy = DbUtils.GetInt(reader, "Empathy"),
                Damage = DbUtils.GetInt(reader, "Damage"),
                Fatigue = DbUtils.GetInt(reader, "Fatigue"),
                Confusion = DbUtils.GetInt(reader, "Confusion"),
                Doubt = DbUtils.GetInt(reader, "Doubt"),
                Starving = DbUtils.GetBool(reader, "Starving"),
                Dehydrated = DbUtils.GetBool(reader, "Dehydrated"),
                Sleepless = DbUtils.GetBool(reader, "Sleepless"),
                Hypothermic = DbUtils.GetBool(reader, "Hypothermic"),
                CriticalInjuries = DbUtils.GetNullableString(reader, "CriticalInjuries"),   
                RotPoints = DbUtils.GetInt(reader, "RotPoints"),
                MutationPoints = DbUtils.GetInt(reader, "MutationPoints"),
                Armor = DbUtils.GetNullableString(reader, "Armor"),
                Gear = DbUtils.GetNullableString(reader, "Gear"),
                TinyItems = DbUtils.GetNullableString(reader, "TinyItems"),
                Weapons = DbUtils.GetNullableString(reader, "Weapons"),
                PcRelationship1 = DbUtils.GetNullableString(reader, "PcRelationship1"),
                PcRelationship2 = DbUtils.GetNullableString(reader, "PcRelationship2"),
                PcRelationship3 = DbUtils.GetNullableString(reader, "PcRelationship3"),
                PcRelationship4 = DbUtils.GetNullableString(reader, "PcRelationship4"),
                PcRelationship1Buddy = DbUtils.GetBool(reader, "PcRelationship1Buddy"),
                PcRelationship2Buddy = DbUtils.GetBool(reader, "PcRelationship2Buddy"),
                PcRelationship3Buddy = DbUtils.GetBool(reader, "PcRelationship3Buddy"),
                PcRelationship4Buddy = DbUtils.GetBool(reader, "PcRelationship4Buddy"),
                Hate = DbUtils.GetNullableString(reader, "Hate"),
                Protect = DbUtils.GetNullableString(reader, "Protect"),
                Dream = DbUtils.GetNullableString(reader, "Dream"),
                DenDescription = DbUtils.GetNullableString(reader, "DenDescription"),
                DenStash = DbUtils.GetNullableString(reader, "DenStash"),
                Skills = new List<Skill>(),
                Talents = new List<Talent>(),
                Mutations = new List<Mutation>(),
            };
        }

        /// <summary>
        /// Get a Skill from a data reader object.
        /// </summary>
        /// <param name="reader">A SqlDataReader that has not exhausted it's result set</param>
        /// <returns>A Skill object derived from the reader</returns>
        private Skill NewSkillFromReader(SqlDataReader reader)
        {
            return new Skill()
            {
                Id = DbUtils.GetInt(reader, "SkillId"),
                RoleId = DbUtils.GetNullableInt(reader, "SkillRoleId"),
                Name = DbUtils.GetString(reader, "SkillName"),
                Description = DbUtils.GetString(reader, "SkillDescription"),
                PageReference = DbUtils.GetInt(reader, "PageReference"),
                Value = DbUtils.GetInt(reader, "SkillValue"),
            };
        }

        /// <summary>
        /// Get a Talent from a data reader object.
        /// </summary>
        /// <param name="reader">A SqlDataReader that has not exhausted it's result set</param>
        /// <returns>A Talent object derived from the reader</returns>
        private Talent NewTalentFromReader(SqlDataReader reader)
        {
            return new Talent()
            {
                Id = DbUtils.GetInt(reader, "TalentId"),
                RoleId = DbUtils.GetNullableInt(reader, "TalentRoleId"),
                Name = DbUtils.GetString(reader, "TalentName"),
                Description = DbUtils.GetString(reader, "TalentDescription")
            };
        }

        private Mutation NewMutationFromReader(SqlDataReader reader)
        {
            return new Mutation()
            {
                Id = DbUtils.GetInt(reader, "MutationId"),
                Name = DbUtils.GetString(reader, "MutationName"),
                Description = DbUtils.GetString(reader, "MutationDescription")
            };
        }
    }
}
