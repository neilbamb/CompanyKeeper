
using CompanyKeeper.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace CompanyKeeper.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Company> Companies { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure entity relationships and constraints
            modelBuilder.Entity<Company>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
                entity.Property(e => e.StockTicker).IsRequired().HasMaxLength(20);
                entity.Property(e => e.Exchange).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Isin).IsRequired().HasMaxLength(12);
                entity.Property(e => e.Website).HasMaxLength(255);

                // Add unique constraint for ISIN
                entity.HasIndex(e => e.Isin).IsUnique();
            });
        }
    }
}
