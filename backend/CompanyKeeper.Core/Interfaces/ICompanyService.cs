
using CompanyKeeper.Core.DTOs;

namespace CompanyKeeper.Core.Interfaces
{
    public interface ICompanyService
    {
        Task<IEnumerable<CompanyDto>> GetAllCompaniesAsync();
        Task<CompanyDto?> GetCompanyByIdAsync(int id);
        Task<CompanyDto?> GetCompanyByIsinAsync(string isin);
        Task<CompanyDto> CreateCompanyAsync(CompanyDto companyDto);
        Task<CompanyDto?> UpdateCompanyAsync(int id, CompanyDto companyDto);
        Task<bool> DeleteCompanyAsync(int id);
    }
}
