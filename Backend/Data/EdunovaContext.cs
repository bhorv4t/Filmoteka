using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class EdunovaContext : DbContext
    {

        public EdunovaContext(DbContextOptions<EdunovaContext> options) : base(options)
        {
            // ovdje bi upravljali s razlicitim opcijama, za sada nista

        }

        public DbSet<Zanr> Zanrovi { get; set; } // zbog ovog ovdje Smjerovi se tablica zove u mnozini





    }
}
