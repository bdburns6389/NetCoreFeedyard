using System;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Domain;
using API.Domain.Models;
using API.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IJwtGenerator _jwtGenerator;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserController(ApplicationDbContext context,
            UserManager<AppUser> userManager,
            IJwtGenerator jwtGenerator,
            SignInManager<AppUser> signInManager,
            IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _userManager = userManager;
            _jwtGenerator = jwtGenerator;
            _signInManager = signInManager;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(User user)
        {
            var currentUser = await _userManager.FindByEmailAsync(user.Email);

            if (currentUser == null)
                return StatusCode(StatusCodes.Status401Unauthorized);

            var result = await _signInManager.CheckPasswordSignInAsync(currentUser, user.Password, false);

            if (result.Succeeded)
            {
                var refreshToken = RefreshTokenGenerator.GenerateRefreshToken();

                Response.Cookies.Append("refresh-token", refreshToken, new CookieOptions
                {
                    HttpOnly = true,
                    IsEssential = true
                });

                return new User
                {
                    DisplayName = currentUser.UserName,
                    Token = _jwtGenerator.GenerateToken(currentUser),
                    Username = currentUser.UserName
                };
            }

            return StatusCode(StatusCodes.Status401Unauthorized);
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(User user)
        {
            var feedlots = _context.Feedlots.ToList();
            if (feedlots.Count < 1)
            {
                var newFeedlot = new Feedlot { Owner = "Brian", Summary = "Cool", Name = "Brians lot" };
                _context.Feedlots.Add(newFeedlot);
                await _context.SaveChangesAsync();
            }

            if (await _context.Users.Where(c => c.Email == user.Email).AnyAsync())
                return BadRequest(new { Email = "Email Already Exists" });

            if (await _context.Users.Where(c => c.UserName == user.Username).AnyAsync())
                return BadRequest(new { Username = "Username Already Exists" });

            var newUser = new AppUser
            {
                UserName = user.Username,
                Email = user.Email,
            };

            var result = await _userManager.CreateAsync(newUser, user.Password);

            if (result.Succeeded)
            {
                return new User
                {
                    DisplayName = user.Username,
                    Token = _jwtGenerator.GenerateToken(newUser),
                    Username = user.Username,
                };
            }

            return StatusCode(StatusCodes.Status500InternalServerError, new { Error = "Problem creating user." });
        }

        [Authorize]
        [HttpPost("currentuser")]
        public async Task<ActionResult<User>> CurrentUser()
        {
            var currentUserName = _httpContextAccessor.HttpContext.User?.Claims?
                .FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            var user = await _userManager.FindByNameAsync(currentUserName);
            if (user == null)
                return StatusCode(StatusCodes.Status404NotFound);

            return new User
            {
                DisplayName = user.UserName,
                Username = user.UserName,
                Token = _jwtGenerator.GenerateToken(user),
                Password = "Wouldn't you like to know"
            };
        }
    }

    public class User
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
    }
}