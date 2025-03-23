
using CompanyKeeper.Core.DTOs;
using CompanyKeeper.Core.Interfaces;
using CompanyKeeper.Core.Models;
using CompanyKeeper.Core.Services;
using Moq;
using Xunit;

namespace CompanyKeeper.Tests.Services
{
    public class CompanyServiceTests
    {
        private readonly Mock<ICompanyRepository> _mockRepository;
        private readonly CompanyService _service;

        public CompanyServiceTests()
        {
            _mockRepository = new Mock<ICompanyRepository>();
            _service = new CompanyService(_mockRepository.Object);
        }

        [Fact]
        public async Task GetAllCompaniesAsync_ShouldReturnAllCompanies()
        {
            // Arrange
            var companies = new List<Company>
            {
                new Company { Id = 1, Name = "Apple", StockTicker = "AAPL", Exchange = "NASDAQ", Isin = "US0378331005" },
                new Company { Id = 2, Name = "Microsoft", StockTicker = "MSFT", Exchange = "NASDAQ", Isin = "US5949181045" }
            };

            _mockRepository.Setup(repo => repo.GetAllAsync())
                .ReturnsAsync(companies);

            // Act
            var result = await _service.GetAllCompaniesAsync();

            // Assert
            Assert.Equal(2, result.Count());
            Assert.Contains(result, c => c.Id == 1 && c.Name == "Apple");
            Assert.Contains(result, c => c.Id == 2 && c.Name == "Microsoft");
        }

        [Fact]
        public async Task GetCompanyByIdAsync_WithValidId_ShouldReturnCompany()
        {
            // Arrange
            var company = new Company { Id = 1, Name = "Apple", StockTicker = "AAPL", Exchange = "NASDAQ", Isin = "US0378331005" };

            _mockRepository.Setup(repo => repo.GetByIdAsync(1))
                .ReturnsAsync(company);

            // Act
            var result = await _service.GetCompanyByIdAsync(1);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(1, result!.Id);
            Assert.Equal("Apple", result.Name);
        }

        [Fact]
        public async Task GetCompanyByIdAsync_WithInvalidId_ShouldReturnNull()
        {
            // Arrange
            _mockRepository.Setup(repo => repo.GetByIdAsync(999))
                .ReturnsAsync((Company?)null);

            // Act
            var result = await _service.GetCompanyByIdAsync(999);

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task GetCompanyByIsinAsync_WithValidIsin_ShouldReturnCompany()
        {
            // Arrange
            var company = new Company { Id = 1, Name = "Apple", StockTicker = "AAPL", Exchange = "NASDAQ", Isin = "US0378331005" };

            _mockRepository.Setup(repo => repo.GetByIsinAsync("US0378331005"))
                .ReturnsAsync(company);

            // Act
            var result = await _service.GetCompanyByIsinAsync("US0378331005");

            // Assert
            Assert.NotNull(result);
            Assert.Equal(1, result!.Id);
            Assert.Equal("Apple", result.Name);
        }

        [Fact]
        public async Task CreateCompanyAsync_WithValidData_ShouldCreateCompany()
        {
            // Arrange
            var companyDto = new CompanyDto
            {
                Name = "Apple",
                StockTicker = "AAPL",
                Exchange = "NASDAQ",
                Isin = "US0378331005"
            };

            var company = new Company
            {
                Id = 1,
                Name = "Apple",
                StockTicker = "AAPL",
                Exchange = "NASDAQ",
                Isin = "US0378331005"
            };

            _mockRepository.Setup(repo => repo.IsinExistsAsync("US0378331005"))
                .ReturnsAsync(false);

            _mockRepository.Setup(repo => repo.AddAsync(It.IsAny<Company>()))
                .ReturnsAsync(company);

            // Act
            var result = await _service.CreateCompanyAsync(companyDto);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(1, result.Id);
            Assert.Equal("Apple", result.Name);
            _mockRepository.Verify(repo => repo.AddAsync(It.IsAny<Company>()), Times.Once);
        }

        [Fact]
        public async Task CreateCompanyAsync_WithDuplicateIsin_ShouldThrowException()
        {
            // Arrange
            var companyDto = new CompanyDto
            {
                Name = "Apple",
                StockTicker = "AAPL",
                Exchange = "NASDAQ",
                Isin = "US0378331005"
            };

            _mockRepository.Setup(repo => repo.IsinExistsAsync("US0378331005"))
                .ReturnsAsync(true);

            // Act & Assert
            await Assert.ThrowsAsync<ArgumentException>(() => _service.CreateCompanyAsync(companyDto));
            _mockRepository.Verify(repo => repo.AddAsync(It.IsAny<Company>()), Times.Never);
        }

        [Fact]
        public async Task CreateCompanyAsync_WithInvalidIsin_ShouldThrowException()
        {
            // Arrange
            var companyDto = new CompanyDto
            {
                Name = "Apple",
                StockTicker = "AAPL",
                Exchange = "NASDAQ",
                Isin = "12INVALID" // First two characters are not letters
            };

            // Act & Assert
            await Assert.ThrowsAsync<ArgumentException>(() => _service.CreateCompanyAsync(companyDto));
            _mockRepository.Verify(repo => repo.AddAsync(It.IsAny<Company>()), Times.Never);
        }

        [Fact]
        public async Task UpdateCompanyAsync_WithValidData_ShouldUpdateCompany()
        {
            // Arrange
            var companyDto = new CompanyDto
            {
                Name = "Apple Inc.",
                StockTicker = "AAPL",
                Exchange = "NASDAQ",
                Isin = "US0378331005"
            };

            var existingCompany = new Company
            {
                Id = 1,
                Name = "Apple",
                StockTicker = "AAPL",
                Exchange = "NASDAQ",
                Isin = "US0378331005"
            };

            var updatedCompany = new Company
            {
                Id = 1,
                Name = "Apple Inc.",
                StockTicker = "AAPL",
                Exchange = "NASDAQ",
                Isin = "US0378331005"
            };

            _mockRepository.Setup(repo => repo.GetByIdAsync(1))
                .ReturnsAsync(existingCompany);

            _mockRepository.Setup(repo => repo.IsinExistsExceptIdAsync("US0378331005", 1))
                .ReturnsAsync(false);

            _mockRepository.Setup(repo => repo.UpdateAsync(It.IsAny<Company>()))
                .ReturnsAsync(updatedCompany);

            // Act
            var result = await _service.UpdateCompanyAsync(1, companyDto);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(1, result!.Id);
            Assert.Equal("Apple Inc.", result.Name);
            _mockRepository.Verify(repo => repo.UpdateAsync(It.IsAny<Company>()), Times.Once);
        }

        [Fact]
        public async Task DeleteCompanyAsync_WithValidId_ShouldDeleteCompany()
        {
            // Arrange
            _mockRepository.Setup(repo => repo.DeleteAsync(1))
                .ReturnsAsync(true);

            // Act
            var result = await _service.DeleteCompanyAsync(1);

            // Assert
            Assert.True(result);
            _mockRepository.Verify(repo => repo.DeleteAsync(1), Times.Once);
        }

        [Fact]
        public async Task DeleteCompanyAsync_WithInvalidId_ShouldReturnFalse()
        {
            // Arrange
            _mockRepository.Setup(repo => repo.DeleteAsync(999))
                .ReturnsAsync(false);

            // Act
            var result = await _service.DeleteCompanyAsync(999);

            // Assert
            Assert.False(result);
            _mockRepository.Verify(repo => repo.DeleteAsync(999), Times.Once);
        }
    }
}
