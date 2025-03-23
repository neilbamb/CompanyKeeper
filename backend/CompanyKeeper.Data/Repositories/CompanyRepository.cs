
using CompanyKeeper.Core.Interfaces;
using CompanyKeeper.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace CompanyKeeper.Data.Repositories
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly AppDbContext _context;

        public CompanyRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Company>> GetAllAsync()
        {
            return await _context.Companies.ToListAsync();
        }

        public async Task<Company?> GetByIdAsync(int id)
        {
            return await _context.Companies.FindAsync(id);
        }

        public async Task<Company?> GetByIsinAsync(string isin)
        {
            return await _context.Companies.FirstOrDefaultAsync(c => c.Isin == isin);
        }

        public async Task<bool> IsinExistsAsync(string isin)
        {
            return await _context.Companies.AnyAsync(c => c.Isin == isin);
        }

        public async Task<bool> IsinExistsExceptIdAsync(string isin, int id)
        {
            return await _context.Companies.AnyAsync(c => c.Isin == isin && c.Id != id);
        }

        public async Task<Company> AddAsync(Company company)
        {
            _context.Companies.Add(company);
            await _context.SaveChangesAsync();
            return company;
        }

        public async Task<Company> UpdateAsync(Company company)
        {
            _context.Entry(company).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return company;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var company = await _context.Companies.FindAsync(id);
            if (company == null)
            {
                return false;
            }

            _context.Companies.Remove(company);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
