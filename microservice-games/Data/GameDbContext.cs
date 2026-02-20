using Microsoft.EntityFrameworkCore;
using microservice_games.Models;

namespace microservice_games.Data
{
    public class GameDbContext : DbContext
    {
        public GameDbContext(DbContextOptions<GameDbContext> options) : base(options) { }

        public DbSet<Game> Games { get; set; }
    }
}