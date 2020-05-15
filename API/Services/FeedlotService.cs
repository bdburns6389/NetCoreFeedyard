using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Domain;
using API.Domain.Models;

public class FeedlotService
{
    private readonly ApplicationDbContext _context;

    public FeedlotService(ApplicationDbContext context)
    {
        _context = context;
    }

    public List<Feedlot> GetAll()
    {
        return _context.Feedlots.ToList();
    }

    public bool FindExisting(string feedlotName)
    {
        return _context.Feedlots.Any(c => c.Name == feedlotName);
    }

    public async Task<Feedlot> Create(Feedlot feedlot)
    {
        var newFeedlot = new Feedlot
        {
            Name = feedlot.Name,
            Owner = feedlot.Owner,
            Summary = feedlot.Summary
        };

        _context.Feedlots.Add(newFeedlot);
        await _context.SaveChangesAsync();

        return newFeedlot;
    }
}