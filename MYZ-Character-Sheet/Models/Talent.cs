using System.ComponentModel.DataAnnotations;

namespace MYZ_Character_Sheet.Models
{
    public class Talent
    {
        public int Id { get; set; }
        public int? RoleId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
    }
}
