
using CompanyKeeper.API.Controllers;
using CompanyKeeper.Core.DTOs;
using CompanyKeeper.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace CompanyKeeper.Tests.Controllers
{
    public class CompaniesControllerTests
    {
        private readonly Mock<ICompanyService> _mockService;
        private readonly CompaniesController _controller;

        public CompaniesControllerTests()
        {
            _mockService = new Mock<ICompanyService>();
            _controller = new CompaniesController(_mockService.Object);
        }

        [Fact]
        public async Task GetAll_ShouldReturnOkResultWithCompanies()
        {
            // Arrange
            var companies = new List<CompanyDto>
            {
                new CompanyDto { Id = 1, Name = "Apple", StockTicker = "AAPL", Exchange = "NASDAQ", Isin = "US0378331005" },
                new CompanyDto { Id = 2, Name = "Microsoft", StockTicker = "MSFT", Exchange = "NASDAQ", Isin = "US5949181045" }
            };

            _mockService.Setup(service => service.GetAllCompaniesAsync())
                .ReturnsAsync(companies);

            // Act
            var result = await _controller.GetAll();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<List<CompanyDto>>(okResult.Value);
            Assert.Equal(2, returnValue.Count);
        }

        [Fact]
        public async Task GetById_WithValidId_ShouldReturnOkResultWithCompany()
        {
            // Arrange
            var company = new CompanyDto { Id = 1, Name = "Apple", StockTicker = "AAPL", Exchange = "NASDAQ", Isin = "US0378331005" };

            _mockService.Setup(service => service.GetCompanyByIdAsync(1))
                .ReturnsAsync(company);

            // Act
            var result = await _controller.GetById(1);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<CompanyDto>(okResult.Value);
            Assert.Equal(1, returnValue.Id);
            Assert.Equal("Apple", returnValue.Name);
        }

        [Fact]
        public async Task GetById_WithInvalidId_ShouldReturnNotFound()
        {
            // Arrange
            _mockService.Setup(service => service.GetCompanyByIdAsync(999))
                .ReturnsAsync((CompanyDto?)null);

            // Act
            var result = await _controller.GetById(999);

            // Assert
            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public async Task GetByIsin_WithValidIsin_ShouldReturnOkResultWithCompany()
        {
            // Arrange
            var company = new CompanyDto { Id = 1, Name = "Apple", StockTicker = "AAPL", Exchange = "NASDAQ", Isin = "US0378331005" };

            _mockService.Setup(service => service.GetCompanyByIsinAsync("US0378331005"))
                .ReturnsAsync(company);

            // Act
            var result = await _controller.GetByIsin("US0378331005");

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<CompanyDto>(okResult.Value);
            Assert.Equal(1, returnValue.Id);
            Assert.Equal("Apple", returnValue.Name);
        }

        [Fact]
        public async Task Create_WithValidData_ShouldReturnCreatedAtActionResult()
        {
            // Arrange
            var companyDto = new CompanyDto
            {
                Name = "Apple",
                StockTicker = "AAPL",
                Exchange = "NASDAQ",
                Isin = "US0378331005"
            };

            var createdCompany = new CompanyDto
            {
                Id = 1,
                Name = "Apple",
                StockTicker = "AAPL",
                Exchange = "NASDAQ",
                Isin = "US0378331005"
            };

            _mockService.Setup(service => service.CreateCompanyAsync(companyDto))
                .ReturnsAsync(createdCompany);

            // Act
            var result = await _controller.Create(companyDto);

            // Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result);
            Assert.Equal("GetById", createdAtActionResult.ActionName);
            Assert.Equal(1, createdAtActionResult.RouteValues!["id"]);
            var returnValue = Assert.IsType<CompanyDto>(createdAtActionResult.Value);
            Assert.Equal(1, returnValue.Id);
            Assert.Equal("Apple", returnValue.Name);
        }

        [Fact]
        public async Task Create_WithDuplicateIsin_ShouldReturnBadRequest()
        {
            // Arrange
            var companyDto = new CompanyDto
            {
                Name = "Apple",
                StockTicker = "AAPL",
                Exchange = "NASDAQ",
                Isin = "US0378331005"
            };

            _mockService.Setup(service => service.CreateCompanyAsync(companyDto))
                .ThrowsAsync(new ArgumentException("A company with ISIN 'US0378331005' already exists."));

            // Act
            var result = await _controller.Create(companyDto);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Contains("already exists", (badRequestResult.Value as dynamic)!.message);
        }

        [Fact]
        public async Task Update_WithValidData_ShouldReturnOkResultWithCompany()
        {
            // Arrange
            var companyDto = new CompanyDto
            {
                Name = "Apple Inc.",
                StockTicker = "AAPL",
                Exchange = "NASDAQ",
                Isin = "US0378331005"
            };

            var updatedCompany = new CompanyDto
            {
                Id = 1,
                Name = "Apple Inc.",
                StockTicker = "AAPL",
                Exchange = "NASDAQ",
                Isin = "US0378331005"
            };

            _mockService.Setup(service => service.UpdateCompanyAsync(1, companyDto))
                .ReturnsAsync(updatedCompany);

            // Act
            var result = await _controller.Update(1, companyDto);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<CompanyDto>(okResult.Value);
            Assert.Equal(1, returnValue.Id);
            Assert.Equal("Apple Inc.", returnValue.Name);
        }

        [Fact]
        public async Task Update_WithInvalidId_ShouldReturnNotFound()
        {
            // Arrange
            var companyDto = new CompanyDto
            {
                Name = "Apple Inc.",
                StockTicker = "AAPL",
                Exchange = "NASDAQ",
                Isin = "US0378331005"
            };

            _mockService.Setup(service => service.UpdateCompanyAsync(999, companyDto))
                .ReturnsAsync((CompanyDto?)null);

            // Act
            var result = await _controller.Update(999, companyDto);

            // Assert
            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public async Task Delete_WithValidId_ShouldReturnNoContent()
        {
            // Arrange
            _mockService.Setup(service => service.DeleteCompanyAsync(1))
                .ReturnsAsync(true);

            // Act
            var result = await _controller.Delete(1);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task Delete_WithInvalidId_ShouldReturnNotFound()
        {
            // Arrange
            _mockService.Setup(service => service.DeleteCompanyAsync(999))
                .ReturnsAsync(false);

            // Act
            var result = await _controller.Delete(999);

            // Assert
            Assert.IsType<NotFoundObjectResult>(result);
        }
    }
}
