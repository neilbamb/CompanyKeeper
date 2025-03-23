
using CompanyKeeper.Core.DTOs;
using CompanyKeeper.Core.Interfaces;
using CompanyKeeper.Core.Models;

namespace CompanyKeeper.Core.Services
{
    public class CompanyService : ICompanyService
    {
        private readonly ICompanyRepository _companyRepository;

        public CompanyService(ICompanyRepository companyRepository)
        {
            _companyRepository = companyRepository;
        }

        public async Task<IEnumerable<CompanyDto>> GetAllCompaniesAsync()
        {
            var companies = await _companyRepository.GetAllAsync();
            return companies.Select(MapToDto);
        }

        public async Task<CompanyDto?> GetCompanyByIdAsync(int id)
        {
            var company = await _companyRepository.GetByIdAsync(id);
            return company != null ? MapToDto(company) : null;
        }

        public async Task<CompanyDto?> GetCompanyByIsinAsync(string isin)
        {
            var company = await _companyRepository.GetByIsinAsync(isin);
            return company != null ? MapToDto(company) : null;
        }

        public async Task<CompanyDto> CreateCompanyAsync(CompanyDto companyDto)
        {
            ValidateCompany(companyDto);

            if (await _companyRepository.IsinExistsAsync(companyDto.Isin))
            {
                throw new ArgumentException($"A company with ISIN '{companyDto.Isin}' already exists.");
            }

            var company = MapToEntity(companyDto);
            var createdCompany = await _companyRepository.AddAsync(company);
            
            return MapToDto(createdCompany);
        }

        public async Task<CompanyDto?> UpdateCompanyAsync(int id, CompanyDto companyDto)
        {
            ValidateCompany(companyDto);

            var existingCompany = await _companyRepository.GetByIdAsync(id);
            if (existingCompany == null)
            {
                return null;
            }

            if (await _companyRepository.IsinExistsExceptIdAsync(companyDto.Isin, id))
            {
                throw new ArgumentException($"A company with ISIN '{companyDto.Isin}' already exists.");
            }

            existingCompany.Name = companyDto.Name;
            existingCompany.StockTicker = companyDto.StockTicker;
            existingCompany.Exchange = companyDto.Exchange;
            existingCompany.Isin = companyDto.Isin;
            existingCompany.Website = companyDto.Website;

            var updatedCompany = await _companyRepository.UpdateAsync(existingCompany);
            return MapToDto(updatedCompany);
        }

        public async Task<bool> DeleteCompanyAsync(int id)
        {
            return await _companyRepository.DeleteAsync(id);
        }

        private void ValidateCompany(CompanyDto companyDto)
        {
            if (string.IsNullOrWhiteSpace(companyDto.Name))
            {
                throw new ArgumentException("Company name is required.");
            }

            if (string.IsNullOrWhiteSpace(companyDto.StockTicker))
            {
                throw new ArgumentException("Stock ticker is required.");
            }

            if (string.IsNullOrWhiteSpace(companyDto.Exchange))
            {
                throw new ArgumentException("Exchange is required.");
            }

            if (string.IsNullOrWhiteSpace(companyDto.Isin))
            {
                throw new ArgumentException("ISIN is required.");
            }

            if (companyDto.Isin.Length < 2 || !char.IsLetter(companyDto.Isin[0]) || !char.IsLetter(companyDto.Isin[1]))
            {
                throw new ArgumentException("ISIN must start with two letters.");
            }
        }

        private static CompanyDto MapToDto(Company company)
        {
            return new CompanyDto
            {
                Id = company.Id,
                Name = company.Name,
                StockTicker = company.StockTicker,
                Exchange = company.Exchange,
                Isin = company.Isin,
                Website = company.Website
            };
        }

        private static Company MapToEntity(CompanyDto companyDto)
        {
            return new Company
            {
                Id = companyDto.Id,
                Name = companyDto.Name,
                StockTicker = companyDto.StockTicker,
                Exchange = companyDto.Exchange,
                Isin = companyDto.Isin,
                Website = companyDto.Website
            };
        }
    }
}
