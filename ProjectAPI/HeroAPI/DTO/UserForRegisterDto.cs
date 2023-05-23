using System.ComponentModel.DataAnnotations;

namespace HeroAPI.DTO
{
    public class UserForRegisterDto
    {
        [Required]
        public string? Username { get; set; }
        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "Your username must be at between 4 and 8 characters")]
        public string? Password { get; set; }
    }
}