using Microsoft.EntityFrameworkCore;
using WebApp.DataAccess.Entity;

namespace WebApp.DataAccess
{
    public class CustomDbContext : DbContext
    {
        public CustomDbContext(DbContextOptions<CustomDbContext> options) : base(options) { }
        
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //     => optionsBuilder.UseNpgsql("Host=my_host;Database=my_db;Username=my_user;Password=my_pw");
        
        public DbSet<User> Users { get; set; }
        public DbSet<Check> Checks { get; set; }
        public DbSet<CheckCategory> CheckCategories { get; set; }
    }
}