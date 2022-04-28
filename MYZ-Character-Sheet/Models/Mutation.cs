using System.ComponentModel.DataAnnotations;

namespace MYZ_Character_Sheet.Models
{
    public class Mutation
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
    }
}
