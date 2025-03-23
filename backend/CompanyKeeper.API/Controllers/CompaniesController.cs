
using CompanyKeeper.Core.DTOs;
using CompanyKeeper.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CompanyKeeper.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompaniesController : ControllerBase
    {
        private readonly ICompanyService _companyService;

        public CompaniesController(ICompanyService companyService)
        {
            _companyService = companyService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var companies = await _companyService.GetAllCompaniesAsync();
            return Ok(companies);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var company = await _companyService.GetCompanyByIdAsync(id);
            
            if (company == null)
                return NotFound(new { message = "Company not found" });
                
            return Ok(company);
        }

        [HttpGet("isin/{isin}")]
        public async Task<IActionResult> GetByIsin(string isin)
        {
            var company = await _companyService.GetCompanyByIsinAsync(isin);
            
            if (company == null)
                return NotFound(new { message = "Company not found" });
                
            return Ok(company);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CompanyDto companyDto)
        {
            try
            {
                var company = await _companyService.CreateCompanyAsync(companyDto);
                return CreatedAtAction(nameof(GetById), new { id = company.Id }, company);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, CompanyDto companyDto)
        {
            try
            {
                var company = await _companyService.UpdateCompanyAsync(id, companyDto);
                
                if (company == null)
                    return NotFound(new { message = "Company not found" });
                    
                return Ok(company);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _companyService.DeleteCompanyAsync(id);
            
            if (!result)
                return NotFound(new { message = "Company not found" });
                
            return NoContent();
        }
    }
}
