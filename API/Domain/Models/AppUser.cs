using Microsoft.AspNetCore.Identity;

namespace API.Domain.Models
{
    public class AppUser : IdentityUser
    {
        public string RefreshToken { get; set; }
    }
}