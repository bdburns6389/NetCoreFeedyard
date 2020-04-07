using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Domain.Models
{
    [Table("Feedlot")]
    public class Feedlot
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Owner { get; set; }
        public string Summary { get; set; }
    }
}