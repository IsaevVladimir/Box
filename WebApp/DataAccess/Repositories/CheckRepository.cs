using DataAccess.Components;
using DataAccess.DataModels;
using DataAccess.Entity;

namespace DataAccess.Repositories
{
    public class CheckRepository : CrudRepository<Check, CheckDm, CustomDbContext>
    {
        public CheckRepository(CustomDbContext context) : base(context)
        {
        }
    }
}