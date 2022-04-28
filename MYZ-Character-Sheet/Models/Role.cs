using System.ComponentModel.DataAnnotations;

namespace MYZ_Character_Sheet.Models
{
    public class Role
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string KeyAttribute { get; set; }
        [Required]
        public string TypicalNames { get; set; }
        [Required]
        public string FaceSuggest { get; set; }
        [Required]
        public string BodySuggest { get; set; }
        [Required]
        public string ClothingSuggest { get; set; }
        public string ImageLocation { get; set; }
    }
}
