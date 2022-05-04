using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using MYZ_Character_Sheet.Models;

namespace MYZ_Character_Sheet.Models
{
    public class Character
    {
        public int Id { get; set; }
        [Required]
        public int UserProfileId { get; set; }
        public bool Public { get; set; }
        [Required]
        public int? RoleId { get; set; }
        public Role Role { get; set; }
        [Required]
        public string Name { get; set; }
        public int ExperiencePoints { get; set; }
        public string FaceAppearance { get; set; }
        public string BodyAppearance { get; set; }
        public string ClothingAppearance { get; set; }
        public int Strength { get; set; }
        public int Agility { get; set; }
        public int Wits { get; set; }
        public int Empathy { get; set; }
        public int Damage { get; set; }
        public int Fatigue { get; set; }
        public int Confusion { get; set; }
        public int Doubt { get; set; }
        public bool Starving { get; set; }
        public bool Dehydrated { get; set; }
        public bool Sleepless { get; set; }
        public bool Hypothermic { get; set; }
        public string CriticalInjuries { get; set; }
        public int RotPoints { get; set; }
        public int MutationPoints { get; set; }
        public string Armor { get; set; }
        public string Gear { get; set; }
        public string TinyItems { get; set; }
        public string Weapons { get; set; }
        public string PcRelationship1 { get; set; }
        public string PcRelationship2 { get; set; }
        public string PcRelationship3 { get; set; }
        public string PcRelationship4 { get; set; }
        public bool PcRelationship1Buddy { get; set; }
        public bool PcRelationship2Buddy { get; set; }
        public bool PcRelationship3Buddy { get; set; }
        public bool PcRelationship4Buddy { get; set; }
        public string Hate { get; set; }
        public string Protect { get; set; }
        public string Dream { get; set; }
        public string DenDescription { get; set; }
        public string DenStash { get; set; }
        public List<Skill> Skills { get; set; }
        public List<Talent> Talents { get; set; }
        public List<Mutation> Mutations { get; set; }
    }
}
