using DataAccess.Entity;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Components
{
    public class CustomDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Check> Checks { get; set; }
        public DbSet<CheckCategory> CheckCategories { get; set; }
    }
}