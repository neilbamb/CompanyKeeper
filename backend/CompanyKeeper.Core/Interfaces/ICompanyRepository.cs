
using CompanyKeeper.Core.Models;

namespace CompanyKeeper.Core.Interfaces
{
    public interface ICompanyRepository
    {
        Task<IEnumerable<Company>> GetAllAsync();
        Task<Company?> GetByIdAsync(int id);
        Task<Company?> GetByIsinAsync(string isin);
        Task<bool> IsinExistsAsync(string isin);
        Task<bool> IsinExistsExceptIdAsync(string isin, int id);
        Task<Company> AddAsync(Company company);
        Task<Company> UpdateAsync(Company company);
        Task<bool> DeleteAsync(int id);
    }
}
