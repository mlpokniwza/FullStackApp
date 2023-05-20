using HeroAPI.Data;
using HeroAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;

namespace HeroAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SuperHeroController : ControllerBase
    {
        private readonly DataContext _context;

        public SuperHeroController(DataContext context)
        {
            _context = context;
        }

        //[HttpGet]
        //public async Task<ActionResult<List<SuperHero>>> GetLimitedRows(int limit)
        //{
        //    var result = await _context.SuperHeroes.Take(limit).ToListAsync();

        //    return Ok(result);
        //}

        //[HttpGet("filter")]
        //public async Task<ActionResult<List<SuperHero>>>  GetFilteredLimitedRows(int limit, string filter)
        //{
        //        var result = await _context.SuperHeroes
        //            .Where(d =>
        //            d.Name.Contains(filter) ||
        //            d.FirstName.Contains(filter) ||
        //            d.LastName.Contains(filter) ||
        //            d.Place.Contains(filter)
        //            )
        //            .Take(limit)
        //            .ToListAsync();
        //    return Ok(result);
        //}

        //[HttpGet("filter/{filter}/type/{type}")]
        //public async Task<ActionResult<List<SuperHero>>> getfilteredlimitedrows(int limit, string filter, string type)
        //{
        //    var result = await _context.SuperHeroes
        //        .Where(d => d.type?.contains(filter))

        //        .take(limit)
        //        .tolistasync();

        //    return Ok(result);
        ////}
        ///
        //[HttpGet]
        //public async Task<ActionResult<List<SuperHero>>> GetFiltersHero(SuperHero filtersHero)
        //{
        //    var query = _context.SuperHeroes.AsQueryable();

        //    var properties = filtersHero.GetType().GetProperties();

        //    var stringValue = string.Empty;

        //    foreach (var prop in properties)
        //    {
        //        var value = prop.GetValue(filtersHero);

        //        if (value != null)
        //        {
        //            if (value.GetType() == typeof(string) && !string.IsNullOrEmpty(value.ToString()))
        //            {
        //                stringValue = Convert.ToString(value);
        //                query = query.Where(x => x.GetType().GetProperty(prop.Name).GetValue(x).ToString().Contains(stringValue));
        //            }
        //            else if (value.GetType() == typeof(int))
        //            {
        //                stringValue = value.ToString();
        //                query = query.Where(x => x.GetType().GetProperty(prop.Name).GetValue(x).ToString().Contains(stringValue));
        //            }
        //        }
        //    }

        //    var result = await query..ToListAsync();

        //    return Ok(result);
        //}

        [HttpGet]
        public async Task<ActionResult<List<SuperHero>>> GetSuperHeroes(string? id, string? name, string? firstName, string? lastName, string? place, int limit)
        {
            var query = _context.SuperHeroes.AsQueryable();

            if (!string.IsNullOrEmpty(id))
            {
                query = query.Where(d => d.Id.ToString().Contains(id));
            }
            if (!string.IsNullOrEmpty(name))
            {
                query = query.Where(d => d.Name.Contains(name));
            }
            if (!string.IsNullOrEmpty(firstName))
            {
                query = query.Where(d => d.FirstName.Contains(firstName));

            }
            if (!string.IsNullOrEmpty(lastName))
            {
                query = query.Where(d => d.LastName.Contains(lastName));
            }

            if (!string.IsNullOrEmpty(place))
            {
                query = query.Where(d => d.Place.Contains(place));
            }

            var result = await query.ToListAsync();

            if (result == null || limit == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<List<SuperHero>>> CreateSuperHeroes(SuperHero hero)
        {
            _context.SuperHeroes.Add(hero);
            await _context.SaveChangesAsync();

            return Ok(await _context.SuperHeroes.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<SuperHero>>> UpdateSuperHero(SuperHero hero)
        {
            var dbHero = await _context.SuperHeroes.FindAsync(hero.Id);
            if (dbHero == null)
                return BadRequest("Hero not found.");

            dbHero.Name = hero.Name;
            dbHero.FirstName = hero.FirstName;
            dbHero.LastName = hero.LastName;
            dbHero.Place = hero.Place;

            await _context.SaveChangesAsync();

            return Ok(await _context.SuperHeroes.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<SuperHero>>> DeleteSuperHero(int id)
        {
            var dbHero = await _context.SuperHeroes.FindAsync(id);
            if (dbHero == null)
                return BadRequest("Hero not found.");

            _context.SuperHeroes.Remove(dbHero);
            await _context.SaveChangesAsync();

            return Ok(await _context.SuperHeroes.ToListAsync());
        }
    }
}
