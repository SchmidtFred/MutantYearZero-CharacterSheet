using System.ComponentModel.DataAnnotations;

namespace MYZ_Character_Sheet.Models
{
    public class Skill
    {
        public int Id { get; set; }
        public int? RoleId { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public int PageReference { get; set; }
        //used only when inside the skills list on the character model
        public int Value { get; set; }
    }
}
