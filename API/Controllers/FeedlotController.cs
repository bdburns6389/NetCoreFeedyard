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
        private readonly AppSettings _appSettings;
        private readonly FeedlotService _feedlotService;

        public FeedlotController(ILogger<FeedlotController> logger,
            IOptions<AppSettings> appSettings,
            FeedlotService feedlotService)
        {
            _logger = logger;
            _appSettings = appSettings.Value;
            _feedlotService = feedlotService;
        }

        //[Authorize]
        [AllowAnonymous]
        [HttpGet]
        public ActionResult<List<string>> Get()
        {
            var feedlots = _feedlotService.GetAll();
            return Ok(feedlots);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<Feedlot>> Post(Feedlot feedlot)
        {
            var existingFeedlot = _feedlotService.FindExisting(feedlot.Name);

            if (existingFeedlot)
                return Conflict("This feedlot already exists");

            var newFeedlot = await _feedlotService.Create(feedlot);

            var resourceUrl = Path.Combine(Request.Path.ToString(), Uri.EscapeUriString(newFeedlot.Name));

            return Created(resourceUrl, newFeedlot);
        }
    }
}
