using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectAPI.Models
{
    [Table("Photo")]
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
    }
}