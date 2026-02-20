
using Microsoft.AspNetCore.Mvc;
using microservice_games.Models;
using microservice_games.Data;
using Microsoft.EntityFrameworkCore;

namespace microservice_games.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GamesController : ControllerBase
    {
        private readonly GameDbContext _context;

        public GamesController(GameDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Game>>> GetAll()
        {
            var games = await _context.Games.ToListAsync();
            return Ok(games);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Game>> GetById(int id)
        {
            var game = await _context.Games.FindAsync(id);
            if (game == null) return NotFound();
            return Ok(game);
        }

        [HttpPost]
        public async Task<ActionResult<Game>> Create(Game game)
        {
            _context.Games.Add(game);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = game.Id }, game);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Game updatedGame)
        {
            var game = await _context.Games.FindAsync(id);
            if (game == null) return NotFound();
            game.Name = updatedGame.Name;
            game.Description = updatedGame.Description;
            game.Image = updatedGame.Image;
            game.CategoryId = updatedGame.CategoryId;
            game.Price = updatedGame.Price;
            game.Stock = updatedGame.Stock;
            game.IsActive = updatedGame.IsActive;
            game.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var game = await _context.Games.FindAsync(id);
            if (game == null) return NotFound();
            _context.Games.Remove(game);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}