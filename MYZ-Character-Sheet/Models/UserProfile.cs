using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace MYZ_Character_Sheet.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        [Required]
        public string DisplayName { get; set; }
        [Required]
        public string Email { get; set; }
        public string FirebaseUserId { get; set; }
        public List<Character> Characters { get; set; }
    }
}
