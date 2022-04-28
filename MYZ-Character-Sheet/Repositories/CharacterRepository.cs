using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using MYZ_Character_Sheet.Models;
using MYZ_Character_Sheet.Utils;

namespace MYZ_Character_Sheet.Repositories
{
    public class CharacterRepository : BaseRepository
    {
        public CharacterRepository(IConfiguration configuration) : base(configuration) { }

        //public Character GetById(int id)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {

        //        }
        //    }
        //}

        private string _queryString = @"
                       SELECT c.Id AS CharacterId, c.UserProfileId, c.[Public], c.RoleId, c.[Name] AS CharacterName, c.FaceAppearance, c.BodyAppearance, c.ClothingAppearance,
                              c.Strength, c.Agility, c.Wits, c.Empathy, c.Damage, c.Fatigue, c.Confusion, c.Doubt, c.Starving, c.Dehydrated,
                              c.Sleepless, c.Hypothermic, c.CriticalInjuries, c.RotPoints, c.MutationPoints, c.Armor, c.Gear, c.TinyItems,
                              c.PcRelationship1, c.PcRelationship2, c.PcRelationship3, c.PcRelationship4, c.PcRelationship1Buddy,
                              c.PcRelationship2Buddy, c.PcRelationship3Buddy, c.PcRelationship4Buddy, c.Hate, c.Protect, c.Dream, c.DenDescription, c.DenStash,

                              r.[Name],

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
    }
}
