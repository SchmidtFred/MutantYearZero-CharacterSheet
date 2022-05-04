using System.ComponentModel.DataAnnotations;

namespace MYZ_Character_Sheet.Models
{
    public class Role
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string KeyAttribute { get; set; }
        public string TypicalNames { get; set; }
        public string FaceSuggest { get; set; }
        public string BodySuggest { get; set; }
        public string ClothingSuggest { get; set; }
        public string ImageLocation { get; set; }
    }
}
