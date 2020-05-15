using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Domain;
using API.Domain.Dto;
using API.Domain.Models;
using API.Security;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

public class UserService
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly IJwtGenerator _jwtGenerator;

    public UserService(ApplicationDbContext context,
        UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager,
        IJwtGenerator jwtGenerator)
    {
        _context = context;
        _userManager = userManager;
        _signInManager = signInManager;
        _jwtGenerator = jwtGenerator;
    }
}