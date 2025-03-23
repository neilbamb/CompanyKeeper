
namespace CompanyKeeper.Core.DTOs
{
    public class CompanyDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string StockTicker { get; set; } = string.Empty;
        public string Exchange { get; set; } = string.Empty;
        public string Isin { get; set; } = string.Empty;
        public string? Website { get; set; }
    }
}
