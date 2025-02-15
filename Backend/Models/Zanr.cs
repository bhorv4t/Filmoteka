using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Zanr : Entitet
    {
        public string Naziv { get; set; } = "";
        public string? Opis { get; set; }
    }
}
