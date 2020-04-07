using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using API.Domain;
using API.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class FeedlotController : ControllerBase
    {
        private readonly ILogger<FeedlotController> _logger;
        private readonly ApplicationDbContext _context;
        private readonly AppSettings _appSettings;

        public FeedlotController(ILogger<FeedlotController> logger, IOptions<AppSettings> appSettings, ApplicationDbContext context)
        {
            _logger = logger;
            _appSettings = appSettings.Value;
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Feedlot>> Get()
        {
            var feedlots = _context.Feedlots.ToList();
            return Ok(feedlots);
        }

        [HttpPost]
        public async Task<ActionResult<Feedlot>> Post(Feedlot feedlot)
        {
            var existingFeedlot = _context.Feedlots.Any(c => c.Name == feedlot.Name);
            // If a feedlot already exists, Conflit() returns a 409 error.
            if (existingFeedlot)
                return Conflict("This feedlot already exists");

            var newFeedlot = new Feedlot
            {
                Name = feedlot.Name,
                Owner = feedlot.Owner,
                Summary = feedlot.Summary
            };

            _context.Feedlots.Add(newFeedlot);
            await _context.SaveChangesAsync();

            var resourceUrl = Path.Combine(Request.Path.ToString(), Uri.EscapeUriString(newFeedlot.Name));

            return Created(resourceUrl, newFeedlot);
        }
    }
}
