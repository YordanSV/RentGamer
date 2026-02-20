using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace microservice_games.Models
{
    [Table("Games")]
    public class Game
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("name")]
        public string Name { get; set; }

        [Column("category_id")]
        public int CategoryId { get; set; }

        [Column("price")]
        public decimal Price { get; set; }

        [Column("image")]
        public string Image { get; set; }

        [Column("description")]
        public string Description { get; set; }

        [Column("stock")]
        public int Stock { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        [Column("updated_at")]
        public DateTime? UpdatedAt { get; set; }

        [Column("is_active")]
        public bool IsActive { get; set; }
    }
}