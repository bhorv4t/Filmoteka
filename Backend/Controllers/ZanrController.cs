using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ZanrController : ControllerBase
    {

        // koristimo dependency injection
        // 1. definiramo privatno svojstvo
        private readonly EdunovaContext _context;

        // koristimo dependency injection
        // 2. proslijediš instancu kroz konstruktor
        public ZanrController(EdunovaContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_context.Zanrovi);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult GetBySifra(int sifra) {
            try
            {
                var s = _context.Zanrovi.Find(sifra);
                if (s == null)
                {
                    return NotFound();
                }
                return Ok(s);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }


        [HttpPost]
        public IActionResult Post(Zanr smjer)
        {
            try
            {
                _context.Zanrovi.Add(smjer);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, smjer);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }


        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, Zanr zanr)
        {
            try
            {

                var s = _context.Zanrovi.Find(sifra);

                if (s == null)
                {
                    return NotFound();
                }

                // Rucno mapiranje, kasnije automapper
                s.Naziv = zanr.Naziv;
                s.Opis = zanr.Opis;

                _context.Zanrovi.Update(s);
                _context.SaveChanges();
                return Ok(new { poruka= "Uspješno promijenjeno" });
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }


        [HttpDelete]
        [Route("{sifra:int}")]
        public IActionResult Delete(int sifra)
        {
            try
            {
                var s = _context.Zanrovi.Find(sifra);
                if (s == null)
                {
                    return NotFound();
                }
                _context.Zanrovi.Remove(s);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno obrisano" });
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }




    }
}
