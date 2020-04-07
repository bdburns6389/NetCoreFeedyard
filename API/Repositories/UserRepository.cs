using System.Threading.Tasks;
using API.Domain;
using API.Domain.Models;
using Microsoft.AspNetCore.Identity;

namespace API.Repositories
{
    public class UserRepository
    {
        protected readonly ApplicationDbContext _context;
        private readonly UserManager<AppUser> _userManager;

        public UserRepository(ApplicationDbContext context, UserManager<AppUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
    }
}